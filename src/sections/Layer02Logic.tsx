import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface NodeDef { id: number; label: string; x: number; y: number; connections: number[]; cluster: 'dsa' | 'ml' | 'hw' }

const NODES: NodeDef[] = [
  // ── DSA cluster (centre) ──────────────────────────────────────────
  { id: 0,  label: 'Problem Solving',    x: 50, y: 38, connections: [1,2,3,4,5,9,12],  cluster: 'dsa' },
  { id: 1,  label: 'Arrays & Hashing',   x: 50, y: 18, connections: [0,2,3],            cluster: 'dsa' },
  { id: 2,  label: 'Trees & Graphs',     x: 32, y: 28, connections: [0,1,4,5],          cluster: 'dsa' },
  { id: 3,  label: 'Dynamic Prog.',      x: 68, y: 28, connections: [0,1,5,6],          cluster: 'dsa' },
  { id: 4,  label: 'Recursion',          x: 22, y: 42, connections: [0,2,5],            cluster: 'dsa' },
  { id: 5,  label: 'C++',               x: 50, y: 54, connections: [0,2,3,4,6,9,12],   cluster: 'dsa' },
  { id: 6,  label: 'Competitive Prog.',  x: 68, y: 48, connections: [3,5],              cluster: 'dsa' },

  // ── ML cluster (bottom-left) ─────────────────────────────────────
  { id: 7,  label: 'Machine Learning',   x: 20, y: 68, connections: [0,5,8,9,10],       cluster: 'ml' },
  { id: 8,  label: 'Feature Engg.',      x: 10, y: 82, connections: [7,9],              cluster: 'ml' },
  { id: 9,  label: 'CatBoost / LGBM',   x: 26, y: 88, connections: [7,8,10],           cluster: 'ml' },
  { id: 10, label: 'Data Analysis',      x: 38, y: 80, connections: [7,9,0],            cluster: 'ml' },

  // ── Hardware cluster (bottom-right) ─────────────────────────────
  { id: 11, label: 'Digital Logic',      x: 80, y: 68, connections: [0,5,12,13,14],     cluster: 'hw' },
  { id: 12, label: 'Arduino / MCUs',     x: 74, y: 82, connections: [5,11,13],          cluster: 'hw' },
  { id: 13, label: 'Embedded C',         x: 88, y: 82, connections: [11,12,14],         cluster: 'hw' },
  { id: 14, label: 'Electronics',        x: 62, y: 88, connections: [11,12,0],          cluster: 'hw' },
]

const CLUSTER_COLOR: Record<string, string> = {
  dsa: '#E8A020',
  ml:  '#00FFD4',
  hw:  '#FF8C42',
}

const CLUSTER_LABELS = [
  { id: 'dsa', label: 'DSA / Algorithms', color: '#E8A020', x: '50%',  y: '6%' },
  { id: 'ml',  label: 'Machine Learning', color: '#00FFD4', x: '16%',  y: '58%' },
  { id: 'hw',  label: 'Hardware',         color: '#FF8C42', x: '78%',  y: '58%' },
]

