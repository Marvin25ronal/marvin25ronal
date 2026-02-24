'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 8000); // Density: 1 star per 8000 pixels

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // 0.5-2px
          opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
          twinkleSpeed: Math.random() * 0.02 + 0.005, // Slow twinkle
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        // Update twinkle
        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7; // Oscillate between 0.4 and 1.0
          const currentOpacity = star.opacity * twinkle;

          // Draw star with twinkle
          ctx.save();
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.shadowBlur = star.size * 2;
          ctx.shadowColor = `rgba(96, 165, 250, ${currentOpacity * 0.5})`; // Slight blue glow
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Static stars if reduced motion
          ctx.save();
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  );
}
