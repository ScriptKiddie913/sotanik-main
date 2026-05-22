import { useEffect, useRef } from 'react';

interface P { x: number; y: number; vx: number; vy: number; anchor?: boolean }

const ConstellationField = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>();

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 90;
    const particles: P[] = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3 * dpr, vy: (Math.random() - 0.5) * 0.3 * dpr,
      anchor: i < 3,
    }));

    type Pulse = { a: number; b: number; t: number; dur: number };
    let pulses: Pulse[] = [];
    const spawn = setInterval(() => {
      const a = Math.floor(Math.random() * COUNT);
      let b = Math.floor(Math.random() * COUNT);
      if (b === a) b = (b + 1) % COUNT;
      pulses.push({ a, b, t: performance.now(), dur: 1200 });
    }, 5000);

    const MAX = 140 * dpr;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      // lines
      ctx.lineWidth = 1;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX) {
            const o = (1 - d / MAX) * 0.3;
            ctx.strokeStyle = `rgba(0,255,159,${o})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      // dots
      ctx.shadowBlur = 8;
      for (const p of particles) {
        ctx.beginPath();
        if (p.anchor) {
          ctx.fillStyle = 'rgba(255,184,0,0.85)';
          ctx.shadowColor = 'rgba(255,184,0,0.8)';
          ctx.arc(p.x, p.y, 4 * dpr, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = 'rgba(0,255,159,0.6)';
          ctx.shadowColor = 'rgba(0,255,159,0.7)';
          ctx.arc(p.x, p.y, 1.5 * dpr, 0, Math.PI * 2);
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      // pulses
      const now = performance.now();
      pulses = pulses.filter(p => now - p.t < p.dur);
      for (const pulse of pulses) {
        const t = (now - pulse.t) / pulse.dur;
        const a = particles[pulse.a], b = particles[pulse.b];
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(0,195,255,0.9)';
        ctx.fillStyle = `rgba(0,195,255,${1 - t * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.5 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf.current!);
      clearInterval(spawn);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0" style={{ zIndex: 1, opacity: 0.55 }} aria-hidden />;
};

export default ConstellationField;