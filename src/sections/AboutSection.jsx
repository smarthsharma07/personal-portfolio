import { useEffect, useRef } from 'react';
import './AboutSection.css';

/**
 * About section with a glassmorphic card layout.
 * Placeholder content — user will fill in real bio.
 */
export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section about-section" id="about" ref={sectionRef}>
      <div className="section-inner">
        <div className="reveal">
          <span className="section-label text-mono">About Me</span>
        </div>

        <div className="about__grid">
          {/* Main bio card */}
          <div className="about__bio-card glass-card reveal-left">
            <h2 className="text-heading about__heading">
              Turning curiosity<br />
              <span className="about__highlight">into creation.</span>
            </h2>
            <p className="text-body about__bio-text">
              I'm someone who enjoys exploring ideas, building projects, solving
              problems, and continuously pushing myself to learn beyond the classroom.
              What excites me most is the possibility of creating technology that
              genuinely helps people and has a real-world impact.
            </p>
            <p className="text-body about__bio-text">
              Whether it's AI, intelligent devices, or future-focused systems, I'm
              drawn toward fields where creativity and engineering come together to
              solve meaningful problems.
            </p>
            <p className="text-body about__bio-text">
              I believe growth comes from consistency, experimentation, and staying
              adaptable. Right now, I'm focused on learning, improving my technical
              depth, and building toward a future where I can contribute to innovative
              products, impactful research, and ambitious ideas that shape the next
              generation of technology.
            </p>
          </div>

          {/* Stats / quick facts */}
          <div className="about__stats stagger-children reveal-right">
            <div className="about__stat-card glass-card" data-cursor-hover>
              <span className="about__stat-number animate-float">3+</span>
              <span className="about__stat-label text-mono">Years of Coding</span>
            </div>
            <div className="about__stat-card glass-card" data-cursor-hover>
              <span className="about__stat-number animate-float-delayed">4</span>
              <span className="about__stat-label text-mono">Projects Built</span>
            </div>
            <div className="about__stat-card glass-card" data-cursor-hover>
              <span className="about__stat-number animate-float">∞</span>
              <span className="about__stat-label text-mono">Curiosity Level</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
