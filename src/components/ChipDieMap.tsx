import { useEffect, useState } from 'react'

const LAYERS = [
  { id: 'hero',    label: '00', full: 'Init',         color: '#E8A020' },
  { id: 'layer01', label: '01', full: 'Curiosity',    color: '#E8A020' },
  { id: 'layer02', label: '02', full: 'Logic',        color: '#00FFD4' },
  { id: 'layer03', label: '03', full: 'Intelligence', color: '#E8A020' },
  { id: 'layer04', label: '04', full: 'Systems',      color: '#E8A020' },
  { id: 'layer05', label: '05', full: 'Future',       color: '#6B7280' },
  { id: 'layer06', label: '06', full: 'Connection',   color: '#E8A020' },
]

// IC floorplan layout: each cell is [row, col, rowspan, colspan]
const FLOOR: Record<string, [number, number, number, number]> = {
  hero:    [0, 0, 1, 4],
  layer01: [1, 0, 2, 2],
  layer02: [1, 2, 2, 2],
  layer03: [3, 0, 2, 4],
  layer04: [5, 0, 1, 4],
  layer05: [6, 0, 2, 2],
  layer06: [6, 2, 2, 2],
}

const ROWS = 8
const COLS = 4

export default function ChipDieMap() {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) }),
      { threshold: 0.4 }
    )
    LAYERS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const CELL_W = 28   // px per col
  const CELL_H = 18   // px per row
  const PAD    = 8

  const totalW = COLS * CELL_W + PAD * 2
  const totalH = ROWS * CELL_H + PAD * 2

  return (
    <div
      className="fixed bottom-8 right-6 z-50 hidden lg:block"
      style={{ userSelect: 'none' }}
    >
      {/* Chip package outline */}
      <div
        className="rounded-lg p-2"
        style={{
          background:    'rgba(6,9,18,0.85)',
          border:        '1px solid rgba(232,160,32,0.15)',
          backdropFilter:'blur(12px)',
        }}
      >
        {/* Title */}
        <p className="font-mono text-[8px] text-center text-[#E8A020]/50 tracking-[0.25em] uppercase mb-2">
          Die Floorplan
        </p>

        {/* SVG chip die */}
        <svg
          width={totalW} height={totalH}
          style={{ display:'block' }}
        >
          {/* Background */}
          <rect x={0} y={0} width={totalW} height={totalH}
            rx={4} fill="rgba(10,15,26,0.9)" />

          {/* Grid lines */}
          {Array.from({ length: ROWS + 1 }, (_, i) => (
            <line key={`h${i}`}
              x1={PAD} y1={PAD + i * CELL_H}
              x2={PAD + COLS * CELL_W} y2={PAD + i * CELL_H}
              stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
          ))}
          {Array.from({ length: COLS + 1 }, (_, i) => (
            <line key={`v${i}`}
              x1={PAD + i * CELL_W} y1={PAD}
              x2={PAD + i * CELL_W} y2={PAD + ROWS * CELL_H}
              stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
          ))}

          {/* Functional blocks */}
          {LAYERS.map(layer => {
            const [row, col, rs, cs] = FLOOR[layer.id]
            const x   = PAD + col * CELL_W + 1
            const y   = PAD + row * CELL_H + 1
            const w   = cs * CELL_W - 2
            const h   = rs * CELL_H - 2
            const isActive = activeId === layer.id
            const col_ = layer.color

            return (
              <g key={layer.id}>
                <rect
                  x={x} y={y} width={w} height={h} rx={2}
                  fill={isActive ? `${col_}18` : 'rgba(255,255,255,0.02)'}
                  stroke={isActive ? col_ : 'rgba(255,255,255,0.08)'}
                  strokeWidth={isActive ? 0.8 : 0.4}
                  style={{ transition: 'all 0.4s ease' }}
                />
                {/* Glow effect on active */}
                {isActive && (
                  <rect
                    x={x} y={y} width={w} height={h} rx={2}
                    fill="none"
                    stroke={col_} strokeWidth={0.4}
                    opacity={0.4}
                    style={{ filter: `drop-shadow(0 0 3px ${col_})` }}
                  />
                )}
                {/* Layer number */}
                <text
                  x={x + w / 2} y={y + h / 2 - (h > 20 ? 3 : 0)}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="5.5" fontFamily="monospace"
                  fill={isActive ? col_ : 'rgba(255,255,255,0.2)'}
                  style={{ transition: 'fill 0.4s' }}
                >
                  {layer.label}
                </text>
                {h > 20 && (
                  <text
                    x={x + w / 2} y={y + h / 2 + 5}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="4" fontFamily="monospace"
                    fill={isActive ? `${col_}cc` : 'rgba(255,255,255,0.1)'}
                    style={{ transition: 'fill 0.4s' }}
                    letterSpacing="0.04em"
                  >
                    {layer.full.toUpperCase()}
                  </text>
                )}
              </g>
            )
          })}

          {/* Bond pads — tiny squares around perimeter */}
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={`pt${i}`}
              x={PAD + i * (COLS * CELL_W / 7)}
              y={1} width={3} height={3}
              fill="rgba(232,160,32,0.3)" rx={0.5}
            />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={`pb${i}`}
              x={PAD + i * (COLS * CELL_W / 7)}
              y={totalH - 4} width={3} height={3}
              fill="rgba(232,160,32,0.3)" rx={0.5}
            />
          ))}
        </svg>

        {/* Active layer label */}
        <p className="font-mono text-[8px] text-center mt-2 tracking-[0.2em]"
          style={{ color: LAYERS.find(l => l.id === activeId)?.color ?? '#6B7280', transition:'color 0.3s' }}>
          {LAYERS.find(l => l.id === activeId)?.full?.toUpperCase() ?? ''}
        </p>
      </div>
    </div>
  )
}
