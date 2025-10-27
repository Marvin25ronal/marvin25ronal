'use client';

import { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  controlX: number;  // Bezier control point
  controlY: number;
  progress: number;
  speed: number;
  opacity: number;
  lineWidth: number; // Size variation
  dotSize: number;
  color: string;     // Color variation
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if mobile (disable canvas on mobile for performance)
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create spark with enhanced properties
    const createSpark = () => {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height;
      const endX = Math.random() * canvas.width;
      const endY = Math.random() * canvas.height;

      // Calculate Bezier control point for curved path (SUBTLE curves only)
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      const dx = endX - startX;
      const dy = endY - startY;
      const curvature = (Math.random() - 0.5) * 40; // Curve strength reduced: -20 to +20 (was -100 to +100)

      // Color variation: 60% blue, 30% purple, 10% white
      const colorRand = Math.random();
      let color;
      if (colorRand < 0.6) {
        color = '96, 165, 250'; // Blue
      } else if (colorRand < 0.9) {
        color = '167, 139, 250'; // Purple
      } else {
        color = '255, 255, 255'; // White (rare)
      }

      const spark: Spark = {
        x: startX,
        y: startY,
        targetX: endX,
        targetY: endY,
        controlX: midX - (dy / 2) * (curvature / 100), // Perpendicular offset
        controlY: midY + (dx / 2) * (curvature / 100),
        progress: 0,
        speed: 0.003 + Math.random() * 0.002, // 3-5 seconds duration
        opacity: 0,
        lineWidth: 0.8 + Math.random() * 1.7, // 0.8-2.5px
        dotSize: 1.5 + Math.random() * 1.5,   // 1.5-3px
        color: color,
      };
      sparksRef.current.push(spark);
    };

    // Improved frequency: 1 spark every 2.5 seconds (was 5 seconds)
    const sparkInterval = setInterval(createSpark, 2500);
    createSpark(); // Initial spark

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        // Update progress
        spark.progress += spark.speed;

        // Fade in/out
        if (spark.progress < 0.2) {
          spark.opacity = spark.progress / 0.2; // Fade in
        } else if (spark.progress > 0.8) {
          spark.opacity = (1 - spark.progress) / 0.2; // Fade out
        } else {
          spark.opacity = 1;
        }

        // Calculate current position using Quadratic Bezier curve
        const easeProgress = spark.progress < 0.5
          ? 4 * spark.progress * spark.progress * spark.progress
          : 1 - Math.pow(-2 * spark.progress + 2, 3) / 2;

        const t = easeProgress;
        const currentX =
          (1 - t) * (1 - t) * spark.x +
          2 * (1 - t) * t * spark.controlX +
          t * t * spark.targetX;

        const currentY =
          (1 - t) * (1 - t) * spark.y +
          2 * (1 - t) * t * spark.controlY +
          t * t * spark.targetY;

        // Draw spark as curved path
        ctx.save();
        ctx.strokeStyle = `rgba(${spark.color}, ${spark.opacity * 0.4})`; // Max 40% opacity
        ctx.lineWidth = spark.lineWidth;
        ctx.shadowBlur = 6 + Math.random() * 4; // Variable glow
        ctx.shadowColor = `rgba(${spark.color}, 0.6)`;

        ctx.beginPath();
        ctx.moveTo(spark.x, spark.y);
        ctx.quadraticCurveTo(
          spark.controlX,
          spark.controlY,
          currentX,
          currentY
        );
        ctx.stroke();

        // Brighter endpoint with variable size
        ctx.fillStyle = `rgba(${spark.color}, ${spark.opacity * 0.8})`;
        ctx.shadowBlur = 8 + Math.random() * 4;
        ctx.beginPath();
        ctx.arc(currentX, currentY, spark.dotSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return spark.progress < 1; // Remove completed sparks
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(sparkInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6, zIndex: 2 }}
    />
  );
}
