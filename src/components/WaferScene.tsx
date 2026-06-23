import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Global mouse (screen -1..1) ────────────────────────────────────────────
let globalMouse: [number, number] = [0, 0]

// ─── Global Ramp State for Black Hole micro-interaction ─────────────────────
const rampState = { speed: 1.0, targetSpeed: 1.0, intensity: 0.0, targetIntensity: 0.0 }

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', e => {
    globalMouse = [(e.clientX / window.innerWidth) * 2 - 1,
                   -((e.clientY / window.innerHeight) * 2 - 1)]
  }, { passive: true })

  window.addEventListener('bh-ramp-up', () => {
    rampState.targetSpeed = 15.0
    rampState.targetIntensity = 1.0
    setTimeout(() => {
      rampState.targetSpeed = 1.0
      rampState.targetIntensity = 0.0
    }, 800) // quick burst
  })
}

function GlobalUpdater() {
  useFrame((_, delta) => {
    rampState.speed = THREE.MathUtils.lerp(rampState.speed, rampState.targetSpeed, delta * 3.0)
    rampState.intensity = THREE.MathUtils.lerp(rampState.intensity, rampState.targetIntensity, delta * 4.0)
  })
  return null
}

// ════════════════════════════════════════════════════════════════════════════
// ACCRETION DISK — thin-film physics + relativistic Doppler beaming
// ════════════════════════════════════════════════════════════════════════════
const DISK_VERT = /* glsl */`
  varying vec3 vLocalPos;
  varying vec2 vUv;
  void main() {
    vLocalPos   = position;
    vUv         = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const DISK_FRAG = /* glsl */`
  uniform float uTime;
  uniform float uIntensity;
  varying vec3  vLocalPos;
  varying vec2  vUv;

  float hash(float n){ return fract(sin(n)*43758.5453); }
  float noise2(vec2 p){
    vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.0-2.0*f);
    float n=i.x+i.y*57.0;
    return mix(mix(hash(n),hash(n+1.0),f.x),mix(hash(n+57.0),hash(n+58.0),f.x),f.y);
  }

  void main(){
    float dist  = length(vLocalPos.xy);
    float inner = 1.35;
    float outer = 3.0;
    float r     = clamp((dist - inner) / (outer - inner), 0.0, 1.0);
    if (r < 0.0 || r > 1.0) discard;

    float angle = atan(vLocalPos.y, vLocalPos.x);

    // ── Relativistic Doppler beaming ─────────────────────────────────────
    // Bright spot precesses slowly — like real accretion disk hot spots
    float hotAngle = uTime * 0.18;
    float beaming  = 0.55 + 0.65 * max(0.0, cos(angle - hotAngle));
    // Secondary bright streak on opposite side (weaker)
    float beam2    = 0.15 * max(0.0, cos(angle - hotAngle + 3.14159));
    beaming += beam2;

    // ── Temperature gradient ─────────────────────────────────────────────
    vec3 c_white  = vec3(1.00, 0.97, 0.90); // white-hot inner corona
    vec3 c_gold   = vec3(0.98, 0.60, 0.08); // gold mid
    vec3 c_orange = vec3(0.85, 0.30, 0.05); // orange-red
    vec3 c_teal   = vec3(0.00, 0.85, 0.72); // teal outer
    vec3 c_dark   = vec3(0.02, 0.05, 0.10); // cold edge

    // Blend colours based on radius
    vec3 baseColor = mix(c_white, c_gold, smoothstep(0.0, 0.25, r));
    baseColor      = mix(baseColor, c_orange, smoothstep(0.25, 0.55, r));
    baseColor      = mix(baseColor, c_teal,   smoothstep(0.55, 0.85, r));
    baseColor      = mix(baseColor, c_dark,   smoothstep(0.85, 1.0, r));

    // ── Density Waves & Turbulence ───────────────────────────────────────
    // Radial banding (like Saturn's rings) + spiral arms
    float spiral = angle * 2.0 - r * 8.0 - uTime * 0.5;
    float waves  = 0.5 + 0.5 * sin(r * 35.0 - uTime * 1.5) * sin(spiral);
    // Gas clumps using noise
    float n1     = noise2(vec2(r * 12.0 - uTime*0.8, angle * 6.0));
    float n2     = noise2(vec2(angle * 10.0 + uTime, r * 20.0));
    float turb   = (n1 * 0.6 + n2 * 0.4);

    float structure = waves * 0.4 + turb * 0.6;
    
    // Falloff near event horizon and outer edge
    float envFade = smoothstep(0.0, 0.08, r) * smoothstep(1.0, 0.85, r);
    float alpha   = envFade * (0.4 + structure * 0.6);

    // ── Raytraced Shadowing ──────────────────────────────────────────────
    // Back half of the disk gets occluded by the black hole
    // Simple gradient shadow if vLocalPos.y > 0 and distance is small
    float occlusion = 1.0;
    if (vLocalPos.y > 0.0 && dist < 1.9) {
      occlusion = smoothstep(1.2, 1.9, dist) + (1.0 - smoothstep(0.0, 1.5, vLocalPos.y)) * 0.5;
      occlusion = clamp(occlusion, 0.1, 1.0);
    }

    baseColor *= beaming * occlusion;
    
    // Ramp up flash
    baseColor = mix(baseColor, vec3(1.0, 0.9, 0.8), uIntensity * 0.5);

    gl_FragColor = vec4(baseColor * (1.0 + uIntensity * 0.8), alpha * (1.0 + uIntensity));
  }
