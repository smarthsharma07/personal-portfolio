import React, { useEffect, useRef } from 'react'
import ProjectCard from '../components/ProjectCard'
import './SoftwareModule.css'

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
        title: 'Personal Portfolio',
        description:
            'Personal developer portfolio showcasing projects, technical skills, and academic background with a deep space design system and animated starfield canvas.',
        techStack: ['JavaScript', 'React.js', 'Vite', 'CSS3'],
        githubUrl: 'https://github.com/smarthsharma07/portfolio',
        liveUrl: '',
        status: 'ACTIVE'
    }
]

const SoftwareModule = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.width = canvas.parentElement.offsetWidth
        let height = canvas.height = canvas.parentElement.offsetHeight
        const columns = Math.floor(width / 20)
        const drops = Array.from({ length: columns }, () => Math.random() * -100)

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.07)'
            ctx.fillRect(0, 0, width, height)
            ctx.font = '13px monospace'
            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(0x30A0 + Math.random() * 96)
                const r = Math.random()
                ctx.fillStyle = r > 0.75
                    ? `rgba(255, 255, 255, ${0.3 + Math.random() * 0.5})`
                    : `rgba(255, 255, 255, ${0.05 + Math.random() * 0.1})`
                ctx.fillText(text, i * 20, drops[i] * 20)
                if (drops[i] * 20 > height && Math.random() > 0.975) drops[i] = 0
                drops[i]++
            }
        }
        const interval = setInterval(draw, 48)
        const handleResize = () => {
            width = canvas.width = canvas.parentElement.offsetWidth
            height = canvas.height = canvas.parentElement.offsetHeight
        }
        window.addEventListener('resize', handleResize)
        return () => { clearInterval(interval); window.removeEventListener('resize', handleResize) }
    }, [])

    const stats = [
        { label: 'PROJECTS SHIPPED', value: '04' },
        { label: 'HACKATHONS', value: '02' },
        { label: 'LANGUAGES', value: '08' },
        { label: 'STATUS', value: 'ACTIVE' },
    ]

    return (
        <div className="module-container sw-module" style={{ position: 'relative', overflow: 'hidden' }}>
            <canvas ref={canvasRef} className="sw-rain-canvas" />

            <div className="sw-content">
                <header className="module-header">
                    <div className="sw-header-tag">// MODULE 04</div>
                    <h1 className="sw-title">SOFTWARE_SYSTEMS</h1>
                    <div className="sw-title-line" />
                    <p className="sw-subtitle">Full-stack builds, hackathon sprints & shipped products</p>
                </header>

                <div className="sw-stats-row">
                    {stats.map(s => (
                        <div key={s.label} className="sw-stat">
                            <span className="sw-stat-val">{s.value}</span>
                            <span className="sw-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                <div className="sw-terminal">
                    <div className="sw-terminal-bar">
                        <span className="terminal-dot" />
                        <span className="terminal-dot" />
                        <span className="terminal-dot" />
                        <span className="terminal-title">smarth@vortex:~/software $</span>
                    </div>
                    <div className="sw-terminal-body">
                        <div className="sw-terminal-line"><span className="tc-dim">$</span> <span className="tc-bright">git log</span> --oneline --all</div>
                        <div className="sw-terminal-line tc-dim">Showing <span className="tc-bright">4</span> commits across <span className="tc-bright">3</span> repos</div>
                        <div className="sw-terminal-line"><span className="tc-dim">→</span> Prioritizing clean architecture over clever hacks</div>
                        <div className="sw-terminal-line"><span className="tc-dim">→</span> Focus: readable, maintainable, production-ready code</div>
                        <div className="sw-terminal-line tc-dim blink-line">█</div>
                    </div>
                </div>

                <div className="sw-label-row">
                    <span className="sw-section-label">▶ PROJECT_LOG</span>
                    <span className="sw-count">{softwareProjects.length} ENTRIES</span>
                </div>
                <div className="sw-cards-grid">
                    {softwareProjects.map(project => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SoftwareModule
