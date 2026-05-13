import { useEffect, useRef } from 'react';
import './SkillsSection.css';

/**
 * Skills section with three domain pillars:
 * Hardware, Software, AI/ML
 * Each pillar is a glassmorphic card with skill tags.
 */

const SKILL_DOMAINS = [
  {
    id: 'hardware',
    title: 'Hardware',
    icon: '⚡',
    description: 'Designing and prototyping embedded systems that connect software with the physical world.',
    skills: ['ESP32', 'Arduino', 'Raspberry Pi', 'Embedded C', 'Sensors', 'IoT', 'PCB Design', 'Robotics'],
  },
  {
    id: 'software',
    title: 'Software',
    icon: '◆',
    description: 'Building applications and systems with a focus on problem solving, performance, and scalability.',
    skills: ['Python', 'C++', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs', 'Linux'],
  },
  {
    id: 'ml',
    title: 'AI / ML',
    icon: '◎',
    description: 'Learning and experimenting with intelligent systems, machine learning models, and real-world AI applications.',
    skills: ['PyTorch', 'TensorFlow', 'OpenCV', 'Computer Vision', 'NLP', 'Pandas', 'NumPy', 'Scikit-learn'],
  },
];

export default function SkillsSection() {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('.reveal, .reveal-scale, .stagger-children');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section skills-section" id="skills" ref={sectionRef}>
      <div className="section-inner">
        <div className="reveal">
          <span className="section-label text-mono">Skills & Expertise</span>
          <h2 className="text-heading skills__title">
            The full stack from<br />
            <span className="about__highlight">circuits to cloud.</span>
          </h2>
        </div>

        <div className="skills__grid stagger-children">
          {SKILL_DOMAINS.map((domain, index) => (
            <div
              key={domain.id}
              className="skills__domain-card glass-card"
              data-cursor-hover
            >
              <div className="skills__domain-header">
                <span className={`skills__domain-icon ${index % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}>{domain.icon}</span>
                <h3 className="skills__domain-title">{domain.title}</h3>
              </div>
              <p className="text-body skills__domain-desc">{domain.description}</p>
              <div className="skills__tags">
                {domain.skills.map((skill) => (
                  <span key={skill} className="skills__tag">{skill}</span>
                ))}
              </div>

              {/* Decorative corner glow */}
              <div className="skills__card-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