`

function AccretionDisk() {
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uIntensity: { value: 0 } }), [])
  useFrame((_, delta) => {
    uniforms.uTime.value += delta * rampState.speed
    uniforms.uIntensity.value = rampState.intensity
  })
  return (
    <mesh rotation={[-Math.PI / 2.05, 0, 0]} renderOrder={3}>
      {/* slightly tilted to see the top */}
      <planeGeometry args={[7.5, 7.5, 64, 64]} />
      <shaderMaterial
        vertexShader={DISK_VERT} fragmentShader={DISK_FRAG} uniforms={uniforms}
        transparent depthWrite={false} blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// EVENT HORIZON — Solid black + Photon Sphere
// ════════════════════════════════════════════════════════════════════════════
const EH_VERT = /* glsl */`
  varying vec3 vNormal; varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`
const EH_FRAG = /* glsl */`
  uniform float uTime;
  varying vec3 vNormal; varying vec3 vViewDir;
  void main() {
    float cosT   = max(dot(vNormal, vViewDir), 0.0);
    float fresnel = pow(1.0 - cosT, 4.0);
    // Thin glowing ring at the edge — photon sphere approximation
    vec3  ring    = mix(vec3(0.98,0.65,0.10), vec3(0.0,0.88,0.72),
                        sin(uTime*0.6)*0.5+0.5) * fresnel * 1.8;
    gl_FragColor  = vec4(ring, fresnel * 0.9);
  }
