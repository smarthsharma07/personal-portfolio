import { useEffect, useRef, useState } from 'react';
import './ProjectsSection.css';

/**
 * Projects section with hover-effect cards that open an
 * immersive full-screen modal view on click.
 */

const PROJECTS = [
  /* 
  =========================================
  BOILERPLATE: HOW TO ADD A NEW PROJECT
  =========================================
  Copy the block below and paste it into this array to add a new project.
  Make sure to give it a unique `id`.

  {
    id: 'project-X', // Update this ID (e.g., project-6)
    title: 'Your Project Title',
    domain: 'Software', // e.g., 'Software', 'AI / ML', 'Hardware'
    shortDesc: 'A brief 1-sentence summary of the project.',
    longDesc: 'A full detailed description of what you built, the problems you solved, and the impact.',
    tech: ['React', 'Node.js', 'Python'], // Array of tech stack tags
    links: { github: 'https://github.com/...', live: 'https://...' }, // Optional links
    images: ['/project-screenshot-1.png'], // Add image paths from public folder (optional)
  },
  =========================================
  */
  {
    id: 'project-1',
    title: 'Food Recommendation Engine',
    domain: 'AI / ML',
    shortDesc: 'Two-stage ML system providing personalized, context-aware food suggestions.',
    longDesc: 'Developed a two-stage ML recommendation system designed to provide personalized and context-aware food suggestions. Implemented semantic vector retrieval for candidate generation and used LightGBM LambdaMART ranking to improve recommendation relevance and accuracy. Built during the Zomato CSAO Hackathon with a focus on scalable recommendation workflows and intelligent ranking systems.',
    tech: ['Python', 'LightGBM', 'Machine Learning', 'Vector Retrieval', 'Data Science'],
    links: { github: 'https://github.com/smarthsharma07/zomato-csao-recommendation-engine' },
    images: [], // Add your screenshot paths here (e.g., '/images/zomato-1.png')
  },
  {
    id: 'project-2',
    title: 'Map Navigator',
    domain: 'Software',
    shortDesc: 'Graph-based navigation system finding the shortest path using Breadth First Search.',
    longDesc: 'Built a graph-based navigation system capable of finding the shortest path between locations using Breadth First Search and adjacency list representations. Integrated the core routing engine with a Flask backend API to connect navigation logic with the frontend interface, demonstrating practical application of data structures and algorithms in real-world systems.',
    tech: ['C++', 'Python', 'Flask', 'Data Structures', 'Algorithms'],
    links: { github: 'https://github.com/smarthsharma07/map-navigator' },
    images: [], // Add your Map Navigator screenshot paths here
  },
  {
    id: 'project-3',
    title: 'Insurance Cost Prediction',
    domain: 'AI / ML',
    shortDesc: 'Machine learning pipeline to predict medical insurance costs using regression models.',
    longDesc: 'Created a machine learning pipeline to predict medical insurance costs using exploratory data analysis, feature engineering, and regression modeling. Compared multiple models including Linear Regression, Ridge, and Lasso Regression while performing hyperparameter tuning to improve prediction performance and understand feature impact on healthcare expenses.',
    tech: ['Python', 'Machine Learning', 'Regression Modeling', 'Data Analysis', 'Scikit-Learn'],
    links: { github: 'https://github.com/smarthsharma07/insurance-cost-prediction-regression' },
    images: [],
  },
  {
    id: 'project-4',
    title: 'WeatherWise',
    domain: 'Software',
    shortDesc: 'Real-time weather and air quality web application.',
    longDesc: 'Developed a real-time weather and air quality web application that fetches and displays live environmental data for any city using external APIs. Focused on creating a clean user experience while handling real-time API integration, dynamic data rendering, and responsive frontend functionality.',
    tech: ['JavaScript', 'HTML/CSS', 'APIs', 'Web Development'],
    links: { github: 'https://github.com/smarthsharma07/weatherwise' },
    images: [],
  },
  {
    id: 'project-5',
    title: 'Portfolio Website',
    domain: 'Software',
    shortDesc: 'This very site - mountain-space themed with GSAP animations.',
    longDesc:
      'A space-holographic themed portfolio built with React and GSAP. Features an interactive raymarched metaball background, glassmorphism UI, scroll-triggered reveals, custom cursor, and immersive project modals.',
    tech: ['React', 'Three.js', 'GSAP', 'Vanilla CSS', 'Vite'],
    links: { github: '#', live: '#' },
    images: [],
  },
];

