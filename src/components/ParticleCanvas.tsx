import React, { useEffect, useRef } from 'react';

interface Ember {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  alpha: number;
  life: number;
  maxLife: number;
  hueOffset: number; // Varied flame tones: -20 (red-orange) to +25 (bright gold)
  flickerSpeed: number;
  swaySpeed: number;
  swayOffset: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const count = 95;
    const embers: Ember[] = [];

    const createEmber = (initialSpawn = false): Ember => {
      const z = Math.random(); // 0 (background) to 1 (foreground)
      const baseSize = 1.2 + z * 2.8;
      const maxLife = 120 + Math.random() * 180;
      return {
        x: Math.random() * width,
        y: initialSpawn ? Math.random() * height : height + 10 + Math.random() * 30,
        z,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.8 + z * 1.6 + Math.random() * 0.8), // Foreground rises faster
        size: baseSize,
        baseSize,
        alpha: 0,
        life: initialSpawn ? Math.random() * maxLife : 0,
        maxLife,
        hueOffset: Math.floor(Math.random() * 45) - 15,
        flickerSpeed: 0.05 + Math.random() * 0.08,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
      };
    };

    // Initialize all embers
    for (let i = 0; i < count; i++) {
      embers.push(createEmber(true));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Soft Atmospheric Magma Bottom Hearth Glow
      const ambientGlow = ctx.createRadialGradient(
        width / 2,
        height + 120,
        20,
        width / 2,
        height,
        Math.max(width * 0.65, 550)
      );
      ambientGlow.addColorStop(0, 'rgba(255, 60, 0, 0.14)');
      ambientGlow.addColorStop(0.45, 'rgba(255, 120, 0, 0.05)');
      ambientGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Read current primary RGB from CSS variable for harmonious theming
      const styles = getComputedStyle(document.documentElement);
      const primaryRgbStr = styles.getPropertyValue('--theme-primary-rgb').trim() || '255, 77, 21';
      const [rVal, gVal, bVal] = primaryRgbStr.split(',').map((v) => parseInt(v.trim(), 10));

      const mouse = mouseRef.current;

      // 2. Update & Connect Nearby Embers (Technological Plasma Filament Grid)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < embers.length; i++) {
        const e1 = embers[i];
        for (let j = i + 1; j < embers.length; j++) {
          const e2 = embers[j];
          const dx = e1.x - e2.x;
          const dy = e1.y - e2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const filamentAlpha = (1 - dist / 85) * Math.min(e1.alpha, e2.alpha) * 0.28;
            ctx.strokeStyle = `rgba(${rVal}, ${Math.min(255, gVal + 40)}, ${bVal}, ${filamentAlpha})`;
            ctx.beginPath();
            ctx.moveTo(e1.x, e1.y);
            ctx.lineTo(e2.x, e2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Update & Draw Individual Fire Embers
      for (let i = 0; i < embers.length; i++) {
        const ember = embers[i];
        ember.life += 1;

        // Fade in when young, flicker in mid-life, fade out when expiring or near top
        const progress = ember.life / ember.maxLife;
        let targetAlpha = 1;
        if (progress < 0.2) {
          targetAlpha = progress / 0.2;
        } else if (progress > 0.75) {
          targetAlpha = (1 - progress) / 0.25;
        }

        // Realistic organic fire flicker
        const flicker = 0.85 + Math.sin(time * ember.flickerSpeed + ember.swayOffset) * 0.15;
        ember.alpha = Math.max(0, Math.min(1, targetAlpha * flicker * (0.35 + ember.z * 0.65)));

        // Natural horizontal convection sway
        const sway = Math.sin(time * ember.swaySpeed + ember.swayOffset) * (0.5 + ember.z * 0.8);
        ember.x += ember.vx + sway;
        ember.y += ember.vy;

        // Interactive Mouse Thermal Updraft & Deflection
        if (mouse.active) {
          const mdx = ember.x - mouse.x;
          const mdy = ember.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxDist = 200;

          if (mdist < maxDist && mdist > 0) {
            const force = (1 - mdist / maxDist) * 1.8;
            ember.x += (mdx / mdist) * force * 1.5;
            ember.y += -force * 2.2; // Extra thermal upward propulsion!
          }
        }

        // Respawn ember if it dies or floats off screen
        if (ember.life >= ember.maxLife || ember.y < -30 || ember.x < -30 || ember.x > width + 30) {
          embers[i] = createEmber(false);
          continue;
        }

        // Compute ember color: warm orange/gold core with hot white center on foreground
        const currentSize = ember.baseSize * (1 + Math.sin(time * ember.flickerSpeed) * 0.12);

        // Draw glowing ember halo
        const haloRadius = currentSize * (ember.z > 0.6 ? 3.5 : 2.2);
        const grad = ctx.createRadialGradient(
          ember.x,
          ember.y,
          0,
          ember.x,
          ember.y,
          haloRadius
        );

        if (ember.z > 0.7) {
          // Foreground: Incandescent White-Hot Core to Radiant Flame Orange
          grad.addColorStop(0, `rgba(255, 250, 230, ${ember.alpha})`);
          grad.addColorStop(0.35, `rgba(${rVal}, ${Math.min(255, gVal + 60)}, 0, ${ember.alpha * 0.9})`);
          grad.addColorStop(0.8, `rgba(${Math.min(255, rVal + 20)}, ${gVal}, 10, ${ember.alpha * 0.3})`);
          grad.addColorStop(1, 'rgba(255, 40, 0, 0)');
        } else {
          // Mid/Background: Deep Molten Red-Amber
          grad.addColorStop(0, `rgba(${rVal}, ${Math.min(255, gVal + 40)}, 20, ${ember.alpha * 0.95})`);
          grad.addColorStop(0.5, `rgba(${Math.min(255, rVal + 10)}, ${gVal}, 0, ${ember.alpha * 0.5})`);
          grad.addColorStop(1, 'rgba(255, 30, 0, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Incandescent crisp center point for high-definition sharpness
        if (ember.z > 0.5) {
          ctx.fillStyle = `rgba(255, 255, 240, ${ember.alpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, Math.max(0.6, currentSize * 0.4), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-bg-wrapper" style={{ opacity: 0.85 }} />;
};