export default function Layer02Logic() {
  const [active, setActive] = useState<number | null>(null)

  const isLit = useCallback(
    (a: number, b: number) => active !== null && NODES[a]?.connections.includes(b),
    [active]
  )

  const activeNode = active !== null ? NODES[active] : null
  const clusterCol = activeNode ? CLUSTER_COLOR[activeNode.cluster] : '#00FFD4'

  return (
    <section id="layer02" className="min-h-screen flex items-center py-32 px-8 md:px-16 lg:px-24 relative" style={{ background: '#050810' }}>
      <div
        className="absolute right-0 top-0 w-1/3 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(0,255,212,0.04) 0%, transparent 70%)' }}
      />
      <div
        className="absolute left-0 bottom-0 w-1/3 h-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 0% 100%, rgba(255,140,66,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase px-3 py-1 rounded-full border"
            style={{ borderColor:'rgba(0,255,212,0.3)', color:'#00FFD4', background:'rgba(0,255,212,0.05)' }}>
            Layer 02
          </span>
          <div className="h-px w-12" style={{ background:'#00FFD4', opacity:0.3 }} />
          <span className="font-mono text-xs text-[#6B7280] uppercase tracking-widest">Logic</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.8 }}
          >
            <h2 className="font-bold leading-[0.92] mb-6"
              style={{ fontSize:'clamp(2.8rem,5.5vw,4.5rem)', color:'#F0F4F8' }}>
              Logic is<br />
              <span style={{ WebkitTextStroke:'1px #00FFD4', color:'transparent' }}>Architecture.</span>
            </h2>
            <p className="text-[#6B7280] text-sm leading-7 max-w-xs mb-8">
              Three interconnected domains — Algorithms form the foundation that bridges Machine Learning and Hardware. Hover any node to trace the signal.
            </p>

            {/* Cluster legend */}
            <div className="space-y-3 mb-8">
              {[
                { label:'DSA / Algorithms', color:'#E8A020', desc:'Problem solving fundamentals' },
                { label:'Machine Learning', color:'#00FFD4', desc:'CatBoost, feature engineering, data' },
                { label:'Hardware / ECE',   color:'#FF8C42', desc:'Embedded systems, digital logic' },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full shrink-0"
                    style={{ background:c.color, boxShadow:`0 0 6px ${c.color}` }} />
                  <div>
                    <span className="text-[#F0F4F8] text-xs font-medium">{c.label}</span>
                    <span className="text-[#6B7280] text-xs"> — {c.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active node display */}
            <div className="px-4 py-3 rounded-lg min-h-[44px] flex items-center"
              style={{ background:'rgba(255,255,255,0.02)', border:`1px solid ${clusterCol}25`, transition:'border-color 0.3s' }}>
              <p className="font-mono text-xs" style={{ color: clusterCol, transition:'color 0.3s' }}>
                {activeNode ? `◉ ${activeNode.label}` : '○ Hover a node to explore connections'}
              </p>
            </div>
          </motion.div>

          {/* RIGHT — SVG network */}
          <div className="relative h-[460px]">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* Cluster zone labels */}
              {CLUSTER_LABELS.map(cl => (
                <text key={cl.id} x={cl.x} y={cl.y}
                  textAnchor="middle" fontSize="2.6" fill={cl.color}
                  fontFamily="monospace" opacity="0.35" letterSpacing="0.08em"
                  style={{ userSelect:'none', textTransform:'uppercase' }}>
                  {cl.label}
                </text>
              ))}

              {/* Soft cluster zone backgrounds */}
              <ellipse cx="50" cy="35" rx="27" ry="20" fill="rgba(232,160,32,0.025)" />
              <ellipse cx="22" cy="78" rx="17" ry="14" fill="rgba(0,255,212,0.025)" />
              <ellipse cx="78" cy="78" rx="17" ry="14" fill="rgba(255,140,66,0.025)" />

              {/* Edges */}
              {NODES.map(node =>
                node.connections.map(cId => {
                  if (cId <= node.id) return null
                  const target = NODES[cId]
                  const lit = isLit(node.id, cId) || isLit(cId, node.id)
                  const col = lit ? CLUSTER_COLOR[activeNode?.cluster ?? 'dsa'] : 'rgba(255,255,255,0.06)'
                  return (
                    <line key={`${node.id}-${cId}`}
                      x1={node.x} y1={node.y} x2={target.x} y2={target.y}
                      stroke={col} strokeWidth={lit ? 0.7 : 0.25}
                      style={{ transition:'stroke 0.3s, stroke-width 0.3s' }} />
                  )
                })
              )}

              {/* Nodes */}
              {NODES.map(node => {
                const isActive = active === node.id
                const col = CLUSTER_COLOR[node.cluster]
                return (
                  <g key={node.id}
                    onMouseEnter={() => setActive(node.id)}
                    onMouseLeave={() => setActive(null)}
                    style={{ cursor:'crosshair' }}>
                    {/* Outer glow ring */}
                    {isActive && (
                      <circle cx={node.x} cy={node.y} r={3.2}
                        fill="none" stroke={col} strokeWidth={0.4} opacity={0.45} />
                    )}
                    {/* Core */}
                    <circle cx={node.x} cy={node.y} r={1.5}
                      fill={isActive ? col : '#0a0f1a'}
                      stroke={isActive ? col : `${col}55`}
                      strokeWidth={0.5}
                      style={{ transition:'all 0.25s', filter: isActive ? `drop-shadow(0 0 4px ${col})` : 'none' }} />
                    {/* Label */}
                    <text x={node.x} y={node.y - 2.8}
                      textAnchor="middle" fontSize={isActive ? '3.4' : '2.8'}
                      fill={isActive ? '#F0F4F8' : '#6B7280'}
                      fontFamily="monospace"
                      style={{ transition:'all 0.25s', userSelect:'none',
                        filter: isActive ? 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' : 'none' }}>
                      {node.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
