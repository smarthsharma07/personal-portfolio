import React, { useEffect, useState, useRef } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [clicked, setClicked] = useState(false)
    const [linkHover, setLinkHover] = useState(false)
    const [trail, setTrail] = useState([])
    const [ripples, setRipples] = useState([])
    const trailRef = useRef([])

    useEffect(() => {
        const mMove = (el) => {
            const newPos = { x: el.clientX, y: el.clientY }
            setPosition(newPos)

            trailRef.current = [...trailRef.current, { ...newPos, id: Date.now() + Math.random() }].slice(-8)
            setTrail(trailRef.current)

            const target = el.target
            if (target && (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('nav-link') ||
                target.classList.contains('card-link') ||
                target.classList.contains('tech-badge')
            )) {
                setLinkHover(true)
            } else {
                setLinkHover(false)
            }
        }

        const mDown = (e) => {
            setClicked(true)
            const id = Date.now() + Math.random()
            setRipples(prev => [...prev, { x: e.clientX, y: e.clientY, id }])
            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== id))
            }, 700)
        }

        const mUp = () => setClicked(false)

        document.addEventListener('mousemove', mMove)
        document.addEventListener('mousedown', mDown)
        document.addEventListener('mouseup', mUp)
        return () => {
            document.removeEventListener('mousemove', mMove)
            document.removeEventListener('mousedown', mDown)
            document.removeEventListener('mouseup', mUp)
        }
    }, [])

    return (
        <>
            {/* Click ripples */}
            {ripples.map((r) => (
                <div
                    key={r.id}
                    className="cursor-ripple"
                    style={{ left: `${r.x}px`, top: `${r.y}px` }}
                />
            ))}

            {/* Trail particles */}
            {trail.map((point, index) => (
                <div
                    key={point.id}
                    className="cursor-trail"
                    style={{
                        left: `${point.x}px`,
                        top: `${point.y}px`,
                        opacity: (index + 1) / trail.length * 0.45,
                        transform: `translate(-50%, -50%) scale(${(index + 1) / trail.length})`,
                        background: index < 4
                            ? 'rgba(124, 58, 237, 0.8)'
                            : 'rgba(0, 240, 255, 0.8)'
                    }}
                />
            ))}

            {/* Main cursor */}
            <div
                className={`cursor-root ${clicked ? 'clicked' : ''} ${linkHover ? 'hover' : ''}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            >
                <div className="cursor-glow"></div>
                <div className="cursor-core"></div>
                <div className="cursor-ring"></div>
                <div className="cursor-ring-outer"></div>
            </div>
        </>
    )
}

export default CustomCursor
