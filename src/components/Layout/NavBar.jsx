import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const navItems = [
    { path: '/', label: 'SYSTEM', icon: '⬡' },
    { path: '/hardware', label: 'HARDWARE', icon: '◈' },
    { path: '/ml', label: 'ML', icon: '◎' },
    { path: '/software', label: 'SOFTWARE', icon: '◇' },
    { path: '/games', label: 'GAMES', icon: '△' },
]

const NavBar = () => {
    const [time, setTime] = useState('')
    const [scrolled, setScrolled] = useState(false)
    const eyeRef = useRef(null)
    const pupilRef = useRef(null)

    useEffect(() => {
        const tick = () => {
            const n = new Date()
            setTime([n.getHours(), n.getMinutes(), n.getSeconds()]
                .map(v => String(v).padStart(2, '0')).join(':'))
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Orbit eye that tracks cursor
    useEffect(() => {
        const onMove = (e) => {
            if (!eyeRef.current || !pupilRef.current) return
            const rect = eyeRef.current.getBoundingClientRect()
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2
            const dx = e.clientX - cx
            const dy = e.clientY - cy
            const angle = Math.atan2(dy, dx)
            const maxDist = 4
            const px = Math.cos(angle) * maxDist
            const py = Math.sin(angle) * maxDist
            pupilRef.current.style.transform = `translate(${px}px, ${py}px)`
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-brand">
                    {/* Orbit Eye - follows cursor */}
                    <div className="orbit-eye" ref={eyeRef}>
                        <div className="orbit-eye-ring" />
                        <div className="orbit-eye-pupil" ref={pupilRef} />
                    </div>
                    <span className="brand-text">Smarth Sharma</span>
                </div>
                <ul className="nav-menu">
                    {navItems.map(item => (
                        <li key={item.label}>
                            <NavLink
                                to={item.path}
                                end={item.path === '/'}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="nav-status">
                    <span className="status-online-dot" />
                    <span className="status-clock">{time}</span>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
