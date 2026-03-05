import React, { useEffect, useRef, useState } from 'react'

// ============================================
// 📝 WHEN YOU'RE READY: Uncomment the section below and add your ML projects
// Then update the code at the bottom to display ProjectCard components
// ============================================

// import ProjectCard from '../components/ProjectCard'
// 
// const mlProjects = [
//     {
//         id: 'ML-001',
//         title: 'Your ML Project Title',
//         description: 'Brief description of what your project does and the problem it solves.',
//         techStack: ['Python', 'TensorFlow', 'Keras', 'NumPy'],
//         githubUrl: 'https://github.com/yourusername/your-repo',
//         liveUrl: '',  // Optional: add live demo URL or leave empty
//         status: 'ACTIVE'  // Options: ACTIVE, DEPLOYED, WIP, ARCHIVED
//     },
//     // Add more projects here
// ]

// ============================================

const MLModule = () => {
    const canvasRef = useRef(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.width = canvas.parentElement.offsetWidth
        let height = canvas.height = canvas.parentElement.offsetHeight

        let animationFrameId
        let particles = []
        const particleCount = 100
        const connectionDistance = 100
        const interactionRadius = 150

        // Mouse state
        let mouse = { x: -1000, y: -1000 }

        class Particle {
            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size = Math.random() * 2 + 1
                // Brain shape bias: push towards center
                // We'll simulate a loose attraction to center to keep the "brain" mass together
                this.baseX = this.x
                this.baseY = this.y
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1
                if (this.y < 0 || this.y > height) this.vy *= -1

                // Mouse Interaction (Repulsion)
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < interactionRadius) {
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const force = (interactionRadius - distance) / interactionRadius
                    const directionX = forceDirectionX * force * 2
                    const directionY = forceDirectionY * force * 2 // Strength

                    this.x -= directionX
                    this.y -= directionY
                }
            }

            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = '#7c3aed'
                ctx.fill()
            }
        }

        // Initialize
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height)

            // Draw Connections
            ctx.lineWidth = 0.5
            for (let i = 0; i < particleCount; i++) {
                particles[i].update()
                particles[i].draw() // Draw dots

                // Check neighbors
                for (let j = i; j < particleCount; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(124, 58, 237, ${1 - distance / connectionDistance})`
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            width = canvas.width = canvas.parentElement.offsetWidth
            height = canvas.height = canvas.parentElement.offsetHeight
            // Re-init particles on resize if needed, or just let them bound
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
        <div className="module-container ml-module" style={{ position: 'relative', overflow: 'hidden' }}>
            <header className="module-header" style={{ position: 'relative', zIndex: 10 }}>
                <h1 style={{ color: 'var(--accent-secondary)', textShadow: '0 0 20px rgba(124,58,237,0.4)' }}>MACHINE_LEARNING_MODULE</h1>
                <div className="header-line" style={{ opacity: 0.3 }}></div>
            </header>

            <div className="sys-panel" style={{ maxWidth: '600px', margin: '60px auto', position: 'relative', zIndex: 10 }}>
                <div className="panel-label">MODULE STATUS</div>
                <h2 style={{ color: 'var(--text-dim)', marginBottom: '20px' }}>REGISTERED</h2>

                <div className="metric-row">
                    <div className="panel-label">MODULE OVERVIEW</div>
                    <p style={{ marginTop: '5px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        This module will document applied machine learning experiments after sufficient foundational work is completed. The focus will be on data preprocessing decisions, model selection reasoning, and limitations.
                    </p>
                </div>

                <div className="metric-row" style={{ display: 'block', marginTop: '20px' }}>
                    <div className="panel-label">CURRENT PREPARATION</div>
                    <ul className="log-list" style={{ marginTop: '10px' }}>
                        <li>Practicing data preprocessing techniques</li>
                        <li>Understanding encoding and scaling decisions</li>
                        <li>Learning model evaluation and interpretation</li>
                    </ul>
                </div>
            </div>

            {/* Canvas Brain Visualization */}
            <canvas
                ref={canvasRef}
                className="ml-brain-canvas"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    opacity: 1.0
                }}
            />
        </div>
    )
}

export default MLModule
