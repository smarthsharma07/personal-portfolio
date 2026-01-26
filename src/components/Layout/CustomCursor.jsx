import React, { useEffect, useState } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [clicked, setClicked] = useState(false)
    const [linkHover, setLinkHover] = useState(false)

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
            setPosition({ x: el.clientX, y: el.clientY })

            // Check for hover targets
            const target = el.target
            if (target && (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('nav-link')
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
        <div
            className={`cursor-root ${clicked ? 'clicked' : ''} ${linkHover ? 'hover' : ''}`}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
            <div className="cursor-reticle"></div>
            <div className="cursor-dot"></div>
        </div>
    )
}

export default CustomCursor
