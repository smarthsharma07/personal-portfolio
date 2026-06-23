import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import WaferScene from '../components/WaferScene'
import { useIsMobile } from '../hooks/useIsMobile'

const ROLES = ['Machine Learning', 'Embedded Systems', 'DSA', 'Future RTL/VLSI']

interface Shockwave { id: number; x: number; y: number }

export default function Hero() {
  const isMobile = useIsMobile()
  const [shockwaves, setShockwaves] = useState<Shockwave[]>([])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const id   = Date.now() + Math.random()
    setShockwaves(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setShockwaves(prev => prev.filter(s => s.id !== id)), 1500)
  }, [])

  const handleDoubleClick = useCallback(() => {
    window.dispatchEvent(new Event('bh-ramp-up'))
  }, [])

  return (
    <section id="hero" className="relative h-screen overflow-hidden bg-[#050810]">
      <div 
        className="absolute inset-0"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {/* 3D scene */}
        <WaferScene isMobile={isMobile} />

        {/* Side vignette — pushes scene to right */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 80% at 72% 50%, transparent 20%, #050810 86%)' }}
        />

        {/* Text */}
        <motion.div
          className="absolute inset-0 z-[2] flex flex-col justify-center px-6 md:px-14 lg:px-24 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] mb-4 md:mb-6 uppercase"
              style={{ color: '#E8A020' }}>
              Silicon Odyssey&nbsp;·&nbsp;Layer 00 — Init
            </p>

            <h1 className="font-bold leading-[0.88] mb-6 md:mb-8"
              style={{ fontSize: 'clamp(2.8rem,10vw,8rem)' }}>
              <span className="block text-[#F0F4F8]">SMARTH</span>
              <span className="block" style={{ WebkitTextStroke: '1.5px #E8A020', color: 'transparent' }}>
                SHARMA
              </span>
            </h1>

            <p className="text-[#6B7280] text-base md:text-lg font-light mb-8 max-w-xs leading-relaxed">
              Building Intelligence,<br />
              <span className="text-[#F0F4F8]">One Layer at a Time.</span>
            </p>

            <motion.div className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}>
              {ROLES.map(r => (
                <span key={r} className="font-mono text-[10px] px-2.5 py-1 rounded-full border"
                  style={{ borderColor: 'rgba(232,160,32,0.3)', color: '#6B7280', background: 'rgba(232,160,32,0.04)' }}>
                  {r}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll cue — desktop only */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <span className="font-mono text-[9px] tracking-[0.35em] text-[#6B7280]/60 uppercase">
              Double Click BH
            </span>
            <motion.div className="w-px h-10"
              style={{ background: 'linear-gradient(to bottom, #E8A020, transparent)' }}
              animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}

        {/* Shockwave rings */}
        {shockwaves.map(sw => (
          <div key={sw.id} className="shockwave-ring"
            style={{ position: 'absolute', left: sw.x, top: sw.y, pointerEvents: 'none' }} />
        ))}
      </div>
    </section>
  )
}
