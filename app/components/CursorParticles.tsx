'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0 (birth) to 1 (death)
  maxLife: number;
  size: number;
  color: string;
}

export function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Accessibility: Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Mobile detection: Disable on touch devices
    const isMobile = window.innerWidth < 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isMobile || isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cursor tracking with throttling
    let lastSpawnTime = 0;
    const spawnThrottle = 50; // Max one particle every 50ms

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.prevX = cursorRef.current.x;
      cursorRef.current.prevY = cursorRef.current.y;
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;

      // Spawn particle if cursor moved and throttle allows
      const now = Date.now();
      const distance = Math.hypot(
        cursorRef.current.x - cursorRef.current.prevX,
        cursorRef.current.y - cursorRef.current.prevY
      );

      // Only spawn if cursor moved significantly and throttle passed
      if (distance > 5 && now - lastSpawnTime > spawnThrottle) {
        createParticle();
        lastSpawnTime = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Create particle at cursor position
    const createParticle = () => {
      // Limit max particles for performance
      if (particlesRef.current.length > 30) {
        particlesRef.current.shift(); // Remove oldest
      }

      // Random color (60% blue, 30% purple, 10% cyan)
      const colorRand = Math.random();
      let color;
      if (colorRand < 0.6) {
        color = '96, 165, 250'; // Blue
      } else if (colorRand < 0.9) {
        color = '167, 139, 250'; // Purple
      } else {
        color = '6, 182, 212'; // Cyan
      }

      // Calculate velocity (drift away from cursor path)
      const speed = 0.3 + Math.random() * 0.7;
      const angle = Math.random() * Math.PI * 2;

      const particle: Particle = {
        x: cursorRef.current.x + (Math.random() - 0.5) * 10,
        y: cursorRef.current.y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 1.5 + Math.random() * 1.5, // 1.5-3 seconds (longer life)
        size: 2 + Math.random() * 3, // 2-5px (larger size)
        color: color,
      };

      particlesRef.current.push(particle);
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(particle => {
        // Update particle
        particle.life += 0.016; // ~60fps
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply slight gravity/drift
        particle.vy += 0.02;

        // Calculate opacity (fade out over lifetime)
        const lifeRatio = particle.life / particle.maxLife;
        const opacity = Math.max(0, 1 - lifeRatio);

        // Draw particle (increased visibility)
        ctx.save();
        ctx.fillStyle = `rgba(${particle.color}, ${opacity * 0.9})`; // Increased from 0.6 to 0.9
        ctx.shadowBlur = 8; // Increased from 4 to 8
        ctx.shadowColor = `rgba(${particle.color}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Keep particle if still alive
        return particle.life < particle.maxLife;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 3, opacity: 0.8 }}
    />
  );
}
