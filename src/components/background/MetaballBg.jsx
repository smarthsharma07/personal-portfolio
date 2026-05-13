import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './MetaballBg.css';

/**
 * Raymarched metaball background with cursor interaction.
 * Monochrome "moody" preset — black shapes with white specular highlights.
 */
export default function MetaballBg() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: isMobile ? 'default' : 'high-performance',
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const mousePos = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uActualRes: { value: new THREE.Vector2(container.clientWidth * pixelRatio, container.clientHeight * pixelRatio) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uCursor3D: { value: new THREE.Vector3(0, 0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uActualRes;
        uniform vec2 uMouse;
        uniform vec3 uCursor3D;
        varying vec2 vUv;

        const float PI = 3.14159265;
        const float EPS = 0.001;
        const float MAX_DIST = 100.0;

        float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * 0.25;
        }

        float sdSphere(vec3 p, float r) { return length(p) - r; }

        vec3 screenToWorld(vec2 npos) {
          vec2 uv = npos * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;
          return vec3(uv * 2.0, 0.0);
        }

        float sceneSDF(vec3 pos) {
          float result = MAX_DIST;
          float t = uTime * 0.5;

          // Fixed corner blobs
          vec3 tlPos = screenToWorld(vec2(0.08, 0.92));
          float tl = sdSphere(pos - tlPos, 0.75);
          vec3 brPos = screenToWorld(vec2(0.92, 0.08));
          float br = sdSphere(pos - brPos, 0.85);
          vec3 stl = screenToWorld(vec2(0.25, 0.72));
          float smallTL = sdSphere(pos - stl, 0.3);
          vec3 sbr = screenToWorld(vec2(0.72, 0.25));
          float smallBR = sdSphere(pos - sbr, 0.35);

          float tlGroup = smin(tl, smallTL, 0.4);
          float brGroup = smin(br, smallBR, 0.4);
          result = smin(tlGroup, brGroup, 0.3);

          // Moving spheres
          for (int i = 0; i < 5; i++) {
            float fi = float(i);
            float speed = 0.4 + fi * 0.12;
            float radius = 0.12 + mod(fi, 3.0) * 0.06;
            float orbit = 0.4 + mod(fi, 3.0) * 0.15;
            float phase = fi * PI * 0.35;
            vec3 offset = vec3(
              sin(t * speed + phase) * orbit * 0.8,
              cos(t * speed * 0.85 + phase * 1.3) * orbit * 0.6,
              sin(t * speed * 0.5 + phase) * 0.3
            );
            // Attract to cursor
            vec3 toCursor = uCursor3D - offset;
            float cd = length(toCursor);
            if (cd < 1.5 && cd > 0.0) {
              offset += normalize(toCursor) * (1.0 - cd / 1.5) * 0.3;
            }
            float ms = sdSphere(pos - offset, radius);
            float blend = cd < 1.5 ? mix(0.05, 0.3, pow(1.0 - cd / 1.5, 3.0)) : 0.05;
            result = smin(result, ms, blend);
          }

          // Cursor blob
          float cursorBall = sdSphere(pos - uCursor3D, 0.1);
          result = smin(result, cursorBall, 0.3);

          return result;
        }

        vec3 calcNormal(vec3 p) {
          float e = 0.001;
          return normalize(vec3(
            sceneSDF(p + vec3(e,0,0)) - sceneSDF(p - vec3(e,0,0)),
            sceneSDF(p + vec3(0,e,0)) - sceneSDF(p - vec3(0,e,0)),
            sceneSDF(p + vec3(0,0,e)) - sceneSDF(p - vec3(0,0,e))
          ));
        }

        float ambientOcclusion(vec3 p, vec3 n) {
          float occ = 0.0;
          float w = 1.0;
          for (int i = 0; i < 5; i++) {
            float d = 0.01 + 0.015 * float(i * i);
            occ += (d - sceneSDF(p + n * d)) * w;
            w *= 0.85;
          }
          return clamp(1.0 - occ, 0.0, 1.0);
        }

        float rayMarch(vec3 ro, vec3 rd) {
          float t = 0.0;
          for (int i = 0; i < 48; i++) {
            float d = sceneSDF(ro + rd * t);
            if (d < EPS) return t;
            if (t > 5.0) break;
            t += d * 0.9;
          }
          return -1.0;
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy * 2.0 - uActualRes) / uActualRes;
          uv.x *= uResolution.x / uResolution.y;

          vec3 ro = vec3(uv * 2.0, -1.0);
          vec3 rd = vec3(0.0, 0.0, 1.0);
          float t = rayMarch(ro, rd);

          if (t > 0.0) {
            vec3 p = ro + rd * t;
            vec3 n = calcNormal(p);
            vec3 v = -rd;
            float ao = ambientOcclusion(p, n);

            vec3 baseColor = vec3(0.02, 0.0, 0.04);
            vec3 lightColor1 = vec3(0.0, 1.0, 0.8); // Cyan
            vec3 lightColor2 = vec3(1.0, 0.0, 0.8); // Magenta

            // Main light
            vec3 lightDir1 = normalize(vec3(1.0, 1.0, 1.0));
            float diff1 = max(dot(n, lightDir1), 0.0) * 1.0;
            vec3 ref1 = reflect(-lightDir1, n);
            float spec1 = pow(max(dot(v, ref1), 0.0), 8.0) * 2.0;

            // Secondary light
            vec3 lightDir2 = normalize(vec3(-1.0, -0.5, 0.5));
            float diff2 = max(dot(n, lightDir2), 0.0) * 0.8;
            vec3 ref2 = reflect(-lightDir2, n);
            float spec2 = pow(max(dot(v, ref2), 0.0), 8.0) * 1.5;

            float ambient = 0.1;
            float fresnel = pow(1.0 - max(dot(v, n), 0.0), 1.5);

            vec3 color = baseColor;
            color += lightColor1 * (diff1 + spec1 + fresnel * 0.5);
            color += lightColor2 * (diff2 + spec2 + fresnel * 0.3);
            color += vec3(0.1, 0.05, 0.2) * ambient;

            color *= ao;

            // Cursor glow
            float cd = length(p - uCursor3D);
            float glow = exp(-cd * 2.5) * 0.4;
            vec3 glowColor = vec3(0.4, 0.0, 1.0);
            color += glowColor * glow;

            color = color / (color + vec3(0.8)); // Tone mapping

            gl_FragColor = vec4(color, 1.0);
          } else {
            // Cursor glow in empty space
            float cd = length(ro.xy - uCursor3D.xy);
            float g = 1.0 - smoothstep(0.0, 1.2, cd);
            g = pow(g, 2.0) * 0.5;
            vec3 glowCol = vec3(0.4, 0.0, 1.0);
            gl_FragColor = vec4(glowCol * g, g > 0.01 ? g * 0.8 : 0.0);
          }
        }
      `,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    // Mouse tracking
    const onMouseMove = (e) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        targetMouse.x = e.touches[0].clientX / window.innerWidth;
        targetMouse.y = 1.0 - e.touches[0].clientY / window.innerHeight;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animation
    const timer = new THREE.Timer();
    let animId;

    const animate = (timestamp) => {
      timer.update(timestamp);
      mousePos.x += (targetMouse.x - mousePos.x) * 0.08;
      mousePos.y += (targetMouse.y - mousePos.y) * 0.08;
      material.uniforms.uMouse.value.copy(mousePos);

      // Convert mouse to world coords
      const ux = mousePos.x * 2.0 - 1.0;
      const uy = mousePos.y * 2.0 - 1.0;
      const aspect = container.clientWidth / container.clientHeight;
      material.uniforms.uCursor3D.value.set(ux * aspect * 2.0, uy * 2.0, 0.0);
      material.uniforms.uTime.value = timer.getElapsed();

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
      material.uniforms.uActualRes.value.set(w * pixelRatio, h * pixelRatio);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="metaball-bg" />;
}
