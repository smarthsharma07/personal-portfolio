import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// ─── 3D Neural Network ───────────────────────────────────────────────────────
const LAYERS_DEF = [5, 7, 7, 4]

function buildNet() {
  const nodes: { x: number; y: number; z: number; layer: number }[] = []
  const edges: [number, number][] = []
  let offset = 0
  LAYERS_DEF.forEach((count, li) => {
    const xPos = (li - (LAYERS_DEF.length - 1) / 2) * 1.6
    for (let i = 0; i < count; i++) {
      nodes.push({ x: xPos, y: (i - (count - 1) / 2) * 0.55, z: 0, layer: li })
    }
    if (li > 0) {
      const prev = LAYERS_DEF[li - 1]
      for (let a = 0; a < prev; a++)
        for (let b = 0; b < count; b++)
          edges.push([offset - prev + a, offset + b])
    }
    offset += count
  })
  return { nodes, edges }
}

function NeuralMesh({ mouseNorm }: { mouseNorm: [number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const { nodes, edges } = useMemo(buildNet, [])
  const lineGeo = useMemo(() => {
    const pts: THREE.Vector3[] = []
    edges.forEach(([a, b]) => {
      pts.push(new THREE.Vector3(nodes[a].x, nodes[a].y, 0))
      pts.push(new THREE.Vector3(nodes[b].x, nodes[b].y, 0))
    })
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [nodes, edges])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = mouseNorm[0] * 0.45 + clock.elapsedTime * 0.04
    groupRef.current.rotation.x = mouseNorm[1] * 0.2
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#00FFD4" transparent opacity={0.12} />
      </lineSegments>
      {nodes.map((n, i) => {
        const isIO = n.layer === 0 || n.layer === LAYERS_DEF.length - 1
        return (
          <mesh key={i} position={[n.x, n.y, 0]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial
              color={isIO ? '#E8A020' : '#00FFD4'}
              emissive={isIO ? '#E8A020' : '#00FFD4'}
              emissiveIntensity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function NeuralScene() {
  const [mouse, setMouse] = useState<[number, number]>([0, 0])
  return (
    <div className="w-full h-full"
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        setMouse([(e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height * 2 - 1)])
      }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.1} />
        <pointLight position={[3, 4, 3]}   color="#E8A020" intensity={2} />
        <pointLight position={[-3, -2, 3]} color="#00FFD4" intensity={1} />
        <NeuralMesh mouseNorm={mouse} />
      </Canvas>
    </div>
  )
}

// ─── Projects data ───────────────────────────────────────────────────────────
const FEATURED = {
  title: 'StudyIntel',
  domain: 'AI / ML',
  tagline: 'AI-Powered Study Intelligence Platform',
  desc: 'End-to-end ML pipeline that predicts student productivity, explains predictions via SHAP values, and surfaces personalised insights through a live analytics dashboard.',
  tags: ['CatBoost', 'SHAP / XAI', 'Pandas', 'Python', 'Analytics'],
  metrics: [
    { label: 'Accuracy',    value: '88.73%' },
    { label: 'Engineered',  value: '38 Features' },
    { label: 'Inference',   value: '< 12 ms' },
    { label: 'Model',       value: 'CatBoost' },
  ],
  github: 'https://github.com/smarthsharma07/StudyIntel',
}

const PROJECTS = [
  {
    id: 'spaceship',
    title: 'Spaceship Titanic',
    domain: 'AI / ML',
    shortDesc: 'Kaggle Top 20% — CatBoost pipeline with systematic feature engineering & experiment tracking. Score: 0.80780.',
    tech: ['CatBoost', 'LightGBM', 'Optuna', 'Pandas', 'Feature Engg.'],
    github: 'https://github.com/smarthsharma07/spaceship-titanic-predictive-modeling',
    badge: '🏆 Top 20% · 497/2500+',
  },
  {
    id: 'food',
    title: 'Food Recommendation Engine',
    domain: 'AI / ML',
    shortDesc: 'Two-stage ML system — semantic vector retrieval + LightGBM LambdaMART ranking for personalised food suggestions.',
    tech: ['Python', 'LightGBM', 'Vector Retrieval', 'Data Science'],
    github: 'https://github.com/smarthsharma07/zomato-csao-recommendation-engine',
    badge: '⚡ Zomato Hackathon',
  },
  {
    id: 'map',
    title: 'Map Navigator',
    domain: 'Software',
    shortDesc: 'Graph-based navigation using BFS and adjacency list representations with a Flask REST backend.',
    tech: ['C++', 'Python', 'Flask', 'BFS', 'Algorithms'],
    github: 'https://github.com/smarthsharma07/map-navigator',
  },
  {
    id: 'insurance',
    title: 'Insurance Cost Prediction',
    domain: 'AI / ML',
    shortDesc: 'ML pipeline with EDA, feature engineering, Ridge/Lasso regression comparison and hyperparameter tuning.',
    tech: ['Python', 'Scikit-Learn', 'Regression', 'Data Analysis'],
    github: 'https://github.com/smarthsharma07/insurance-cost-prediction-regression',
  },
  {
    id: 'weather',
    title: 'WeatherWise',
    domain: 'Software',
    shortDesc: 'Real-time weather and air quality web app with live external API integration and dynamic rendering.',
    tech: ['JavaScript', 'HTML/CSS', 'APIs', 'Web Dev'],
    github: 'https://github.com/smarthsharma07/weatherwise',
  },
  {
    id: 'portfolio',
    title: 'Silicon Odyssey',
    domain: 'Software',
    shortDesc: 'This portfolio — GLSL shaders, 3D black hole with accretion disk, mouse gravity terrain, custom cursor.',
    tech: ['React', 'Three.js', 'GLSL', 'Framer Motion', 'TypeScript'],
    github: '#',
  },
]

const DOMAIN_COLOR: Record<string, string> = {
  'AI / ML':  '#E8A020',
  'Software': '#00FFD4',
}

export default function Layer03Intelligence() {
  const [clickCount,    setClickCount]    = useState(0)
  const [showDashboard, setShowDashboard] = useState(false)
  const [expanded,      setExpanded]      = useState(false)

  const handleFeatured = () => {
    setExpanded(e => !e)
    const nc = clickCount + 1
    setClickCount(nc)
    if (nc >= 3) { setShowDashboard(true); setClickCount(0) }
  }

  return (
    <section id="layer03" className="min-h-screen py-32 px-8 md:px-16 lg:px-24 bg-[#050810] relative">
      <div
        className="absolute left-0 top-0 w-1/3 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(232,160,32,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase px-3 py-1 rounded-full border"
            style={{ borderColor:'rgba(232,160,32,0.3)', color:'#E8A020', background:'rgba(232,160,32,0.06)' }}>
            Layer 03
          </span>
          <div className="h-px w-12" style={{ background:'#E8A020', opacity:0.3 }} />
          <span className="font-mono text-xs text-[#6B7280] uppercase tracking-widest">Intelligence</span>
        </div>

        {/* ── Top row: headline + 3D neural ── */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start mb-16">
          <div>
            <motion.h2
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.8 }}
              className="font-bold leading-[0.92] mb-8"
              style={{ fontSize:'clamp(2.8rem,5.5vw,4.5rem)', color:'#F0F4F8' }}
            >
              Data is<br />
              <span style={{ WebkitTextStroke:'1px #E8A020', color:'transparent' }}>Signal.</span>
            </motion.h2>

            {/* Featured project card */}
            <motion.div
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.7, delay:0.2 }}
              onClick={handleFeatured}
              className="cursor-pointer rounded-xl p-6 border transition-all duration-500"
              style={{
                background:  expanded ? 'rgba(232,160,32,0.06)' : 'rgba(10,15,26,0.8)',
                borderColor: expanded ? 'rgba(232,160,32,0.4)' : 'rgba(232,160,32,0.12)',
                boxShadow:   expanded ? '0 0 40px rgba(232,160,32,0.08)' : 'none',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[9px] px-2 py-0.5 rounded"
                  style={{ background:'rgba(232,160,32,0.1)', color:'#E8A020', border:'1px solid rgba(232,160,32,0.2)' }}>
                  AI / ML
                </span>
                <span className="font-mono text-[9px] text-[#6B7280]">Featured</span>
              </div>
              <h3 className="text-xl font-semibold mb-1" style={{ color:'#E8A020' }}>{FEATURED.title}</h3>
              <p className="text-xs text-[#6B7280] mb-4">{FEATURED.tagline}</p>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
                    exit={{ opacity:0, height:0 }} className="overflow-hidden"
                  >
                    <p className="text-[#94A3B8] text-sm leading-6 mb-5">{FEATURED.desc}</p>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {FEATURED.metrics.map(m => (
                        <div key={m.label} className="p-3 rounded-lg"
                          style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">{m.label}</p>
                          <p className="font-mono text-sm font-medium" style={{ color:'#E8A020' }}>{m.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {FEATURED.tags.map(t => (
                        <span key={t} className="font-mono text-[10px] px-2 py-1 rounded"
                          style={{ background:'rgba(0,255,212,0.08)', color:'#00FFD4', border:'1px solid rgba(0,255,212,0.15)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="font-mono text-[10px] text-[#6B7280] mt-4 opacity-50">
                {expanded ? '↑ Collapse' : '↓ Expand'} · Click 3× for secret
              </p>
            </motion.div>
          </div>

          {/* 3D Neural */}
          <div className="h-[360px] rounded-xl overflow-hidden"
            style={{ border:'1px solid rgba(232,160,32,0.08)' }}>
            <NeuralScene />
          </div>
        </div>

        {/* ── Project grid ── */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background:'rgba(255,255,255,0.06)' }} />
            <span className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest">All Projects</span>
            <div className="h-px flex-1" style={{ background:'rgba(255,255,255,0.06)' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((p, i) => (
              <motion.a
                key={p.id}
                href={p.github} target="_blank" rel="noopener noreferrer"
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay: i * 0.07 }}
                className="group block p-5 rounded-xl border transition-all duration-300"
                style={{
                  background: 'rgba(10,15,26,0.6)',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
                whileHover={{
                  borderColor: `${DOMAIN_COLOR[p.domain]}40`,
                  backgroundColor: `${DOMAIN_COLOR[p.domain]}06`,
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded"
                    style={{
                      background: `${DOMAIN_COLOR[p.domain]}12`,
                      color:      DOMAIN_COLOR[p.domain],
                      border:     `1px solid ${DOMAIN_COLOR[p.domain]}25`,
                    }}>
                    {p.domain}
                  </span>
                  <span className="font-mono text-[10px] text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗ GitHub
                  </span>
                </div>
                {'badge' in p && p.badge && (
                  <span className="inline-block font-mono text-[9px] px-2 py-0.5 rounded mb-2"
                    style={{ background:'rgba(232,160,32,0.08)', color:'#E8A020', border:'1px solid rgba(232,160,32,0.2)' }}>
                    {p.badge as string}
                  </span>
                )}
                <h4 className="text-sm font-semibold text-[#F0F4F8] mb-2 group-hover:text-[#E8A020] transition-colors">
                  {p.title}
                </h4>
                <p className="text-xs text-[#6B7280] leading-5 mb-4">{p.shortDesc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 3).map(t => (
                    <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                      style={{ background:'rgba(255,255,255,0.04)', color:'#6B7280', border:'1px solid rgba(255,255,255,0.06)' }}>
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                      style={{ background:'rgba(255,255,255,0.04)', color:'#6B7280', border:'1px solid rgba(255,255,255,0.06)' }}>
                      +{p.tech.length - 3}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Secret Dashboard ── */}
      <AnimatePresence>
        {showDashboard && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background:'rgba(5,8,16,0.88)', backdropFilter:'blur(12px)' }}
          >
            <motion.div
              initial={{ scale:0.9, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9, y:20 }}
              className="w-full max-w-2xl rounded-2xl p-8"
              style={{ background:'rgba(10,15,26,0.95)', border:'1px solid rgba(232,160,32,0.25)', boxShadow:'0 0 60px rgba(232,160,32,0.08)' }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest">Secret Layer Unlocked</p>
                  <h3 className="text-lg font-semibold mt-1" style={{ color:'#E8A020' }}>StudyIntel — Raw Analytics</h3>
                </div>
                <button onClick={() => setShowDashboard(false)}
                  className="font-mono text-xs text-[#6B7280] hover:text-[#F0F4F8] transition-colors px-3 py-1 rounded border"
                  style={{ borderColor:'rgba(255,255,255,0.1)' }}>
                  CLOSE
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[['Accuracy','88.73%','#E8A020'],['Inference','12ms','#00FFD4'],['Features','38','#E8A020']].map(([l,v,c]) => (
                  <div key={l} className="p-5 rounded-xl" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[#6B7280] text-xs mb-2">{l}</p>
                    <p className="font-mono text-2xl font-bold" style={{ color: c }}>{v}</p>
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs text-[#6B7280] uppercase tracking-widest mb-3">Pipeline Status</p>
              <div className="space-y-3">
                {[['Feature Engineering','100%'],['Model Training','100%'],['SHAP Analysis','100%'],['Dashboard Deployment','100%']].map(([l, pct]) => (
                  <div key={l}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#6B7280] text-xs">{l}</span>
                      <span className="font-mono text-xs" style={{ color:'#E8A020' }}>{pct}</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background:'rgba(255,255,255,0.05)' }}>
                      <motion.div
                        initial={{ width:0 }} animate={{ width: pct }}
                        transition={{ duration: 1.2, ease:'easeOut', delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #E8A020, #00FFD4)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
