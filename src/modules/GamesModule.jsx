import React, { useEffect, useRef } from 'react'
import './GamesModule.css'

const GamesModule = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let w = canvas.width = canvas.parentElement.offsetWidth
        let h = canvas.height = canvas.parentElement.offsetHeight
        const cols = Math.floor(w / 18)
        const drops = Array.from({ length: cols }, () => Math.random() * -80)
        const CHARS = '01アイウエオカキクケABCDEFXYZ◈◎△▣'

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
            ctx.fillRect(0, 0, w, h)
            ctx.font = '12px monospace'
            for (let i = 0; i < drops.length; i++) {
                const c = CHARS[Math.floor(Math.random() * CHARS.length)]
                const bright = Math.random() > 0.85
                ctx.fillStyle = bright
                    ? `rgba(255, 255, 255, ${0.5 + Math.random() * 0.4})`
                    : `rgba(255, 255, 255, ${0.04 + Math.random() * 0.08})`
                ctx.fillText(c, i * 18, drops[i] * 18)
                if (drops[i] * 18 > h && Math.random() > 0.975) drops[i] = 0
                drops[i]++
            }
        }
        const iv = setInterval(draw, 55)
        const onResize = () => {
            w = canvas.width = canvas.parentElement.offsetWidth
            h = canvas.height = canvas.parentElement.offsetHeight
        }
        window.addEventListener('resize', onResize)
        return () => { clearInterval(iv); window.removeEventListener('resize', onResize) }
    }, [])

    return (
        <div className="module-container game-module" style={{ position: 'relative', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.3 }} />

            <div className="game-content" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column' }}>
                <header className="module-header" style={{ position: 'relative', zIndex: 5 }}>
                    <div className="sw-header-tag">// LEVEL SELECT</div>
                    <h1>GAMES_MODULE</h1>
                    <div className="header-line" />
                    <p className="sw-subtitle">Game systems, mechanics & interactive experiences</p>
                </header>

                <div className="coming-soon-center">
                    <div className="coming-soon-icon">△</div>
                    <h2 className="coming-soon-title">SECTOR LOCKED</h2>
                    <p className="coming-soon-desc">
                        Core software and engineering foundations must be solidified before
                        game development modules can be safely initialized.
                    </p>

                    <div className="coming-soon-bar-wrap">
                        <div className="coming-soon-bar">
                            <div className="coming-soon-bar-fill" style={{ width: '12%' }} />
                        </div>
                        <span className="coming-soon-pct">12%</span>
                    </div>

                    <div className="coming-soon-badge">
                        STATUS: CLEARANCE REQUIRED · INITIALIZING PROTOCOLS
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamesModule
