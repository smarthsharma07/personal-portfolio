import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// ── 3D Oscilloscope waveform planes ─────────────────────────────────────────
const WAVE_VERT = /* glsl */`
  uniform float uTime;
  uniform float uChannel;
  varying float vY;
  varying vec2  vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    float freq = 1.0 + uChannel * 0.7;
    float phase = uChannel * 1.3;
    p.z = sin(p.x * freq * 3.14159 + uTime * (1.5 + uChannel * 0.4) + phase) * 0.35
        + sin(p.x * freq * 6.5 + uTime * 0.8 + phase * 0.5) * 0.12;
    vY = p.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`
const WAVE_FRAG = /* glsl */`
  uniform float uChannel;
  varying float vY;
  varying vec2  vUv;

  void main() {
    vec3 gold = vec3(0.91, 0.62, 0.12);
    vec3 teal = vec3(0.00, 1.00, 0.83);
    vec3 col  = mix(teal, gold, clamp(uY * 2.0 + 0.5, 0.0, 1.0));
    float a   = smoothstep(0.0, 0.08, abs(vUv.y - 0.5) < 0.02 ? 1.0 : 0.0);
    // Simple fade at edges of plane
    float edge = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
    gl_FragColor = vec4(col, 0.85 * edge);
  }
`

// Actually let me use a line approach — more like a real oscilloscope
function OscLine({ channel, yOff }: { channel: number; yOff: number }) {
  const ref = useRef<THREE.Line | null>(null)

  const geo = useMemo(() => {
    const count = 200
    const pts: number[] = []
    for (let i = 0; i < count; i++) {
      pts.push((i / (count - 1)) * 6 - 3, 0, 0)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return g
  }, [])

  useFrame(({ clock }) => {
    const t    = clock.elapsedTime
    const pos  = geo.attributes.position as THREE.BufferAttribute
    const count = pos.count
    const freq  = 1.0 + channel * 0.7
    const phase = channel * 1.3
    for (let i = 0; i < count; i++) {
      const x = (i / (count - 1)) * 6 - 3
      const y = Math.sin(x * freq * Math.PI + t * (1.5 + channel * 0.4) + phase) * 0.35
              + Math.sin(x * freq * 6.5 + t * 0.8 + phase * 0.5) * 0.12
      pos.setY(i, y)
    }
    pos.needsUpdate = true
  })

  const color = channel % 2 === 0 ? '#E8A020' : '#00FFD4'

  return (
    // @ts-ignore
    <line ref={ref} position={[0, yOff, 0]} geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={0.85} />
    </line>
  )
}

function OscScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 2]}>
      <OscLine channel={0} yOff={1.0}  />
      <OscLine channel={1} yOff={0.0}  />
      <OscLine channel={2} yOff={-1.0} />
      {/* Grid lines */}
      <gridHelper args={[8, 12, 'rgba(255,255,255,0.03)', 'rgba(255,255,255,0.03)']} position={[0, 0, -0.5]} />
    </Canvas>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
const SKILLS = [
  { label: 'Arduino / Microcontrollers', desc: 'Hardware programming, GPIO, PWM, I²C/SPI protocols' },
  { label: 'Embedded C',               desc: 'Low-level firmware, memory-mapped I/O, interrupts' },
  { label: 'PCB Fundamentals',         desc: 'Schematic capture, layout principles, signal integrity basics' },
  { label: 'Electronics Analysis',     desc: 'Circuit analysis, op-amps, digital electronics' },
]

export default function Layer04Systems() {
  return (
    <section id="layer04" className="min-h-screen flex items-center py-32 px-8 md:px-16 lg:px-24 bg-[#050810] relative overflow-hidden">

      {/* Divider line top */}
      <div className="absolute top-0 left-8 right-8 h-px" style={{ background:'linear-gradient(to right, transparent, rgba(232,160,32,0.2), transparent)' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase px-3 py-1 rounded-full border"
            style={{ borderColor:'rgba(232,160,32,0.3)', color:'#E8A020', background:'rgba(232,160,32,0.06)' }}>
            Layer 04
          </span>
          <div className="h-px w-12" style={{ background:'#E8A020', opacity:0.3 }} />
          <span className="font-mono text-xs text-[#6B7280] uppercase tracking-widest">Systems</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT */}
          <div>
            <motion.h2
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.8 }}
              className="font-bold leading-[0.92] mb-8"
              style={{ fontSize:'clamp(2.8rem,5.5vw,4.5rem)', color:'#F0F4F8' }}
            >
              Software<br />
              <span style={{ WebkitTextStroke:'1px #E8A020', color:'transparent' }}>touches</span><br />
              silicon.
            </motion.h2>

            <div className="space-y-5">
              {SKILLS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity:0, x:-20 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.6, delay: i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 transition-colors"
                    style={{ background:'#E8A020', boxShadow:'0 0 6px rgba(232,160,32,0.6)' }} />
                  <div>
                    <p className="text-[#F0F4F8] text-sm font-medium mb-0.5">{s.label}</p>
                    <p className="text-[#6B7280] text-xs leading-5">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: 3D Oscilloscope */}
          <motion.div
            initial={{ opacity:0, x:30 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8 }}
            className="h-[360px] rounded-xl overflow-hidden relative"
            style={{ background:'rgba(10,15,26,0.8)', border:'1px solid rgba(232,160,32,0.12)' }}
          >
            {/* CRT corner labels */}
            <div className="absolute top-4 left-4 z-10">
              <p className="font-mono text-[10px] text-[#E8A020] opacity-60 tracking-widest">CH1 — 500mV/div</p>
              <p className="font-mono text-[10px] text-[#00FFD4] opacity-60 tracking-widest">CH2 — 200mV/div</p>
              <p className="font-mono text-[10px] text-[#E8A020] opacity-60 tracking-widest">CH3 — 1V/div</p>
            </div>
            <div className="absolute bottom-4 right-4 z-10">
              <p className="font-mono text-[10px] text-[#6B7280]">TIME/DIV 1ms ⬛</p>
            </div>
            <OscScene />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
