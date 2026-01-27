import React, { useEffect, useState, useRef } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [clicked, setClicked] = useState(false)
    const [linkHover, setLinkHover] = useState(false)
    const [trail, setTrail] = useState([])
    const trailRef = useRef([])

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener('mousemove', mMove)
            document.addEventListener('mousedown', mDown)
            document.addEventListener('mouseup', mUp)
        }

        const removeEventListeners = () => {
            document.removeEventListener('mousemove', mMove)
            document.removeEventListener('mousedown', mDown)
            document.removeEventListener('mouseup', mUp)
        }

        const mMove = (el) => {
            const newPos = { x: el.clientX, y: el.clientY }
            setPosition(newPos)

            // Add to trail
            trailRef.current = [...trailRef.current, { ...newPos, id: Date.now() }].slice(-8)
            setTrail(trailRef.current)

            // Check for hover targets
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

        const mDown = () => setClicked(true)
        const mUp = () => setClicked(false)

        addEventListeners()
        return () => removeEventListeners()
    }, [])

    return (
        <>
            {/* Trail particles */}
            {trail.map((point, index) => (
                <div
                    key={point.id}
                    className="cursor-trail"
                    style={{
                        left: `${point.x}px`,
                        top: `${point.y}px`,
                        opacity: (index + 1) / trail.length * 0.5,
                        transform: `translate(-50%, -50%) scale(${(index + 1) / trail.length})`
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
