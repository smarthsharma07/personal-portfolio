import React, { useState, useEffect, useRef } from 'react'
import './BootSequence.css'

const CONSOLE_LINES = [
    '> BIOS v3.0.7 initialized',
    '> CPU: CORTEX-A72 @ 1.5GHz [OK]',
    '> RAM: 8192MB DDR4 [OK]',
    '> GPU: MALI-G76 [OK]',
    '> SERIAL: /dev/ttyUSB0 115200 [CONNECTED]',
    '> SENSOR_ARRAY: IMU + PPG [ONLINE]',
    '> FIRMWARE: v2.1.4 flashed [VERIFIED]',
    '> NETWORK: establishing uplink...',
]

const SUBTITLE = '> deep space connection established.'

const BootSequence = ({ onComplete }) => {
    const [phase, setPhase] = useState('idle')
    const [phaseLabel, setPhaseLabel] = useState('')
    const [subtitleText, setSubtitle] = useState('')
    const [progress, setProgress] = useState(0)
    const [fading, setFading] = useState(false)
    const [consoleLines, setConsoleLines] = useState([])
    const canvasRef = useRef(null)
    const doneRef = useRef(false)

    const finish = () => {
        if (doneRef.current) return
        doneRef.current = true
        setFading(true)
        setTimeout(onComplete, 800)
    }

    // Starfield canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let w = canvas.width = window.innerWidth
        let h = canvas.height = window.innerHeight
        const stars = Array.from({ length: 300 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            z: Math.random() * 3,
            size: Math.random() * 1.5 + 0.3,
        }))

        let raf
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
            ctx.fillRect(0, 0, w, h)
            stars.forEach(s => {
                s.y += s.z * 0.3
                if (s.y > h) { s.y = 0; s.x = Math.random() * w }
                const twinkle = Math.sin(Date.now() * 0.003 * s.z + s.x) * 0.3 + 0.7
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${twinkle * s.z / 3})`
                ctx.fill()
            })
            raf = requestAnimationFrame(draw)
        }
        draw()
        return () => cancelAnimationFrame(raf)
    }, [])

    // Console line feed
    useEffect(() => {
        let i = 0
        const iv = setInterval(() => {
            if (i < CONSOLE_LINES.length) {
                setConsoleLines(prev => [...prev, CONSOLE_LINES[i]])
                i++
            } else {
                clearInterval(iv)
            }
        }, 260)
        return () => clearInterval(iv)
    }, [])

    // Phase timeline
    useEffect(() => {
        const t1 = setTimeout(() => { setPhase('scan'); setPhaseLabel('SCANNING SECTOR...') }, 200)
        const t2 = setTimeout(() => { setPhase('lock'); setPhaseLabel('SIGNAL DETECTED') }, 2200)
        const t3 = setTimeout(() => { setPhase('reveal'); setPhaseLabel('ORBIT ESTABLISHED') }, 3200)
        const t4 = setTimeout(finish, 5200)
        return () => [t1, t2, t3, t4].forEach(clearTimeout)
    }, [])

    // Typewriter
    useEffect(() => {
        const start = setTimeout(() => {
            let i = 0
            const iv = setInterval(() => {
                if (i < SUBTITLE.length) { setSubtitle(SUBTITLE.slice(0, ++i)) }
                else clearInterval(iv)
            }, 30)
            return () => clearInterval(iv)
        }, 3400)
        return () => clearTimeout(start)
    }, [])

    // Progress bar
    useEffect(() => {
        const t0 = Date.now()
        const dur = 4800
        const raf = () => {
            const pct = Math.min(100, Math.round(((Date.now() - t0) / dur) * 100))
            setProgress(pct)
            if (pct < 100) requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    }, [])

    return (
        <div
            className={`boot-overlay boot-phase-${phase} ${fading ? 'boot-fading' : ''}`}
            onClick={finish}
        >
            <canvas ref={canvasRef} className="boot-starfield" />

            {/* Console output (left side) */}
            <div className="boot-console">
                {consoleLines.map((line, i) => (
                    <div key={i} className={`console-line ${i === consoleLines.length - 1 ? 'console-line-new' : ''}`}>
                        {line}
                    </div>
                ))}
                <span className="console-cursor">_</span>
            </div>

            {/* Orbital rings */}
            <svg className="boot-orbital" viewBox="0 0 400 400" aria-hidden="true">
                <defs>
                    <linearGradient id="orb-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                        <stop offset="50%" stopColor="#fff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <ellipse cx="200" cy="200" rx="180" ry="180" className="orbital-ring orbital-outer" />
                <ellipse cx="200" cy="200" rx="130" ry="130" className="orbital-ring orbital-mid" />
                <ellipse cx="200" cy="200" rx="80" ry="80" className="orbital-ring orbital-inner" />

                {Array.from({ length: 36 }).map((_, i) => {
                    const a = (i * 10 * Math.PI) / 180
                    const r1 = 175, r2 = i % 9 === 0 ? 162 : 168
                    return (
                        <line key={i}
                            x1={200 + r1 * Math.cos(a)} y1={200 + r1 * Math.sin(a)}
                            x2={200 + r2 * Math.cos(a)} y2={200 + r2 * Math.sin(a)}
                            className={`orbital-tick ${i % 9 === 0 ? 'orbital-tick-major' : ''}`}
                        />
                    )
                })}

                <line x1="200" y1="20" x2="200" y2="70" className="orbital-cross" />
                <line x1="200" y1="330" x2="200" y2="380" className="orbital-cross" />
                <line x1="20" y1="200" x2="70" y2="200" className="orbital-cross" />
                <line x1="330" y1="200" x2="380" y2="200" className="orbital-cross" />

                <circle cx="200" cy="200" r="4" className="orbital-center" />
                <circle cx="200" cy="200" r="180" className="orbital-sweep" />
            </svg>

            {/* Name reveal */}
            <div className="boot-name-wrap">
                <div className="boot-phase-label" data-phase={phase}>{phaseLabel}</div>
                <div className="boot-first">SMARTH</div>
                <div className="boot-last">SHARMA</div>
                <div className="boot-role">ENGINEER · SYSTEMS · AI</div>
                <div className="boot-acquired">✦ ORBIT ESTABLISHED ✦</div>
            </div>

            {/* Bottom HUD */}
            <div className="boot-hud">
                <div className="boot-typewriter">{subtitleText}<span className="boot-caret">_</span></div>
                <div className="boot-bar-track">
                    <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
                    <div className="boot-bar-dot" style={{ left: `${progress}%` }} />
                </div>
                <div className="boot-meta">
                    <span className="boot-pct">{progress}%</span>
                    <span className="boot-skip">CLICK TO SKIP</span>
                    <span className="boot-ver">v3.0.0</span>
                </div>
            </div>

            <div className="bc bc-tl" /><div className="bc bc-tr" />
            <div className="bc bc-bl" /><div className="bc bc-br" />
        </div>
    )
}

export default BootSequence
