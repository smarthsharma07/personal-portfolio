import React, { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

const TRAIL_LENGTH = 12

const CustomCursor = () => {
    const dotRef = useRef(null)
    const trailRefs = useRef([])
    const mouse = useRef({ x: -100, y: -100 })
    const positions = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })))
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Don't render on touch devices
        if ('ontouchstart' in window) return

        const onMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY }
            if (!visible) setVisible(true)
        }

        const onLeave = () => setVisible(false)
        const onEnter = () => setVisible(true)

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseleave', onLeave)
        document.addEventListener('mouseenter', onEnter)

        let raf
        const animate = () => {
            // Dot follows mouse directly
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`
            }

            // Trail follows with delay
            let prev = mouse.current
            for (let i = 0; i < TRAIL_LENGTH; i++) {
                const pos = positions.current[i]
                const ease = 0.25 - i * 0.012
                pos.x += (prev.x - pos.x) * ease
                pos.y += (prev.y - pos.y) * ease

                if (trailRefs.current[i]) {
                    trailRefs.current[i].style.transform = `translate(${pos.x}px, ${pos.y}px)`
                }
                prev = pos
            }

            raf = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            cancelAnimationFrame(raf)
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseleave', onLeave)
            document.removeEventListener('mouseenter', onEnter)
        }
    }, [visible])

    if ('ontouchstart' in window) return null

    return (
        <div className={`cursor-system ${visible ? 'cursor-visible' : ''}`}>
            <div ref={dotRef} className="cursor-dot" />
            {positions.current.map((_, i) => (
                <div
                    key={i}
                    ref={el => trailRefs.current[i] = el}
                    className="cursor-trail"
                    style={{
                        opacity: 1 - (i / TRAIL_LENGTH),
                        width: `${Math.max(2, 6 - i * 0.4)}px`,
                        height: `${Math.max(2, 6 - i * 0.4)}px`,
                    }}
                />
            ))}
        </div>
    )
}

export default CustomCursor
