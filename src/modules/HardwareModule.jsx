import React, { useEffect, useRef } from 'react'
import './HardwareCircuit.css'

const HardwareModule = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.width = canvas.parentElement.offsetWidth
        let height = canvas.height = canvas.parentElement.offsetHeight

        const gridSize = 30
        const signalCount = 20
        const signals = []
        let mouse = { x: -1000, y: -1000 }

        class Signal {
            constructor() { this.reset() }
            reset() {
                this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize
                this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize
                if (Math.random() > 0.5) {
                    this.vx = (Math.random() > 0.5 ? 1 : -1)
                    this.vy = 0
                } else {
                    this.vx = 0
                    this.vy = (Math.random() > 0.5 ? 1 : -1)
                }
                this.history = []
                this.maxHistory = 18
                this.life = 0
                this.maxLife = 80 + Math.random() * 120
            }
            update() {
                this.life++
                if (this.life > this.maxLife || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.reset(); return
                }
                if (this.x % gridSize === 0 && this.y % gridSize === 0 && Math.random() > 0.82) {
                    if (this.vx !== 0) { this.vx = 0; this.vy = (Math.random() > 0.5 ? 1 : -1) }
                    else { this.vy = 0; this.vx = (Math.random() > 0.5 ? 1 : -1) }
                }
                this.x += this.vx
                this.y += this.vy
                this.history.push({ x: this.x, y: this.y })
                if (this.history.length > this.maxHistory) this.history.shift()
                const dx = mouse.x - this.x, dy = mouse.y - this.y
                this.bright = Math.sqrt(dx * dx + dy * dy) < 130
            }
            draw() {
                if (this.history.length < 2) return
                ctx.beginPath()
                ctx.strokeStyle = this.bright
                    ? `rgba(255, 255, 255, 0.85)`
                    : `rgba(255, 255, 255, 0.25)`
                ctx.lineWidth = this.bright ? 1.5 : 1
                ctx.lineCap = 'square'
                ctx.moveTo(this.history[0].x, this.history[0].y)
                for (let i = 1; i < this.history.length; i++) ctx.lineTo(this.history[i].x, this.history[i].y)
                ctx.stroke()
                ctx.fillStyle = this.bright ? '#fff' : 'rgba(255,255,255,0.5)'
                ctx.fillRect(this.x - 1.5, this.y - 1.5, 3, 3)
            }
        }

        for (let i = 0; i < signalCount; i++) signals.push(new Signal())

        let raf
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.12)'
            ctx.fillRect(0, 0, width, height)
            if (mouse.x > 0) {
                const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180)
                g.addColorStop(0, 'rgba(255, 255, 255, 0.04)')
                g.addColorStop(1, 'transparent')
                ctx.fillStyle = g
                ctx.fillRect(0, 0, width, height)
            }
            signals.forEach(s => { s.update(); s.draw() })
            raf = requestAnimationFrame(animate)
        }
        animate()

        const onResize = () => {
            width = canvas.width = canvas.parentElement.offsetWidth
            height = canvas.height = canvas.parentElement.offsetHeight
        }
        const onMouseMove = e => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
        }
        window.addEventListener('resize', onResize)
        canvas.addEventListener('mousemove', onMouseMove)
        canvas.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000 })
        return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf) }
    }, [])

    return (
        <div className="module-container hardware-module" style={{ position: 'relative', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />

            <div className="hw-content" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column' }}>
                <header className="module-header" style={{ position: 'relative', zIndex: 5 }}>
                    <div className="sw-header-tag">// MODULE 02</div>
                    <h1>HARDWARE_MODULE</h1>
                    <div className="header-line" />
                    <p className="sw-subtitle">Embedded systems, signal acquisition & physical computing</p>
                </header>

                <div className="coming-soon-center">
                    <div className="coming-soon-icon">◈</div>
                    <h2 className="coming-soon-title">MISSION PLANNED</h2>
                    <p className="coming-soon-desc">
                        The hardware laboratory is being established. Initializing base sensors,
                        microcontroller foundations, and workspace logistics.
                    </p>

                    <div className="coming-soon-bar-wrap">
                        <div className="coming-soon-bar">
                            <div className="coming-soon-bar-fill" style={{ width: '18%' }} />
                        </div>
                        <span className="coming-soon-pct">18%</span>
                    </div>

                    <div className="coming-soon-badge">
                        STATUS: LAUNCH PENDING · EST. Q3 2026
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HardwareModule
