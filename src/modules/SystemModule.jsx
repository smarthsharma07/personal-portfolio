import React from 'react'
import './SystemModule.css'

const SystemModule = () => {
    return (
        <div className="module-container system-module">
            <header className="module-header">
                <h1 className="glitch-text">SYSTEM OVERVIEW</h1>
                <div className="header-line"></div>
            </header>

            <section className="sys-intro-panel sys-panel">
                <div className="panel-label">PRINCIPAL ENGINEER</div>
                <h2>SMARTH SHARMA</h2>
                <h3 className="sub-header">Engineer focused on systems that actually work.</h3>

                <p className="intro-text">
                    I build robust, performance-aware software at the intersection of
                    <span className="accent"> Embedded Systems</span>,
                    <span className="accent"> Backend Engineering</span>, and
                    <span className="accent"> Applied AI</span>.
                </p>
                <p className="intro-text">
                    My core strength is translating real-world constraints limited memory, latency, power, scale into clean, reliable, and scalable systems. I care less about shiny abstractions and more about what survives production, load, and time.
                </p>
            </section>

            <div className="split-layout">
                <section className="sys-panel focus-panel">
                    <div className="panel-label">FOCUS AREAS</div>

                    <div className="focus-item">
                        <h4>🧠 Systems & Low-Level Thinking</h4>
                        <ul>
                            <li>Memory-aware design</li>
                            <li>Performance profiling & optimization</li>
                            <li>Hardware - software boundaries</li>
                            <li>Architecture trade-offs (latency vs throughput)</li>
                        </ul>
                    </div>

                    <div className="focus-item">
                        <h4>⚙️ Embedded & Edge Computing</h4>
                        <ul>
                            <li>Microcontroller-based systems (ESP32, Arduino)</li>
                            <li>Sensor data pipelines (IMU, PPG)</li>
                            <li>Real-time constraints & power-efficient logic</li>
                            <li>Firmware ↔ application integration</li>
                        </ul>
                    </div>

                    <div className="focus-item">
                        <h4>🤖 Applied Machine Learning</h4>
                        <ul>
                            <li>End-to-end ML pipelines (data → model → eval)</li>
                            <li>Classical ML + practical neural networks</li>
                            <li>Feature engineering grounded in domain intuition</li>
                            <li>ML for signals and real-world data</li>
                        </ul>
                    </div>
                </section>

                <section className="sys-panel stack-panel">
                    <div className="panel-label">TECH STACK (CORE)</div>

                    <div className="stack-category">
                        <h5>LANGUAGES</h5>
                        <ul className="stack-list">
                            <li className="status-done">Python <span className="meta">(ML, Backend, Auto)</span></li>
                            <li className="status-pending">Javascript <span className="meta">(Frontend Logic)</span></li>
                            <li className="status-pending">Node.js</li>
                            <li className="status-pending">React</li>
                            <li className="status-pending">Vite</li>
                            <li className="status-done">C / C++ <span className="meta">(Embedded, Performance)</span></li>
                            <li className="status-done">SQL <span className="meta">(Data & Querying)</span></li>
                        </ul>
                    </div>

                    <div className="stack-category">
                        <h5>ML / DATA</h5>
                        <ul className="stack-list">
                            <li className="status-done">NumPy, Pandas</li>
                            <li className="status-done">Matplotlib</li>
                            <li className="status-done">Scikit-learn</li>
                            <li className="status-done">Foundational ANNs</li>
                        </ul>
                    </div>

                    <div className="stack-category">
                        <h5>SYSTEMS & BACKEND</h5>
                        <ul className="stack-list">
                            <li className="status-pending">Linux Fundamentals</li>
                            <li className="status-done">Git & GitHub</li>
                            <li className="status-done">Modular Code Design</li>
                            <li className="status-pending">File Systems & Process Logic</li>
                        </ul>
                    </div>

                    <div className="stack-category">
                        <h5>EMBEDDED & HARDWARE</h5>
                        <ul className="stack-list">
                            <li className="status-pending">ESP32 / Arduino Ecosystem</li>
                            <li className="status-pending">Sensors & Signal Acquisition</li>
                            <li className="status-pending">Serial Communication</li>
                            <li className="status-pending">Hardware-aware Debugging</li>
                        </ul>
                    </div>
                </section>
            </div>

            <section className="sys-panel actions-panel">
                <div className="panel-label">INTERACTION</div>
                <div className="action-grid">
                    <button className="sys-btn" onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/cv/Smarth_Sharma_CV.pdf'; // Update this path to match your CV file location
                        link.download = 'Smarth_Sharma_CV.pdf';
                        link.click();
                    }}>DOWNLOAD_CV</button>
                    <div className="sys-btn social-contact">
                        <span style={{ marginRight: '15px', opacity: 0.7 }}>CONTACT_ME</span>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <a href="https://github.com/smarthsharma07" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ display: 'flex' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" style={{ transition: 'all 0.3s' }} className="social-hover">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/smarth-sharma-2b1298380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: 'flex' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" style={{ transition: 'all 0.3s' }} className="social-hover">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a href="mailto:smarthsharmasharma@gmail.com" aria-label="Email" style={{ display: 'flex' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" style={{ transition: 'all 0.3s' }} className="social-hover">
                                    <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <button className="sys-btn" onClick={() => window.open('https://github.com/smarthsharma07', '_blank')}>GITHUB_PROFILE</button>
                </div>
            </section>

            <section className="sys-panel status-legend">
                <span className="legend-item"><span className="dot done">●</span> DEPLOYMENT READY</span>
                <span className="legend-item"><span className="dot pending">●</span> LOADING / PENDING</span>
            </section>
        </div>
    )
}

export default SystemModule
