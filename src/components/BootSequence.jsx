import React, { useState, useEffect, useRef } from 'react'
import './BootSequence.css'

const SUBTITLE = '> synchronizing neural interface...'

const BootSequence = ({ onComplete }) => {
    const [phase, setPhase] = useState('idle')   // idle → scan → lock → reveal → done
    const [phaseLabel, setPhaseLabel] = useState('')
    const [subtitleText, setSubtitle] = useState('')
    const [progress, setProgress] = useState(0)
    const [fading, setFading] = useState(false)
    const doneRef = useRef(false)

    const finish = () => {
        if (doneRef.current) return
        doneRef.current = true
        setFading(true)
        setTimeout(onComplete, 650)
    }

    useEffect(() => {
        // Phase timeline
        const t1 = setTimeout(() => { setPhase('scan'); setPhaseLabel('SCANNING...') }, 100)
        const t2 = setTimeout(() => { setPhase('lock'); setPhaseLabel('LOCKING ON...') }, 1400)
        const t3 = setTimeout(() => { setPhase('reveal'); setPhaseLabel('TARGET LOCKED') }, 2000)
        const t4 = setTimeout(finish, 4000); return () => [t1, t2, t3, t4].forEach(clearTimeout)
    }, [])

    // Typewriter — starts at reveal phase ~2.2s
    useEffect(() => {
        const start = setTimeout(() => {
            let i = 0
            const iv = setInterval(() => {
                if (i < SUBTITLE.length) { setSubtitle(SUBTITLE.slice(0, ++i)) }
                else clearInterval(iv)
            }, 40)
            return () => clearInterval(iv)
        }, 2200)
        return () => clearTimeout(start)
    }, [])

    // Progress bar
    useEffect(() => {
        const t0 = Date.now()
        const dur = 3500
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
            {/* Corner brackets */}
            <div className="bc bc-tl" /><div className="bc bc-tr" />
            <div className="bc bc-bl" /><div className="bc bc-br" />

            {/* Radar SVG */}
            <svg className="boot-radar" viewBox="0 0 320 320" aria-hidden="true">
                <defs>
                    <linearGradient id="sweep-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                        <stop offset="50%" stopColor="#ff2d78" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#00f0ff" stopOpacity="1" />
                    </linearGradient>
                </defs>
                {/* Outer ring */}
                <circle cx="160" cy="160" r="148" className="radar-ring radar-ring-outer" />
                {/* Inner rings */}
                <circle cx="160" cy="160" r="110" className="radar-ring radar-ring-mid" />
                <circle cx="160" cy="160" r="72" className="radar-ring radar-ring-inner" />
                {/* Tick marks */}
                {Array.from({ length: 36 }).map((_, i) => {
                    const a = (i * 10 * Math.PI) / 180
                    const r1 = 142, r2 = i % 9 === 0 ? 130 : 136
                    return (
                        <line key={i}
                            x1={160 + r1 * Math.cos(a)} y1={160 + r1 * Math.sin(a)}
                            x2={160 + r2 * Math.cos(a)} y2={160 + r2 * Math.sin(a)}
                            className={`radar-tick ${i % 9 === 0 ? 'radar-tick-major' : ''}`}
                        />
                    )
                })}
                {/* Sweeping radar arc */}
                <circle cx="160" cy="160" r="148" className="radar-sweep" />
                {/* Crosshair lines */}
                <line x1="160" y1="12" x2="160" y2="60" className="radar-cross" />
                <line x1="160" y1="260" x2="160" y2="308" className="radar-cross" />
                <line x1="12" y1="160" x2="60" y2="160" className="radar-cross" />
                <line x1="260" y1="160" x2="308" y2="160" className="radar-cross" />
                {/* Lock-on: circle target reticle instead of square */}
                <circle cx="160" cy="160" r="28" className="radar-lock-circle" />
                <line x1="160" y1="132" x2="160" y2="145" className="radar-lock-pip" />
                <line x1="160" y1="175" x2="160" y2="188" className="radar-lock-pip" />
                <line x1="132" y1="160" x2="145" y2="160" className="radar-lock-pip" />
                <line x1="175" y1="160" x2="188" y2="160" className="radar-lock-pip" />
            </svg>

            {/* Name — revealed in reveal phase */}
            <div className="boot-name-wrap">
                <div className="boot-phase-label" data-phase={phase}>{phaseLabel}</div>
                <div className="boot-first">SMARTH</div>
                <div className="boot-last">SHARMA</div>
                <div className="boot-role">ENGINEER · SYSTEMS · AI</div>
                <div className="boot-acquired">✦ TARGET LOCKED ✦</div>
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
                    <span className="boot-ver">v2.4.1</span>
                </div>
            </div>

            <div className="noise" />
        </div>
    )
}

export default BootSequence
