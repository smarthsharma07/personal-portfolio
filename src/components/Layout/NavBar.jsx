import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const navItems = [
    { path: '/', label: 'SYSTEM', icon: '◈' },
    { path: '/hardware', label: 'HARDWARE', icon: '⬡' },
    { path: '/ml', label: 'ML', icon: '◎' },
    { path: '/software', label: 'SOFTWARE', icon: '◇' },
    { path: '/games', label: 'GAMES', icon: '▣' },
]

const NavBar = () => {
    const [time, setTime] = useState('')
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

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-brand">
                    <span className="brand-dot" />
                    <span className="brand-text">VORTEX_ALPHA</span>
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
