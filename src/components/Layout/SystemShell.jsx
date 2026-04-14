import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import BackgroundSystem from './BackgroundSystem'
import CustomCursor from './CustomCursor'
import './SystemShell.css'

const SystemShell = () => {
    return (
        <div className="system-shell">
            <BackgroundSystem />
            <CustomCursor />
            <NavBar />
            <main className="shell-main">
                <Outlet />
            </main>
        </div>
    )
}

export default SystemShell
