import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const navItems = [
    { path: '/', label: 'SYSTEM' },
    { path: '/hardware', label: 'HARDWARE' },
    { path: '/ml', label: 'ML' },
    { path: '/software', label: 'SOFTWARE' },
    { path: '/games', label: 'GAMES' },
]

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-brand">
                    <span className="brand-indicator">●</span> SYS_UID: VORTEX_ALPHA
                </div>
                <ul className="nav-menu">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="nav-status">
                    STATUS: NOMINAL
                </div>
            </div>
        </nav>
    )
}

export default NavBar
