import React from 'react'
import './SystemModule.css'

const SystemModule = () => {
    return (
        <div
            className="module-container system-module"
            onMouseMove={(e) => {
                const orbit = document.querySelector('.orbit-decoration');
                if (!orbit) return;
                const rect = orbit.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 25;
                const y = (e.clientY - rect.top - rect.height / 2) / 25;
                orbit.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(20px)`;
            }}
            onMouseLeave={() => {
                const orbit = document.querySelector('.orbit-decoration');
                if (orbit) orbit.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            }}
        >
            {/* Orbital decorative line */}
            <div className="orbit-decoration" style={{ transition: 'transform 0.1s ease-out' }}>
                <div className="orbit-line orbit-line-1" />
                <div className="orbit-line orbit-line-2" />
            </div>

            <header className="module-header">
                <h1 className="sys-title">SYSTEM OVERVIEW</h1>
                <div className="header-line" />
            </header>

            <section className="sys-intro-panel sys-panel">
                <div className="panel-label">PRINCIPAL ENGINEER</div>
                <h2 className="sys-name">SMARTH SHARMA</h2>
                <h3 className="sys-tagline">Building systems from silicon to software.</h3>

                <p className="intro-text">
                    I build robust, performance-aware software at the intersection of
                    <span className="accent"> Embedded Systems</span>,
                    <span className="accent"> Backend Engineering</span>, and
                    <span className="accent"> Applied AI</span>.
                </p>
                <p className="intro-text">
                    I don't just write code. I dig into how systems actually work underneath.
                    From microcontrollers to ML pipelines, my focus is on translating
                    real-world constraints like limited memory, latency, power, and scale
                    into clean, reliable, and scalable systems.
                </p>
            </section>

            <div className="split-layout">
                <section className="sys-panel focus-panel">
                    <div className="panel-label">FOCUS AREAS</div>

                    <div className="focus-item">
                        <h4>◈ Systems & Low-Level Thinking</h4>
                        <ul>
                            <li>Memory-aware design</li>
                            <li>Performance profiling & optimization</li>
                            <li>Hardware-software boundaries</li>
                            <li>Architecture trade-offs (latency vs throughput)</li>
                        </ul>
                    </div>

                    <div className="focus-item">
                        <h4>◎ Embedded & Edge Computing</h4>
                        <ul>
                            <li>Microcontroller-based systems (ESP32, Arduino)</li>
                            <li>Sensor data pipelines (IMU, PPG)</li>
                            <li>Real-time constraints & power-efficient logic</li>
                            <li>Firmware to application integration</li>
                        </ul>
                    </div>

                    <div className="focus-item">
                        <h4>△ Applied Machine Learning</h4>
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
                            <li className="status-done">C / C++ <span className="meta">(Embedded, Performance)</span></li>
                            <li className="status-active">JavaScript <span className="meta">(Frontend Logic)</span></li>
                            <li className="status-active">React + Vite</li>
                            <li className="status-active">Node.js</li>
                            <li className="status-done">SQL <span className="meta">(Data & Querying)</span></li>
                        </ul>
                    </div>

                    <div className="stack-category">
                        <h5>ML / DATA</h5>
                        <ul className="stack-list">
                            <li className="status-done">NumPy, Pandas</li>
                            <li className="status-done">Matplotlib</li>
                            <li className="status-done">Scikit-learn</li>
                            <li className="status-done">LightGBM</li>
                            <li className="status-done">Foundational ANNs</li>
                        </ul>
                    </div>

                    <div className="stack-category">
                        <h5>SYSTEMS & BACKEND</h5>
                        <ul className="stack-list">
                            <li className="status-active">Linux Fundamentals</li>
                            <li className="status-done">Git & GitHub</li>
                            <li className="status-done">Modular Code Design</li>
                            <li className="status-active">File Systems & Process Logic</li>
                        </ul>
                    </div>

                    <div className="stack-category">
                        <h5>EMBEDDED & HARDWARE</h5>
                        <ul className="stack-list">
                            <li className="status-active">ESP32 / Arduino Ecosystem</li>
                            <li className="status-active">Sensors & Signal Acquisition</li>
                            <li className="status-active">Serial Communication</li>
                            <li className="status-active">Hardware-aware Debugging</li>
                        </ul>
                    </div>
                </section>
            </div>

            {/* Social & Contact Section */}
            <section className="social-bar">
                <h2 className="social-heading">Let's Build Together</h2>
                <div className="panel-label" style={{ textAlign: 'center', marginBottom: '20px' }}>SOCIAL LINKS</div>

                {/* Magnetic Hover Effect Script applied inline for simplicity without breaking component structure */}
                <div
                    className="social-links-row"
                    onMouseMove={(e) => {
                        const items = document.querySelectorAll('.social-item');
                        items.forEach(item => {
                            const rect = item.getBoundingClientRect();
                            const x = e.clientX - rect.left - rect.width / 2;
                            const y = e.clientY - rect.top - rect.height / 2;
                            // Only apply if mouse is somewhat nearby
                            if (Math.abs(x) < rect.width && Math.abs(y) < rect.height) {
                                item.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) rotate(${x * 0.05}deg)`;
                            } else {
                                item.style.transform = 'translate(0px, 0px) rotate(0deg)';
                            }
                        });
                    }}
                    onMouseLeave={() => {
                        const items = document.querySelectorAll('.social-item');
                        items.forEach(item => item.style.transform = 'translate(0px, 0px) rotate(0deg)');
                    }}
                >
                    <a href="https://github.com/smarthsharma07" target="_blank" rel="noopener noreferrer" className="social-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>GITHUB</span>
                    </a>
                    <a href="https://www.linkedin.com/in/smarth-sharma-2b1298380/" target="_blank" rel="noopener noreferrer" className="social-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span>LINKEDIN</span>
                    </a>
                    <a href="https://www.kaggle.com/signullvoidfound" target="_blank" rel="noopener noreferrer" className="social-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.234-.035.258l-6.555 6.344 6.836 8.507c.095.104.117.208.075.293z" />
                        </svg>
                        <span>KAGGLE</span>
                    </a>
                    <a href="mailto:smarthsharmasharma@gmail.com" className="social-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                        </svg>
                        <span>EMAIL</span>
                    </a>
                </div>
                <div className="cv-download-row">
                    <button className="cv-btn" onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/cv/Smarth_Sharma_CV.pdf';
                        link.download = 'Smarth_Sharma_CV.pdf';
                        link.click();
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        DOWNLOAD CV
                    </button>
                </div>
            </section>
        </div>
    )
}

export default SystemModule
