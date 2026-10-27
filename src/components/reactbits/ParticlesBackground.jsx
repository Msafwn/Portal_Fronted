import React, { useRef, useEffect } from 'react';

/**
 * ReactBits Interactive Particles Background
 * High-performance 60 FPS HTML5 Canvas particle constellation.
 * Supports light & dark palettes, gentle drift, and subtle cursor interaction.
 */
export const ParticlesBackground = ({
  className = '',
  particleCount = 28,
  particleColor = 'rgba(59, 130, 246, 0.25)', // Subtle airy blue
  lineColor = 'rgba(148, 163, 184, 0.10)',
  particleSize = 1.6,
  speed = 0.4,
  connectDistance = 100,
  interactive = true,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Particles array
    const particles = [];
    const count = Math.min(particleCount, Math.floor((width * height) / 18000) || 25);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * particleSize + 1,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    // Mouse tracking
    let mouse = { x: null, y: null, radius: 100 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    if (interactive) {
      canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);
    }

    // Resize handler
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repelling
        if (interactive && mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 2;
            p.y += (dy / dist) * force * 2;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            const lineAlpha = (1 - dist / connectDistance) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor.replace(
              /rgba?\(([^)]+)\)/,
              (_, values) => {
                const parts = values.split(',');
                return `rgba(${parts[0]},${parts[1]},${parts[2]},${lineAlpha})`;
              }
            );
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive && canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [particleCount, particleColor, lineColor, particleSize, speed, connectDistance, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
};

export default ParticlesBackground;