`

function EventHorizon() {
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame((_, delta) => { uniforms.uTime.value += delta * rampState.speed })
  return (
    <>
      {/* Solid black core */}
      <mesh renderOrder={1}>
        <sphereGeometry args={[1.20, 80, 80]} />
        <meshBasicMaterial color="#000004" />
      </mesh>
      {/* Photon-sphere glow rim — slightly larger */}
      <mesh renderOrder={2}>
        <sphereGeometry args={[1.28, 60, 60]} />
        <shaderMaterial
          vertexShader={EH_VERT} fragmentShader={EH_FRAG} uniforms={uniforms}
          transparent depthWrite={false} blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>
    </>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// RELATIVISTIC JETS — twin plasma columns above and below
// ════════════════════════════════════════════════════════════════════════════
const JET_VERT = /* glsl */`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`
const JET_FRAG = /* glsl */`
  uniform float uTime;
  uniform float uIntensity;
  uniform float uDir;   // +1 or -1
  varying vec2  vUv;
  void main(){
    // vUv.y = 0 at base of jet (near BH), 1 at tip
    float dist = abs(vUv.x - 0.5) * 2.0;       // 0 at centre, 1 at edge
    float core = smoothstep(0.35, 0.0, dist);    // bright core
    float fade = smoothstep(1.0, 0.0, vUv.y);   // fade to tip

    // Moving pulses along the jet
    float pulse = 0.6 + 0.4 * sin((vUv.y * 8.0 - uTime * (3.0 * uDir)) * 3.14159);

    vec3 col   = mix(vec3(0.0,0.92,0.80), vec3(1.0,0.96,0.88), core);
    col = mix(col, vec3(1.0), uIntensity);
    
    float alpha = core * fade * pulse * (0.75 + uIntensity * 1.5);
    gl_FragColor = vec4(col, alpha);
  }
`

function Jet({ dir }: { dir: number }) {
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uIntensity: { value: 0 }, uDir: { value: dir } }), [dir])
  useFrame((_, delta) => { 
    uniforms.uTime.value += delta * rampState.speed 
    uniforms.uIntensity.value = rampState.intensity
  })
  return (
    <mesh position={[0, dir * 1.4, 0]} rotation={[dir > 0 ? 0 : Math.PI, 0, 0]}>
      <coneGeometry args={[0.22, 2.8, 24, 1, true]} />
      <shaderMaterial
        vertexShader={JET_VERT} fragmentShader={JET_FRAG} uniforms={uniforms}
        transparent depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// CORONA — diffuse gas cloud around BH
// ════════════════════════════════════════════════════════════════════════════
const CORONA_FRAG = /* glsl */`
  uniform float uTime;
  uniform float uIntensity;
  varying vec3 vNormal; varying vec3 vViewDir;
  void main() {
    float cosT   = max(dot(vNormal, vViewDir), 0.0);
    float f      = pow(1.0 - cosT, 2.8);
    float pulse  = 0.75 + 0.25 * sin(uTime * 1.3);
    vec3  col    = mix(vec3(0.95,0.55,0.08), vec3(0.0,0.75,0.65), f);
    col = mix(col, vec3(0.0, 1.0, 0.9), uIntensity);
    gl_FragColor = vec4(col * pulse * (1.0 + uIntensity * 2.0), f * 0.35 * (1.0 + uIntensity * 1.5));
  }
`

function Corona() {
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uIntensity: { value: 0 } }), [])
  useFrame((_, delta) => { 
    uniforms.uTime.value += delta * rampState.speed 
    uniforms.uIntensity.value = rampState.intensity
  })
  return (
    <mesh>
      <sphereGeometry args={[1.85, 40, 40]} />
      <shaderMaterial
        vertexShader={EH_VERT} fragmentShader={CORONA_FRAG} uniforms={uniforms}
        transparent depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.BackSide}
      />
    </mesh>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// SATURN-LIKE DUST RINGS — orbits far outside
// ════════════════════════════════════════════════════════════════════════════
function DustRing({ r, tX, tZ, spd, col, op }: { r:number, tX:number, tZ:number, spd:number, col:string, op:number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += spd * delta * rampState.speed
  })
  return (
    <mesh ref={ref} rotation={[tX, 0, tZ]} position={[0,-0.2,0]}>
      <torusGeometry args={[r, 0.015, 4, 100]} />
      <meshBasicMaterial color={col} transparent opacity={op} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// SPACETIME GRID — Gravitational well + Sine wave disturbance
// ════════════════════════════════════════════════════════════════════════════
const GRID_VERT = /* glsl */`
  uniform float uTime;
  uniform float uIntensity;
  uniform vec2  uMouse;
  varying vec2  vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec3 pos = position;

    // 1. Gravitational well (pulls space backward at the center)
    float dist = length(pos.xy);
    float well = exp(-dist * 0.8) * -3.0;
    
    // 2. Gravitational waves (sine wave radiating outward)
    // Faster and stronger if ramp is active
    float waveSpeed = 2.0 + uIntensity * 10.0;
    float waveAmp = 0.15 + uIntensity * 0.5;
    float wave = sin(dist * 3.0 - uTime * waveSpeed) * waveAmp * exp(-dist * 0.2);
    
    // 3. Mouse disturbance (repels/disturbs the grid)
    vec2 worldMouse = vec2(uMouse.x * 12.0, uMouse.y * 8.0);
    float dMouse = length(pos.xy - worldMouse);
    float mouseRipples = sin(dMouse * 6.0 - uTime * 4.0) * 0.3 * exp(-dMouse * 0.8);

    pos.z += well + wave + mouseRipples;
    vDepth = pos.z;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`
const GRID_FRAG = /* glsl */`
  uniform float uIntensity;
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    // Fade out at edges
    float alpha = smoothstep(0.5, 0.0, length(vUv - 0.5));
    // Brighten the deep well
    float depthGlow = smoothstep(-0.5, -3.0, vDepth) * 0.5;
    // Teal wireframe, brightening on ramp
    vec3 col = mix(vec3(0.0, 0.6, 0.5), vec3(0.0, 1.0, 0.83), depthGlow + uIntensity);
    
    gl_FragColor = vec4(col, alpha * (0.25 + depthGlow + uIntensity * 0.5));
  }
