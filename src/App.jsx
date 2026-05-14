import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Starfield from './components/background/Starfield';
import Mountains from './components/background/Mountains';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/ui/Navbar';

import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import Footer from './sections/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Main App — Mountain Space Portfolio
 * Orchestrates all sections with shared background layers.
 */
export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Background layers — fixed behind everything */}
      <Starfield />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Content sections */}
      <main>
        <HeroSection />

        {/* Divider line between hero and about */}
        <div className="section-divider" />

        <AboutSection />

        <div className="section-divider" />

        <SkillsSection />

        <div className="section-divider" />

        <ProjectsSection />

        <div className="section-divider" />

        <Footer />
      </main>
    </>
  );
}
