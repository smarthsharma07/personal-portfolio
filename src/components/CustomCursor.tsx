import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const [isHover, setIsHover] = useState(false)
  const [isClick, setIsClick] = useState(false)

  useEffect(() => {
    let raf: number
    let ringX = 0, ringY = 0
    let targetX = 0, targetY = 0

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"], [data-cursor="pointer"]')) {
        setIsHover(true)
      }
    }
    const onMouseOut  = () => setIsHover(false)
    const onMouseDown = () => setIsClick(true)
    const onMouseUp   = () => setIsClick(false)

    // Smooth ring follow
    const animate = () => {
      const ease = 0.12
      ringX += (targetX - ringX) * ease
      ringY += (targetY - ringY) * ease
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove',  onMove,     { passive: true })
    window.addEventListener('mouseover',  onMouseOver, { passive: true })
    window.addEventListener('mouseout',   onMouseOut,  { passive: true })
    window.addEventListener('mousedown',  onMouseDown, { passive: true })
    window.addEventListener('mouseup',    onMouseUp,   { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseover',  onMouseOver)
      window.removeEventListener('mouseout',   onMouseOut)
      window.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mouseup',    onMouseUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Outer ring — follows with lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          animate={{
            width:  isHover ? 48 : isClick ? 20 : 32,
            height: isHover ? 48 : isClick ? 20 : 32,
            borderColor: isHover ? '#E8A020' : '#E8A02060',
            opacity: isHover ? 0.9 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="rounded-full border"
          style={{ borderWidth: isHover ? 1.5 : 1 }}
        />
        {/* Crosshair lines */}
        {!isHover && (
          <>
            <div className="absolute left-1/2 top-0 w-px h-2 -translate-x-1/2 -translate-y-full" style={{ background: '#E8A02060' }} />
            <div className="absolute left-1/2 bottom-0 w-px h-2 -translate-x-1/2 translate-y-full" style={{ background: '#E8A02060' }} />
            <div className="absolute top-1/2 left-0 h-px w-2 -translate-y-1/2 -translate-x-full" style={{ background: '#E8A02060' }} />
            <div className="absolute top-1/2 right-0 h-px w-2 -translate-y-1/2 translate-x-full" style={{ background: '#E8A02060' }} />
          </>
        )}
      </div>

      {/* Inner dot — exact position, instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          animate={{
            width:           isHover ? 6 : 4,
            height:          isHover ? 6 : 4,
            backgroundColor: isHover ? '#E8A020' : '#F0F4F8',
            boxShadow:       isHover ? '0 0 8px #E8A020' : 'none',
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
        />
      </div>
    </>
  )
}
