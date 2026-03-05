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
        const CHARS = '01アイウエオカキクケABCDEFXYZ'

        const draw = () => {
            ctx.fillStyle = 'rgba(3, 5, 18, 0.1)'
            ctx.fillRect(0, 0, w, h)
            ctx.font = '12px monospace'
            for (let i = 0; i < drops.length; i++) {
                const c = CHARS[Math.floor(Math.random() * CHARS.length)]
                const bright = Math.random() > 0.85
                ctx.fillStyle = bright
                    ? `rgba(0, 255, 136, ${0.7 + Math.random() * 0.3})`
                    : `rgba(0, 255, 136, ${0.1 + Math.random() * 0.2})`
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
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.35 }} />
            <div className="game-pixel-grid" />

            <div className="game-content" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column' }}>
                <header className="module-header" style={{ position: 'relative', zIndex: 5 }}>
                    <div className="game-header-tag">// LEVEL SELECT</div>
                    <h1 className="game-title">GAMES_MODULE</h1>
                    <div className="game-title-line" />
                    <p className="game-subtitle">Game systems, mechanics &amp; interactive experiences</p>
                </header>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', zIndex: 5, position: 'relative', padding: '40px 20px' }}>
                    <div style={{
                        fontSize: '3.5rem',
                        color: 'var(--success)',
                        filter: 'drop-shadow(0 0 15px rgba(0,255,136,0.4))',
                        marginBottom: '10px'
                    }}>
                        🔒
                    </div>

                    <h2 style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--success)',
                        letterSpacing: '0.25em',
                        fontSize: '1.4rem',
                        textAlign: 'center'
                    }}>
                        LEVEL LOCKED
                    </h2>

                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-secondary)',
                        maxWidth: '420px',
                        textAlign: 'center',
                        lineHeight: '1.6',
                        fontSize: '0.85rem'
                    }}>
                        Core software and engineering foundations must be solidified before game development modules can be safely initialized.
                    </p>

                    <div style={{ width: '100%', maxWidth: '300px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginTop: '15px' }}>
                        <div style={{ width: '12%', height: '100%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }} />
                    </div>

                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--text-dim)',
                        letterSpacing: '0.15em',
                        marginTop: '8px'
                    }}>
                        INITIALIZING PROTOCOLS... 12%
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamesModule
