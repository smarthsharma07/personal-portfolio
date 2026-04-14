import React, { useEffect, useRef } from 'react'
import ProjectCard from '../components/ProjectCard'

const mlProjects = [
    {
        id: 'ML-001',
        title: 'Zomato CSAO Recommendation Engine',
        description:
            'Two-stage ML recommendation system for contextual food add-ons using semantic vector retrieval (all-MiniLM-L6-v2) and LightGBM LambdaMART ranking. 2 models, 0.78 AUC-ROC, end-to-end pipeline. Features 300+ item catalog across 7 cuisines, weighted sequential cart pooling, strict cuisine filtering, and diversity-constrained Top-8 output, all under 300ms latency.',
        techStack: ['Python', 'LightGBM', 'Pandas', 'NumPy', 'NetworkX', 'Scikit-learn'],
        githubUrl: 'https://github.com/smarthsharma07/zomato-csao-recommendation-engine',
        liveUrl: '',
        status: 'DEPLOYED'
    },
]

const MLModule = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.width = canvas.parentElement.offsetWidth
        let height = canvas.height = canvas.parentElement.offsetHeight
        let animationFrameId
        let particles = []
        const particleCount = 120
        const connectionDistance = 110
        const interactionRadius = 160
        let mouse = { x: -1000, y: -1000 }

        class Particle {
            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.4
                this.vy = (Math.random() - 0.5) * 0.4
                this.size = Math.random() * 2 + 0.8
            }
            update() {
                this.x += this.vx
                this.y += this.vy
                if (this.x < 0 || this.x > width) this.vx *= -1
                if (this.y < 0 || this.y > height) this.vy *= -1

                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < interactionRadius) {
                    const force = (interactionRadius - distance) / interactionRadius
                    this.x -= (dx / distance) * force * 2
                    this.y -= (dy / distance) * force * 2
                }
            }
            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
                ctx.fill()
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height)
            ctx.lineWidth = 0.4
            for (let i = 0; i < particleCount; i++) {
                particles[i].update()
                particles[i].draw()
                for (let j = i; j < particleCount; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / connectionDistance) * 0.2})`
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

    const stats = [
        { label: 'MODELS', value: '02' },
        { label: 'AUC-ROC', value: '0.78' },
        { label: 'PIPELINE', value: 'E2E' },
        { label: 'STATUS', value: 'LIVE' },
    ]

    return (
        <div className="module-container ml-module" style={{ position: 'relative', overflow: 'hidden' }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%', zIndex: 0, opacity: 0.7
                }}
            />

            <div style={{ position: 'relative', zIndex: 10 }}>
                <header className="module-header">
                    <div className="sw-header-tag">// MODULE 03</div>
                    <h1>MACHINE_LEARNING</h1>
                    <div className="header-line" />
                    <p className="sw-subtitle">Applied ML experiments, pipelines & deployed models</p>
                </header>

                {/* ML Approach Overview */}
                <div className="sys-panel" style={{ marginBottom: '32px' }}>
                    <div className="panel-label">APPROACH</div>
                    <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', maxWidth: '700px' }}>
                        Focus on end-to-end ML, from raw data to production-ready models.
                        Each project emphasizes data preprocessing decisions, model selection reasoning,
                        real-world constraints, and honest evaluation of limitations.
                    </p>
                </div>

                <div className="sw-label-row">
                    <span className="sw-section-label">▶ PROJECT_LOG</span>
                    <span className="sw-count">{mlProjects.length} ENTRIES</span>
                </div>
                <div className="sw-cards-grid">
                    {mlProjects.map(project => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MLModule
