import { useEffect, useRef } from 'react';

const CHARS = '01アイウエオカキクケコXYZABCDEF0123456789//\\[]{}ALPHABRAVOCHARLIEDELTAECHOFOXTROTGOLF'.split('');

const MatrixBackground = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const cols = Math.floor(window.innerWidth / 18);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 3, 6, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const b = Math.random();
        if (b > 0.94) ctx.fillStyle = 'rgba(0, 255, 159, 0.6)';
        else if (b > 0.75) ctx.fillStyle = 'rgba(0, 255, 159, 0.18)';
        else ctx.fillStyle = 'rgba(0, 255, 159, 0.06)';
        ctx.font = '12px JetBrains Mono';
        ctx.fillText(ch, i * 18, drops[i] * 18);
        if (drops[i] * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4;
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
      aria-hidden
    />
  );
};

export default MatrixBackground;
