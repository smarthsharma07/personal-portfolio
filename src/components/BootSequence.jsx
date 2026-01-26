import React, { useState, useEffect, useRef } from 'react'
import './BootSequence.css'

const BootSequence = ({ onComplete }) => {
    const [active, setActive] = useState(true)
    const [text, setText] = useState('')
    const fullText = "INITIALISING SYSTEM INTERFACE..."
    const canvasRef = useRef(null)

    useEffect(() => {
        // Signals Animation (Simplified Version)
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        let signals = []
        class BootSignal {
            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.speed = Math.random() * 5 + 2
                this.size = Math.random() * 2 + 1
                this.vertical = Math.random() > 0.5
            }
            update() {
                if (this.vertical) this.y -= this.speed
                else this.x += this.speed

                if (this.x > width) this.x = 0
                if (this.y < 0) this.y = height
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 240, 255, 0.3)'
                ctx.fillRect(this.x, this.y, this.vertical ? 2 : this.speed * 2, this.vertical ? this.speed * 2 : 2)
            }
        }

        for (let i = 0; i < 30; i++) signals.push(new BootSignal())

        const animate = () => {
            ctx.clearRect(0, 0, width, height)
            signals.forEach(s => { s.update(); s.draw() })
            if (active) requestAnimationFrame(animate)
        }
        animate()

        // Typing effect
        let charIndex = 0
        const typeInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                setText(prev => prev + fullText.charAt(charIndex))
                charIndex++
            } else {
                clearInterval(typeInterval)
            }
        }, 50)

        // Auto dismiss
        const timber = setTimeout(() => {
            handleComplete()
        }, 2500)

        return () => {
            clearTimeout(timber)
            clearInterval(typeInterval)
        }
    }, [])

    const handleComplete = () => {
        setActive(false)
        setTimeout(onComplete, 500) // Wait for exit anim
    }

    if (!active) return null

    return (
        <div className="boot-overlay" onClick={handleComplete}>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
            <div className="boot-content">
                <div className="rec-indicator" style={{ width: 'auto', letterSpacing: '2px' }}>
                    <span className="rec-dot">●</span> PROCESSING THE ARCHITECTURE
                </div>
                <div className="boot-text">
                    {text}<span className="cursor">_</span>
                </div>
                <div className="boot-sub">
                    ESTABLISHING SECURE CONNECTION
                </div>
            </div>
            <div className="noise"></div>
        </div>
    )
}

export default BootSequence