const DOMAIN_COLORS = {
  'AI / ML': { border: 'rgba(255, 255, 255, 0.15)', glow: 'rgba(255, 255, 255, 0.06)' },
  Software: { border: 'rgba(255, 255, 255, 0.12)', glow: 'rgba(255, 255, 255, 0.04)' },
  Hardware: { border: 'rgba(255, 255, 255, 0.10)', glow: 'rgba(255, 255, 255, 0.03)' },
};

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('.reveal, .stagger-children');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => setSelectedProject(null), 400);
  };

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeProject();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const gridRef = useRef(null);
  const scrollRef = useRef({ isHovering: false });

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!scrollRef.current.isHovering && gridRef.current) {
        const el = gridRef.current;
        
        el.scrollLeft += 1; // Auto scroll speed

        // Infinite loop effect: if we scroll past half the duplicated content, jump back
        // The scrollWidth is 2x the normal width because we render PROJECTS twice
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    animationFrameId = requestAnimationFrame(handleScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseEnter = () => {
    scrollRef.current.isHovering = true;
  };

  const handleMouseLeave = () => {
    scrollRef.current.isHovering = false;
  };

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <div className="section-inner">
        <div className="reveal">
          <span className="section-label text-mono">Projects</span>
          <h2 className="text-heading projects__title">
            Things I've built<br />
            <span className="about__highlight">and shipped.</span>
          </h2>
        </div>

        <div 
          className="projects__grid stagger-children"
          ref={gridRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {[...PROJECTS, ...PROJECTS].map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="projects__card glass-card"
              data-cursor-hover
              onClick={() => openProject(project)}
            >
              {/* Top accent line */}
              <div className="projects__card-accent" />

              <div className="projects__card-content">
                <span className="projects__card-domain text-mono">{project.domain}</span>
                <h3 className="projects__card-title">{project.title}</h3>
                <p className="text-body projects__card-desc">{project.shortDesc}</p>

                <div className="projects__card-tech">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="projects__card-tech-tag">{t}</span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="projects__card-tech-tag">+{project.tech.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Hover arrow indicator */}
              <div className="projects__card-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== IMMERSIVE PROJECT MODAL ===== */}
      <div
        className={`project-modal__overlay ${isModalOpen ? 'open' : ''}`}
        onClick={closeProject}
      >
        <div
          className={`project-modal ${isModalOpen ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedProject && (
            <>
              {/* Close button */}
              <button className="project-modal__close" onClick={closeProject} data-cursor-hover>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6L18 18" />
                </svg>
              </button>

              {/* Modal content */}
              <div className="project-modal__content">
                <div className="project-modal__header">
                  <span className="text-mono project-modal__domain">{selectedProject.domain}</span>
                  <h2 className="text-heading project-modal__title">{selectedProject.title}</h2>
                </div>

                {/* Dynamic Image Renderer */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="project-modal__visual">
                    <div className="project-modal__images">
                      {selectedProject.images.map((img, i) => (
                        <img key={i} src={img} alt={`${selectedProject.title} screenshot ${i + 1}`} className="project-modal__image" />
                      ))}
                    </div>
                  </div>
                )}

                <div className="project-modal__body">
                  <div className="project-modal__description">
                    <h3 className="project-modal__section-title text-mono">Overview</h3>
                    <p className="text-body">{selectedProject.longDesc}</p>
                  </div>

                  <div className="project-modal__sidebar">
                    <div className="project-modal__tech-list">
                      <h3 className="project-modal__section-title text-mono">Tech Stack</h3>
                      <div className="projects__card-tech" style={{ marginTop: '12px' }}>
                        {selectedProject.tech.map((t) => (
                          <span key={t} className="skills__tag">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-modal__links">
                      <h3 className="project-modal__section-title text-mono">Links</h3>
                      <div className="project-modal__link-buttons">
                        {selectedProject.links.github && (
                          <a
                            href={selectedProject.links.github}
                            className="project-modal__link-btn glass-card"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-hover
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                          </a>
                        )}
                        {selectedProject.links.live && (
                          <a
                            href={selectedProject.links.live}
                            className="project-modal__link-btn glass-card"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-hover
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                            </svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
