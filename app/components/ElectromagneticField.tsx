'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  energy: number; // 0-1, affects glow intensity
  phase: number;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
}

interface FieldLine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlX: number;
  controlY: number;
  progress: number;
  speed: number;
  opacity: number;
  energy: number;
}

export function ElectromagneticField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const fieldLinesRef = useRef<FieldLine[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if mobile (simplify on mobile for performance)
    const isMobile = window.innerWidth < 768;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initializeField();
    };

    // Initialize electromagnetic field nodes
    const initializeField = () => {
      nodesRef.current = [];
      connectionsRef.current = [];

      const nodeCount = isMobile ? 25 : 40;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Create constellation nodes in a semi-structured pattern
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        nodesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseX: x,
          baseY: y,
          energy: Math.random(),
          phase: Math.random() * Math.PI * 2
        });
      }

      // Create connections between nearby nodes (constellation effect)
      const maxDistance = isMobile ? 200 : 250;
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const dx = nodesRef.current[i].x - nodesRef.current[j].x;
          const dy = nodesRef.current[i].y - nodesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            connectionsRef.current.push({
              from: i,
              to: j,
              strength: 1 - (distance / maxDistance)
            });
          }
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for subtle interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create flowing field lines periodically
    const createFieldLine = () => {
      if (fieldLinesRef.current.length > (isMobile ? 3 : 5)) {
        fieldLinesRef.current.shift();
      }

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Pick two random nodes to connect with field line
      const nodeA = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
      const nodeB = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];

      if (!nodeA || !nodeB) return;

      // Create curved electromagnetic field line
      const midX = (nodeA.x + nodeB.x) / 2;
      const midY = (nodeA.y + nodeB.y) / 2;
      const dx = nodeB.x - nodeA.x;
      const dy = nodeB.y - nodeA.y;
      const perpX = -dy;
      const perpY = dx;
      const curvature = (Math.random() - 0.5) * 0.3;

      fieldLinesRef.current.push({
        startX: nodeA.x,
        startY: nodeA.y,
        endX: nodeB.x,
        endY: nodeB.y,
        controlX: midX + perpX * curvature,
        controlY: midY + perpY * curvature,
        progress: 0,
        speed: 0.002 + Math.random() * 0.003,
        opacity: 0,
        energy: Math.random() * 0.5 + 0.5
      });
    };

    // Create field lines periodically
    const fieldLineInterval = setInterval(createFieldLine, isMobile ? 4000 : 2500);
    createFieldLine();

    // Animation loop
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Update and draw field lines (flowing electromagnetic energy)
      fieldLinesRef.current = fieldLinesRef.current.filter(line => {
        line.progress += line.speed;

        // Fade in/out
        if (line.progress < 0.15) {
          line.opacity = line.progress / 0.15;
        } else if (line.progress > 0.85) {
          line.opacity = (1 - line.progress) / 0.15;
        } else {
          line.opacity = 1;
        }

        // Calculate current position along curve
        const t = line.progress;
        const currentX = (1 - t) * (1 - t) * line.startX + 2 * (1 - t) * t * line.controlX + t * t * line.endX;
        const currentY = (1 - t) * (1 - t) * line.startY + 2 * (1 - t) * t * line.controlY + t * t * line.endY;

        // Draw flowing field line
        ctx.save();
        const gradient = ctx.createLinearGradient(line.startX, line.startY, currentX, currentY);
        gradient.addColorStop(0, `rgba(96, 165, 250, 0)`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${line.opacity * 0.3 * line.energy})`);
        gradient.addColorStop(1, `rgba(167, 139, 250, ${line.opacity * 0.5 * line.energy})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(139, 92, 246, ${line.opacity * 0.4})`;

        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.quadraticCurveTo(line.controlX, line.controlY, currentX, currentY);
        ctx.stroke();

        // Draw energy particle at current position
        ctx.fillStyle = `rgba(167, 139, 250, ${line.opacity * 0.8 * line.energy})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(167, 139, 250, ${line.opacity})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return line.progress < 1;
      });

      // Update nodes (constellation points)
      nodesRef.current.forEach(node => {
        // Update energy phase for pulsing effect
        node.phase += 0.02;
        node.energy = Math.sin(node.phase) * 0.3 + 0.7; // Oscillate between 0.4 and 1.0

        // Gentle drift (return to base position)
        node.x += node.vx;
        node.y += node.vy;

        // Spring force back to base position
        const dx = node.baseX - node.x;
        const dy = node.baseY - node.y;
        node.vx += dx * 0.0005;
        node.vy += dy * 0.0005;

        // Apply damping
        node.vx *= 0.95;
        node.vy *= 0.95;

        // Mouse interaction (subtle repulsion)
        if (!isMobile) {
          const mouseDx = node.x - mouseRef.current.x;
          const mouseDy = node.y - mouseRef.current.y;
          const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
          const interactionRadius = 150;

          if (mouseDist < interactionRadius && mouseDist > 0) {
            const force = (interactionRadius - mouseDist) / interactionRadius * 0.5;
            node.vx += (mouseDx / mouseDist) * force;
            node.vy += (mouseDy / mouseDist) * force;
          }
        }
      });

      // Draw constellation connections
      connectionsRef.current.forEach(connection => {
        const nodeA = nodesRef.current[connection.from];
        const nodeB = nodesRef.current[connection.to];

        if (!nodeA || !nodeB) return;

        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = isMobile ? 200 : 250;

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * connection.strength * 0.15;
          const avgEnergy = (nodeA.energy + nodeB.energy) / 2;

          ctx.save();
          ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * avgEnergy})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Draw nodes (constellation points with energy glow)
      nodesRef.current.forEach(node => {
        ctx.save();

        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12);
        gradient.addColorStop(0, `rgba(139, 92, 246, ${node.energy * 0.3})`);
        gradient.addColorStop(0.5, `rgba(96, 165, 250, ${node.energy * 0.15})`);
        gradient.addColorStop(1, `rgba(96, 165, 250, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.fillStyle = `rgba(167, 139, 250, ${node.energy * 0.8})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(167, 139, 250, ${node.energy})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(fieldLineInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 3, opacity: 0.85 }}
    />
  );
}
