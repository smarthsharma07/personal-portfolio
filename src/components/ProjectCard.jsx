import React, { useRef, useState } from 'react'
import './ProjectCard.css'

const ProjectCard = ({ id, title, description, techStack, githubUrl, liveUrl, status }) => {
    const cardRef = useRef(null)
    const [transform, setTransform] = useState('')

    const handleMouseMove = (e) => {
        if (!cardRef.current) return

        const card = cardRef.current
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 25  // Reduced for subtler effect
        const rotateY = (centerX - x) / 25  // Reduced for subtler effect

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`)
    }

    const handleMouseLeave = () => {
        setTransform('')
    }

    return (
        <article
            ref={cardRef}
            className="project-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform }}
        >
            <div className="card-glow"></div>

            <header className="card-header">
                <div className="card-meta">
                    <span className="card-id">{id}</span>
                    <span className={`card-status status-${status.toLowerCase().replace(/_/g, '-')}`}>
                        [{status}]
                    </span>
                </div>
                <h3 className="card-title">{title}</h3>
            </header>

            <section className="card-section">
                <p className="card-description">{description}</p>
            </section>

            {techStack && techStack.length > 0 && (
                <section className="card-section">
                    <h4 className="section-label">TECH_STACK</h4>
                    <div className="tech-stack">
                        {techStack.map((tech, idx) => (
                            <span key={idx} className="tech-badge">{tech}</span>
                        ))}
                    </div>
                </section>
            )}

            <footer className="card-footer">
                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link github-link"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        VIEW_REPO
                    </a>
                )}
                {liveUrl && (
                    <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link live-link"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z" />
                            <path d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                        </svg>
                        LIVE_DEMO
                    </a>
                )}
            </footer>
        </article>
    )
}

export default ProjectCard
