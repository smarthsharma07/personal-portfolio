import { useEffect, useRef } from 'react';
import './Starfield.css';

/**
 * Animated starfield background with twinkling stars,
 * dust particles, shooting stars, and interactive constellations.
 */
export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let shootingStars = [];
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight; // Fixed CSS squash distortion
    };

    const createStars = () => {
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          isDust: Math.random() > 0.9, // 10% are dust particles
        });
      }
    };

    const createShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.003) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height * 0.5;
        shootingStars.push({
          x: startX,
          y: startY,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 6,
          angle: (Math.random() * 30 + 20) * (Math.PI / 180),
          opacity: 1,
          life: 0,
          maxLife: Math.random() * 40 + 30,
        });
      }
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      // Draw stars, dust, and constellations
      stars.forEach((star, index) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        
        if (star.isDust) {
          star.y -= 0.2; 
          if (star.y < 0) star.y = canvas.height;
          
          const currentOpacity = star.opacity * (0.3 + twinkle * 0.2);
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 204, ${currentOpacity * 0.15})`;
          ctx.fill();
        } else {
          // Normal star
          const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.fill();

          if (star.radius > 1.2) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.1})`;
            ctx.fill();
          }

          // Interactive Constellations (Draw lines between nearby stars and mouse)
          const dxMouse = mouse.x - star.x;
          const dyMouse = mouse.y - star.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          if (distMouse < 150) {
            // Check nearby stars
            for (let j = index + 1; j < stars.length; j++) {
              const otherStar = stars[j];
              if (!otherStar.isDust) {
                const dx = otherStar.x - star.x;
                const dy = otherStar.y - star.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 80) {
                  ctx.beginPath();
                  ctx.moveTo(star.x, star.y);
                  ctx.lineTo(otherStar.x, otherStar.y);
                  // Line opacity depends on distance to mouse
                  const lineOpacity = 1 - (distMouse / 150);
                  ctx.strokeStyle = `rgba(0, 255, 204, ${lineOpacity * 0.4})`;
                  ctx.lineWidth = 0.5;
                  ctx.stroke();
                }
              }
            }
          }
        }
      });

      // Draw shooting stars
      createShootingStar();
      shootingStars = shootingStars.filter((s) => {
        s.life += 1;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity = 1 - s.life / s.maxLife;

        if (s.opacity <= 0) return false;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createStars();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createStars();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" />;
}
