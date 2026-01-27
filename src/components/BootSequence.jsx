import React, { useState, useEffect, useRef } from 'react'
import './BootSequence.css'

const BootSequence = ({ onComplete }) => {
    const [active, setActive] = useState(true)
    const canvasRef = useRef(null)

    useEffect(() => {
        // Space Warp Effect
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        // Star field for space warp
        let stars = []
        const centerX = width / 2
        const centerY = height / 2

        class Star {
            constructor() {
                this.reset()
            }
            reset() {
                this.x = (Math.random() - 0.5) * width
                this.y = (Math.random() - 0.5) * height
                this.z = Math.random() * width
                this.prevX = this.x
                this.prevY = this.y
            }
            update() {
                this.prevX = this.x
                this.prevY = this.y

                // Move star towards viewer (warp effect)
                this.z -= 15

                if (this.z <= 0) {
                    this.reset()
                }
            }
            draw() {
                // Project 3D to 2D
                const x = (this.x / this.z) * width + centerX
                const y = (this.y / this.z) * height + centerY
                const prevX = (this.prevX / (this.z + 15)) * width + centerX
                const prevY = (this.prevY / (this.z + 15)) * height + centerY

                // Size based on depth
                const size = (1 - this.z / width) * 3

                // Brightness based on speed
                const brightness = (1 - this.z / width)

                // Draw star trail
                ctx.strokeStyle = `rgba(0, 240, 255, ${brightness * 0.8})`
                ctx.lineWidth = size
                ctx.beginPath()
                ctx.moveTo(prevX, prevY)
                ctx.lineTo(x, y)
                ctx.stroke()

                // Draw star point
                ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Create stars
        for (let i = 0; i < 200; i++) {
            stars.push(new Star())
        }

        const animate = () => {
            // Fade effect for trails
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
            ctx.fillRect(0, 0, width, height)

            stars.forEach(star => {
                star.update()
                star.draw()
            })

            if (active) requestAnimationFrame(animate)
        }
        animate()

        // Auto dismiss
        const timer = setTimeout(() => {
            handleComplete()
        }, 3500)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleComplete = () => {
        setActive(false)
        setTimeout(onComplete, 500)
    }

    if (!active) return null

    return (
        <div className="boot-overlay" onClick={handleComplete}>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', background: '#000' }} />
            <div className="boot-content">
                <div className="name-container">
                    <div className="first-name">SMARTH</div>
                    <div className="last-name">SHARMA</div>
                </div>
                <div className="boot-sub warp-text">
                    ENTERING HYPERINTELLIGENCE
                </div>
            </div>
            <div className="noise"></div>
        </div>
    )
}

export default BootSequence
