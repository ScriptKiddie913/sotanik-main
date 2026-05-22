import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props { value: string; className?: string }

const AnimatedCounter = ({ value, className }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const m = value.match(/^([<]?)([0-9.]+)([A-Za-z%+]*)$/);
    if (!m) { setDisplay(value); return; }
    const prefix = m[1], target = parseFloat(m[2]), suffix = m[3];
    const isInt = !m[2].includes('.');
    const dur = 2000;
    const start = performance.now();
    let scrambleId: number | null = null;
    let lastScramble = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = target * eased;
      let out: string;
      if (now - lastScramble > 80 && t < 0.95) {
        const scrambled = (cur + Math.random() * target * 0.1).toFixed(isInt ? 0 : 1);
        out = scrambled;
        lastScramble = now;
      } else {
        out = isInt ? Math.round(cur).toString() : cur.toFixed(1);
      }
      setDisplay(`${prefix}${out}${suffix}`);
      if (t < 1) scrambleId = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    scrambleId = requestAnimationFrame(tick);
    return () => { if (scrambleId) cancelAnimationFrame(scrambleId); };
  }, [inView, value]);

  return <span ref={ref} className={className} style={{ textShadow: '0 0 20px hsl(var(--accent-green) / 0.4)' }}>{display}</span>;
};

export default AnimatedCounter;