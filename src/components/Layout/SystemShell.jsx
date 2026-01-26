import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import './SystemShell.css'



import CustomCursor from './CustomCursor'
import BackgroundSystem from './BackgroundSystem'

const SystemShell = () => {
    return (
        <div className="system-shell">
            <CustomCursor />
            <BackgroundSystem />
            <div className="scanlines"></div>
            <NavBar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}

export default SystemShell