`

function SpacetimeGrid() {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uIntensity: { value: 0 }
  }), [])
  
  useFrame((_, delta) => {
    uniforms.uTime.value += delta * rampState.speed
    uniforms.uMouse.value.set(globalMouse[0], globalMouse[1])
    uniforms.uIntensity.value = rampState.intensity
  })
  
  return (
    // Placed vertically behind the black hole
    <mesh position={[0, 0, -4]}>
      <planeGeometry args={[30, 20, 100, 70]} />
      <shaderMaterial
        vertexShader={GRID_VERT} fragmentShader={GRID_FRAG} uniforms={uniforms}
        wireframe transparent depthWrite={false} blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN SCENE
// ════════════════════════════════════════════════════════════════════════════
interface WaferSceneProps {
  isMobile?: boolean
}

export default function WaferScene({ isMobile }: WaferSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 1.8, 7], fov: 50 }} dpr={isMobile ? [1,1] : [1, 2]}>
        {/* Updater for global ramp state */}
        <GlobalUpdater />

        {/* Physical lights for subtle surface shading */}
        <ambientLight intensity={0.01} />
        <pointLight position={[0.8, 0.5, 3.5]}  color="#E8A020" intensity={6} distance={9} decay={2} />
        <pointLight position={[-1.2, -0.4, 3]}    color="#00FFD4" intensity={4} distance={7} decay={2} />
        <pointLight position={[0, 5, 0]}          color="#fffde0" intensity={1.5} distance={12} decay={2} />

        {/* Black hole core */}
        <EventHorizon />
        <AccretionDisk />
        <Corona />

        {/* Relativistic jets */}
        <Jet dir={1} />
        <Jet dir={-1} />

        {/* Saturn dust rings */}
        <DustRing r={3.6}  tX={Math.PI*0.10}  tZ={0.06}   spd={0.11}  col="#E8A020" op={0.38} />
        <DustRing r={4.1}  tX={Math.PI*0.095} tZ={-0.07}  spd={-0.07} col="#E8A020" op={0.22} />
        <DustRing r={4.6}  tX={Math.PI*0.09}  tZ={0.05}   spd={0.04}  col="#00FFD4" op={0.14} />
        <DustRing r={5.05} tX={Math.PI*0.085} tZ={-0.04}  spd={-0.02} col="#E8A020" op={0.07} />

        {/* Mouse-reactive terrain — skip on mobile for perf */}
        {!isMobile && <SpacetimeGrid />}
      </Canvas>
    </div>
  )
}
