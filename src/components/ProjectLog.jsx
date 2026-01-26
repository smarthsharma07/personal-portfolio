import React from 'react'
import './ProjectLog.css'

const ProjectLog = ({ project }) => {
    return (
        <article className="project-log">
            <header className="log-header">
                <div className="log-meta">
                    <span className="log-id">LOG_ID: {project.id}</span>
                    <span className={`log-status status-${project.status.toLowerCase()}`}>
                        [{project.status}]
                    </span>
                </div>
                <h3 className="log-title">{project.title}</h3>
            </header>

            <section className="log-section">
                <h4 className="section-label">PROBLEM_STATEMENT</h4>
                <p>{project.problem}</p>
            </section>

            {project.images && (
                <section className="log-section log-media">
                    <h4 className="section-label">VISUAL_RECORDS</h4>
                    <div className="media-grid">
                        {project.images.map((img, idx) => (
                            <div key={idx} className="media-placeholder">
                                IMG_{idx + 1} NOT FOUND
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="log-section">
                <h4 className="section-label">DESIGN_DECISIONS</h4>
                <ul className="log-list">
                    {project.decisions.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
            </section>

            <section className="log-section">
                <h4 className="section-label">LESSONS_LEARNED</h4>
                <p>{project.lessons}</p>
            </section>
        </article>
    )
}

export default ProjectLog
