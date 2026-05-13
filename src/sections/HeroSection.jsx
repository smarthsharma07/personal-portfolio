import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MetaballBg from '../components/background/MetaballBg';
import './HeroSection.css';

/**
 * Full-viewport hero with metaball background,
 * metallic shimmer name, and scroll indicator.
 */
export default function HeroSection() {
  const heroRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate the name
      tl.fromTo(
        '.hero__name',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      );

      // Tagline
      tl.fromTo(
        '.hero__tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.2'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const nameText = 'SMARTH SHARMA';
  const nameChars = nameText.split('');

  return (
    <section className="hero section" id="hero" ref={heroRef}>
      {/* Metaball background */}
      <MetaballBg />

      <div className="hero__content">
        {/* Decorative line */}
        <div className="hero__line" />

        <h1 className="hero__name hero__name--shine">
          SMARTH SHARMA
        </h1>

        <p className="hero__subtitle" ref={subtitleRef}>
          Developer &bull; AI Engineer &bull; Hardware Tinkerer
        </p>

        <p className="hero__tagline text-body">
          From silicon to software building things that matter.
        </p>

        {/* Scroll indicator */}
        <div className="hero__scroll-indicator" ref={scrollIndicatorRef}>
          <span className="hero__scroll-text text-mono">Scroll to explore</span>
          <div className="hero__scroll-line">
            <div className="hero__scroll-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}
