import React, { useEffect, useRef } from 'react'
import ProjectLog from '../components/ProjectLog'
import './HardwareCircuit.css'

const hardProjects = [
    {
        id: 'HW-01',
        title: 'Autonomous Drone Navigation System',
        status: 'DEPLOYED',
        problem: 'Standard GPS signals were unreliable in dense urban environments (canyons), causing drift > 2m.',
        decisions: [
            'Implemented Optical Flow sensor for local stabilization.',
            'Custom PID controller tuning for wind resistance.',
            'Switched from Raspberry Pi to Jetson Nano for onboard CV processing.'
        ],
        lessons: 'Power budget is critical; initial GPU load drained battery 30% faster than calculated.',
        images: [1, 2]
    },
    {
        id: 'HW-02',
        title: 'FPGA Soft Processor Core',
        status: 'ARCHIVED',
        problem: 'Learning strict timing constraints in Verilog by building a RISC-V subset core.',
        decisions: [
            '5-stage pipeline implementation.',
            'Hazard detection unit prioritization over branch prediction for simplicity.'
        ],
        lessons: 'Timing closure on low-end FPGAs requires careful routing constraints.',
        images: []
    }
]



// ... existing code ...

const HardwareModule = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.width = canvas.parentElement.offsetWidth
        let height = canvas.height = canvas.parentElement.offsetHeight

        const gridSize = 30
        const signalCount = 40
        const signals = []
        let mouse = { x: -1000, y: -1000 }

        class Signal {
            constructor() {
                this.reset()
            }

            reset() {
                // Snap to grid
                this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize
                this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize

                // Cardinal directions only
                if (Math.random() > 0.5) {
                    this.vx = (Math.random() > 0.5 ? 1 : -1) * 2 // Speed
                    this.vy = 0
                } else {
                    this.vx = 0
                    this.vy = (Math.random() > 0.5 ? 1 : -1) * 2
                }

                this.history = []
                this.historyMaxLength = 20
                this.life = 0
                this.maxLife = 100 + Math.random() * 100
                this.color = '#00f0ff'
            }

            update() {
                this.life++
                if (this.life > this.maxLife ||
                    this.x < 0 || this.x > width ||
                    this.y < 0 || this.y > height) {
                    this.reset()
                }

                // Change direction randomly at grid intersections
                if (this.x % gridSize === 0 && this.y % gridSize === 0 && Math.random() > 0.8) {
                    if (this.vx !== 0) {
                        this.vx = 0
                        this.vy = (Math.random() > 0.5 ? 1 : -1) * 2
                    } else {
                        this.vy = 0
                        this.vx = (Math.random() > 0.5 ? 1 : -1) * 2
                    }
                }

                this.x += this.vx
                this.y += this.vy

                // Trail history
                this.history.push({ x: this.x, y: this.y })
                if (this.history.length > this.historyMaxLength) {
                    this.history.shift()
                }

                // Mouse Interaction: High Energy Zone
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 150) {
                    this.color = '#fff' // White hot when near mouse
                } else {
                    this.color = '#00f0ff'
                }
            }

            draw() {
                if (this.history.length < 2) return

                ctx.beginPath()
                ctx.strokeStyle = this.color
                ctx.lineWidth = 2
                ctx.lineCap = 'square'

                // Draw trail
                ctx.moveTo(this.history[0].x, this.history[0].y)
                for (let i = 1; i < this.history.length; i++) {
                    ctx.lineTo(this.history[i].x, this.history[i].y)
                }
                ctx.stroke()

                // Head
                ctx.fillStyle = '#fff'
                ctx.fillRect(this.x - 2, this.y - 2, 4, 4)
            }
        }

        for (let i = 0; i < signalCount; i++) {
            signals.push(new Signal())
        }

        let animationFrameId
        const animate = () => {
            // Fade out effect for trails
            ctx.fillStyle = 'rgba(0, 5, 10, 0.1)' // Very dark blue fade
            ctx.fillRect(0, 0, width, height)

            // Draw Mouse Energy
            if (mouse.x > 0) {
                const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200)
                g.addColorStop(0, 'rgba(0, 240, 255, 0.1)')
                g.addColorStop(1, 'transparent')
                ctx.fillStyle = g
                ctx.fillRect(0, 0, width, height)
            }

            signals.forEach(s => {
                s.update()
                s.draw()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            width = canvas.width = canvas.parentElement.offsetWidth
            height = canvas.height = canvas.parentElement.offsetHeight
        }

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
        }

        window.addEventListener('resize', handleResize)
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000 })

        return () => {
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className="module-container hardware-module" style={{ position: 'relative', overflow: 'hidden' }}>
            <header className="module-header" style={{ position: 'relative', zIndex: 5 }}>
                <h1 className="dim">HARDWARE_MODULE</h1>
                <div className="header-line" style={{ opacity: 0.3 }}></div>
            </header>

            <div className="sys-panel" style={{ maxWidth: '600px', margin: '60px auto', position: 'relative', zIndex: 10 }}>
                {/* ... existing panel content ... */}
                <div className="panel-label">MODULE STATUS</div>
                <h2 style={{ color: 'var(--text-dim)', marginBottom: '20px' }}>REGISTERED</h2>

                <div className="metric-row">
                    <div className="panel-label">MODULE OVERVIEW</div>
                    <p style={{ marginTop: '5px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        This module is reserved for future hardware projects involving sensor interfacing, signal acquisition, and microcontroller based systems. Documentation will focus on design reasoning, testing methodology, and observed behavior rather than only final results.
                    </p>
                </div>

                <div className="metric-row" style={{ display: 'block', marginTop: '20px' }}>
                    <div className="panel-label">CURRENT PREPARATION</div>
                    <ul className="log-list" style={{ marginTop: '10px' }}>
                        <li>Revising core electronics and signal concepts</li>
                        <li>Learning microcontroller programming and interfaces</li>
                        <li>Studying real world signal noise and system constraints</li>
                    </ul>
                </div>

                <div className="metric-row" style={{ marginTop: '20px' }}>
                    <span className="dim">ACTIVATION CRITERIA</span>
                    <span className="accent">STABLE HARDWARE BUILD READY</span>
                </div>
            </div>

            {/* Hardware Circuit Animation Overlay */}
            <div className="hardware-circuit-container">
                {/* Distributed Chips */}
                <div className="central-chip chip-center">
                    <div className="chip-inner"><span className="chip-logo">◈</span></div>
                </div>
                <div className="central-chip chip-top-left"></div>
                <div className="central-chip chip-top-right"></div>
                <div className="central-chip chip-bottom-left"></div>
                <div className="central-chip chip-bottom-right"></div>
                <div className="central-chip chip-mid-left"></div>
                <div className="central-chip chip-mid-right"></div>

                {/* Canvas replacing SVG */}
                <canvas
                    ref={canvasRef}
                    className="circuit-canvas"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
                />
            </div>
        </div>
    )
}

export default HardwareModule
