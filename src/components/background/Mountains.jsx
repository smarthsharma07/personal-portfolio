import { useEffect, useState } from 'react';
import './Mountains.css';

/**
 * Multi-layered mountain silhouettes with parallax scrolling.
 * Each layer moves at a different speed based on scroll position.
 */
export default function Mountains() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mountains-container">
      {/* Atmospheric fog/haze at the top */}
      <div className="mountain-atmosphere" />

      {/* Layer 5: Farthest — faint, slow */}
      <svg
        className="mountain-layer mountain-layer-5"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path d="M0,320 L0,260 Q120,180 240,220 Q360,140 480,200 Q600,120 720,180 Q840,100 960,160 Q1080,80 1200,140 Q1320,100 1440,180 L1440,320 Z" />
      </svg>

      {/* Layer 4 */}
      <svg
        className="mountain-layer mountain-layer-4"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path d="M0,320 L0,240 Q100,160 200,210 Q320,130 440,190 Q560,100 680,170 Q780,90 900,150 Q1020,70 1140,130 Q1260,90 1380,160 L1440,140 L1440,320 Z" />
      </svg>

      {/* Layer 3 */}
      <svg
        className="mountain-layer mountain-layer-3"
        style={{ transform: `translateY(${scrollY * 0.18}px)` }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path d="M0,320 L0,220 Q80,140 180,190 Q300,100 420,170 Q520,80 640,150 Q740,60 860,130 Q980,50 1100,120 Q1220,70 1340,140 L1440,110 L1440,320 Z" />
      </svg>

      {/* Layer 2 */}
      <svg
        className="mountain-layer mountain-layer-2"
        style={{ transform: `translateY(${scrollY * 0.28}px)` }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path d="M0,320 L0,200 Q60,120 160,170 Q280,80 400,150 Q500,60 620,130 Q720,40 840,110 Q960,30 1080,100 Q1200,50 1320,120 L1440,90 L1440,320 Z" />
      </svg>

      {/* Layer 1: Closest — darkest, fastest */}
      <svg
        className="mountain-layer mountain-layer-1"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path d="M0,320 L0,180 Q50,100 140,150 Q260,60 380,130 Q480,40 600,110 Q700,20 820,90 Q940,10 1060,80 Q1180,30 1300,100 L1440,70 L1440,320 Z" />
      </svg>

      {/* Ground gradient fade to black */}
      <div className="mountain-ground" />
    </div>
  );
}
