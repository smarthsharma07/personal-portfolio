import React, { useEffect, useRef } from 'react'
import ProjectCard from '../components/ProjectCard'

const softwareProjects = [
    {
        id: 'SW-001',
        title: 'LifeMirror',
        description:
            'Static smart dashboard prototype built for the LifeMirror 3.0 Hackathon. Designed modular UI components and structured layouts for future smart mirror integrations.',
        techStack: ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Node.js', 'Express.js', 'Firebase', 'MongoDB'],
        githubUrl: 'https://github.com/smarthsharma07/lifemirror',
        liveUrl: 'https://lifemirror-theta.vercel.app/login',
        status: 'HACKATHON'
    },
    {
        id: 'SW-002',
        title: 'WeatherWise',
        description:
            'Weather forecasting web application that retrieves real-time data from external APIs and displays location-based weather insights with graceful error handling.',
        techStack: ['JavaScript', 'Flask', 'Python', 'HTML', 'CSS'],
        githubUrl: 'https://github.com/smarthsharma07/weatherwise',
        liveUrl: 'https://weatherwise-lake.vercel.app/',
        status: 'DEPLOYED'
    },
    {
        id: 'SW-003',
        title: 'HRM System',
        description:
            'Human Resource Management system developed during the Hack4Delhi hackathon. Implements employee management workflows and role-based access concepts.',
        techStack: ['JavaScript', 'React.js', 'Firebase', 'Bootstrap 5'],
        githubUrl: 'https://github.com/smarthsharma07/mcd-hrms',
        liveUrl: 'https://mcd-hrms.web.app/',
        status: 'HACKATHON'
    },
    {
        id: 'SW-004',
        title: 'Personal Portfolio Website',
        description:
            'Personal developer portfolio showcasing projects, technical skills, and academic background with a clean and responsive design.',
        techStack: ['JavaScript', 'HTML', 'Vite', 'CSS'],
        githubUrl: 'https://github.com/smarthsharma07/portfolio',
        liveUrl: '',
        status: 'ACTIVE'
    }
];


const SoftwareModule = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.width = canvas.parentElement.offsetWidth
        let height = canvas.height = canvas.parentElement.offsetHeight

        const columns = Math.floor(width / 20)
        const drops = []

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100 // Start above screen with random delay
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)' // Trails
            ctx.fillRect(0, 0, width, height)

            ctx.fillStyle = '#0F0' // Matrix/Code Green color
            ctx.font = '15px monospace'

            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(0x30A0 + Math.random() * 96) // Random Katakana/Matrix char
                // or just binary: Math.random() > 0.5 ? '1' : '0' 

                ctx.fillStyle = `rgba(0, 240, 255, ${Math.random()})` // Cyan variations
                ctx.fillText(text, i * 20, drops[i] * 20)

                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            }
        }

        const interval = setInterval(draw, 50)

        const handleResize = () => {
            width = canvas.width = canvas.parentElement.offsetWidth
            height = canvas.height = canvas.parentElement.offsetHeight
        }
        window.addEventListener('resize', handleResize)

        return () => {
            clearInterval(interval)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="module-container" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Digital Rain Background */}
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.5 }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
                <header className="module-header">
                    <h1>SOFTWARE_SYSTEMS</h1>
                    <div className="header-line"></div>
                </header>

                <div className="sys-panel" style={{ marginBottom: '40px' }}>
                    <div className="metric-row">
                        <span>MODULE STATUS</span>
                        <span className="metric-val accent">ACTIVE</span>
                    </div>
                    <div className="metric-row" style={{ display: 'block', marginTop: '10px' }}>
                        <div className="panel-label">MODULE_OVERVIEW</div>
                        <p style={{ marginTop: '5px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                            Software tools and scripts developed for solving concrete problems with simple, readable, and maintainable code.
                        </p>
                    </div>
                </div>

                {/* Project Cards Grid */}
                <div style={{ display: 'grid', gap: '24px' }}>
                    {softwareProjects.map(project => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SoftwareModule
