import { useEffect, useState } from 'react';
import './Navbar.css';

/**
 * Minimal floating navbar with glassmorphism.
 * Shows/hides on scroll direction, becomes opaque after scrolling.
 */
const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let lastScrollY = 0;

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 80);
      setHidden(currentY > lastScrollY && currentY > 300);
      lastScrollY = currentY;

      // Detect active section
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}
      id="main-nav"
    >
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => scrollTo('hero')} data-cursor-hover title="Home">
          <span className="navbar__logo-dot" />
        </button>

        <div className="navbar__links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`navbar__link ${activeSection === item.id ? 'navbar__link--active' : ''}`}
              onClick={() => scrollTo(item.id)}
              data-cursor-hover
            >
              {item.label}
              <span className="navbar__link-indicator" />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
