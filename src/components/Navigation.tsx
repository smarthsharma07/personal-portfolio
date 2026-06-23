import { useEffect, useState } from 'react'

const LAYERS = [
  { id: 'hero',    label: '00 — Init' },
  { id: 'layer01', label: '01 — Curiosity' },
  { id: 'layer02', label: '02 — Logic' },
  { id: 'layer03', label: '03 — Intelligence' },
  { id: 'layer04', label: '04 — Systems' },
  { id: 'layer05', label: '05 — Future' },
  { id: 'layer06', label: '06 — Connection' },
]

export default function Navigation() {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { threshold: 0.4 }
    )
    LAYERS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <ul className="flex flex-col gap-5 relative">
        {/* Vertical track */}
        <div
          className="absolute left-[5px] top-2 bottom-2 w-px"
          style={{ background: 'rgba(232,160,32,0.12)' }}
        />

        {LAYERS.map(({ id, label }) => {
          const isActive = activeId === id
          return (
            <li key={id} className="relative flex items-center group">
              <a href={`#${id}`} className="flex items-center gap-3" aria-label={label}>
                {/* Dot */}
                <span
                  className="relative z-10 w-2.5 h-2.5 rounded-full transition-all duration-300 block"
                  style={{
                    background: isActive ? '#E8A020' : 'transparent',
                    border:     `1px solid ${isActive ? '#E8A020' : 'rgba(232,160,32,0.3)'}`,
                    boxShadow:  isActive ? '0 0 10px rgba(232,160,32,0.6)' : 'none',
                  }}
                />
                {/* Label */}
                <span
                  className="absolute right-full mr-3 whitespace-nowrap font-mono text-[10px] tracking-widest uppercase transition-all duration-300 pointer-events-none"
                  style={{
                    color:   isActive ? '#E8A020' : '#6B7280',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateX(0)' : 'translateX(8px)',
                  }}
                >
                  {label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
