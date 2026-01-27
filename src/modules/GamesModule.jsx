import React from 'react'

// ============================================
// 📝 WHEN YOU'RE READY: Uncomment the section below and add your game projects
// Then update the code at the bottom to display ProjectCard components
// ============================================

// import ProjectCard from '../components/ProjectCard'
// 
// const gameProjects = [
//     {
//         id: 'GAME-001',
//         title: 'Your Game Project Title',
//         description: 'Brief description of your game mechanics and systems.',
//         techStack: ['Unity', 'C#', 'Blender', 'Photon'],
//         githubUrl: 'https://github.com/yourusername/your-game-repo',
//         liveUrl: '',  // Optional: add itch.io or demo URL
//         status: 'WIP'  // Options: ACTIVE, DEPLOYED, WIP, ARCHIVED
//     },
//     // Add more projects here
// ]

// ============================================

const GamesModule = () => {
    return (
        <div className="module-container">
            <header className="module-header">
                <h1 className="dim">GAMES_MODULE</h1>
                <div className="header-line" style={{ opacity: 0.3 }}></div>
            </header>

            <div className="sys-panel" style={{ maxWidth: '500px', margin: '100px auto', textAlign: 'center' }}>
                <div className="panel-label">MODULE_STATUS</div>
                <h2 style={{ color: 'var(--text-dim)', marginBottom: '20px' }}>REGISTERED</h2>

                <div className="metric-row">
                    <span className="dim">CURRENT STATE</span>
                    <span className="accent">IDEATION</span>
                </div>

                <div className="metric-row" style={{ display: 'block', marginTop: '20px', textAlign: 'left' }}>
                    <div className="panel-label">DESCRIPTION</div>
                    <p style={{ marginTop: '5px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        This module is intended for future exploration of game systems and mechanics. Work will begin once core academic and software foundations are stable.
                    </p>
                </div>

                <div className="metric-row" style={{ marginTop: '20px' }}>
                    <span className="dim">SYSTEM LOG</span>
                    <span className="accent">WAITING FOR INIT</span>
                </div>
            </div>

            {/* Retro Game Overlay */}
            <div className="game-overlay" style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden'
            }}>
                {/* Pixel Grid */}
                <div style={{
                    position: 'absolute', width: '100%', height: '100%',
                    backgroundImage: 'linear-gradient(rgba(0, 255, 100, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 100, 0.15) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.5
                }}></div>
                {/* Floating Polygon (CSS Triangle) */}
                <div style={{
                    position: 'absolute', top: '20%', right: '10%', width: 0, height: 0,
                    borderLeft: '50px solid transparent', borderRight: '50px solid transparent',
                    borderBottom: '100px solid rgba(0, 240, 255, 0.2)',
                    transform: 'rotate(15deg)', filter: 'drop-shadow(0 0 20px var(--accent))'
                }}></div>
            </div>
        </div>
    )
}

export default GamesModule
