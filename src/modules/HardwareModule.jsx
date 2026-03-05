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
        const signalCount = 25
        const signals = []
        let mouse = { x: -1000, y: -1000 }

        class Signal {
            constructor() { this.reset() }
            reset() {
                this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize
                this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize
                if (Math.random() > 0.5) {
                    this.vx = (Math.random() > 0.5 ? 1 : -1) * 1
                    this.vy = 0
                } else {
                    this.vx = 0
                    this.vy = (Math.random() > 0.5 ? 1 : -1) * 1
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
                    if (this.vx !== 0) { this.vx = 0; this.vy = (Math.random() > 0.5 ? 1 : -1) * 1 }
                    else { this.vy = 0; this.vx = (Math.random() > 0.5 ? 1 : -1) * 1 }
                }
                this.x += this.vx
                this.y += this.vy
                this.history.push({ x: this.x, y: this.y })
                if (this.history.length > this.maxHistory) this.history.shift()
                const dx = mouse.x - this.x, dy = mouse.y - this.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                this.bright = dist < 130
            }
            draw() {
                if (this.history.length < 2) return
                ctx.beginPath()
                ctx.strokeStyle = this.bright
                    ? `rgba(255, 220, 100, 0.9)`
                    : `rgba(245, 158, 11, 0.45)`
                ctx.lineWidth = this.bright ? 2 : 1.5
                ctx.lineCap = 'square'
                ctx.moveTo(this.history[0].x, this.history[0].y)
                for (let i = 1; i < this.history.length; i++) ctx.lineTo(this.history[i].x, this.history[i].y)
                ctx.stroke()
                // Head dot
                ctx.fillStyle = this.bright ? '#fff' : `rgba(245,158,11,0.8)`
                ctx.fillRect(this.x - 2, this.y - 2, 4, 4)
            }
        }

        for (let i = 0; i < signalCount; i++) signals.push(new Signal())

        let raf
        const animate = () => {
            ctx.fillStyle = 'rgba(3, 5, 18, 0.12)'
            ctx.fillRect(0, 0, width, height)
            if (mouse.x > 0) {
                const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180)
                g.addColorStop(0, 'rgba(245, 158, 11, 0.08)')
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
            {/* Canvas BG */}
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
            />
            {/* Amber chip decorations */}
            <div className="hardware-circuit-container">
                <div className="central-chip chip-center"><div className="chip-inner"><span className="chip-logo">◈</span></div></div>
                <div className="central-chip chip-top-left" />
                <div className="central-chip chip-top-right" />
                <div className="central-chip chip-bottom-left" />
                <div className="central-chip chip-bottom-right" />
                <div className="central-chip chip-mid-left" />
                <div className="central-chip chip-mid-right" />
            </div>

            <div className="hw-content" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <header className="module-header" style={{ position: 'relative', zIndex: 5 }}>
                    <div className="hw-header-tag">// MODULE 02</div>
                    <h1 className="hw-title">HARDWARE_MODULE</h1>
                    <div className="hw-title-line" />
                    <p className="hw-subtitle">Embedded systems, signal acquisition &amp; physical computing</p>
                </header>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', zIndex: 5, position: 'relative', padding: '40px 20px' }}>
                    <div style={{
                        fontSize: '3.5rem',
                        color: 'var(--accent-gold)',
                        filter: 'drop-shadow(0 0 15px rgba(245,158,11,0.4))',
                        marginBottom: '10px'
                    }}>
                        🚧
                    </div>

                    <h2 style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent-gold)',
                        letterSpacing: '0.25em',
                        fontSize: '1.4rem',
                        textAlign: 'center'
                    }}>
                        IN DEVELOPMENT
                    </h2>

                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-secondary)',
                        maxWidth: '420px',
                        textAlign: 'center',
                        lineHeight: '1.6',
                        fontSize: '0.85rem'
                    }}>
                        The hardware laboratory is currently being established. Initializing base sensors, microcontroller foundations, and workspace logistics...
                    </p>

                    <div style={{
                        marginTop: '20px',
                        padding: '12px 24px',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        background: 'rgba(245, 158, 11, 0.05)',
                        color: 'var(--accent-gold)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.15em',
                        backdropFilter: 'blur(10px)'
                    }}>
                        STATUS: ESTIMATED COMPLETION Q3 2026
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HardwareModule
