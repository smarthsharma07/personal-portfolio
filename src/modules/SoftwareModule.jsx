import React, { useEffect, useRef } from 'react'

const SoftwareModule = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.width = canvas.parentElement.offsetWidth
        let height = canvas.height = canvas.parentElement.offsetHeight

        const columns = Math.floor(width / 20)
        const drops = []

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100 // Start above screen with random delay
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)' // Trails
            ctx.fillRect(0, 0, width, height)

            ctx.fillStyle = '#0F0' // Matrix/Code Green color
            ctx.font = '15px monospace'

            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(0x30A0 + Math.random() * 96) // Random Katakana/Matrix char
                // or just binary: Math.random() > 0.5 ? '1' : '0' 

                ctx.fillStyle = `rgba(0, 240, 255, ${Math.random()})` // Cyan variations
                ctx.fillText(text, i * 20, drops[i] * 20)

                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            }
        }

        const interval = setInterval(draw, 50)

        const handleResize = () => {
            width = canvas.width = canvas.parentElement.offsetWidth
            height = canvas.height = canvas.parentElement.offsetHeight
        }
        window.addEventListener('resize', handleResize)

        return () => {
            clearInterval(interval)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="module-container" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Digital Rain Background */}
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.3 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <header className="module-header">
                    <h1>SOFTWARE_SYSTEMS</h1>
                    <div className="header-line"></div>
                </header>

                <div className="sys-panel" style={{ marginBottom: '20px' }}>
                    <div className="metric-row">
                        <span>MODULE STATUS</span>
                        <span className="metric-val accent">ACTIVE</span>
                    </div>
                    <div className="metric-row" style={{ display: 'block', marginTop: '10px' }}>
                        <div className="panel-label">MODULE_OVERVIEW</div>
                        <p style={{ marginTop: '5px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                            This module contains software tools and scripts developed during learning and experimentation. The goal of this work is to solve concrete problems with simple, readable, and maintainable code.
                        </p>
                    </div>
                </div>

                <div className="project-log">
                    <header className="log-header">
                        <div className="log-meta">
                            <span className="log-id">SW-TOOL-001</span>
                            <span className="log-status status-deployed">[USABLE_AND_ITERATING]</span>
                        </div>
                        <h3 className="log-title">Utility or Automation Script</h3>
                    </header>

                    <section className="log-section">
                        <h4 className="section-label">PROBLEM</h4>
                        <p>Certain tasks encountered during study and practice are repetitive or error prone when performed manually.</p>
                    </section>

                    <section className="log-section">
                        <h4 className="section-label">SOLUTION</h4>
                        <p>A lightweight software tool was implemented to automate or simplify the task using clear logic and minimal dependencies.</p>
                    </section>

                    <section className="log-section">
                        <h4 className="section-label">TECH_STACK</h4>
                        <ul className="log-list">
                            <li>Python and standard libraries</li>
                        </ul>
                    </section>

                    <section className="log-section">
                        <h4 className="section-label">KEY_LEARNINGS</h4>
                        <p className="mono dim">This work reinforced the importance of code clarity, handling edge cases, and verifying outputs rather than relying on assumptions.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default SoftwareModule
