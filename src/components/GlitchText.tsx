import { useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props { children: string; className?: string; intensity?: 'low' | 'med' | 'high' }

const GlitchText = ({ children, className, intensity = 'med' }: Props) => {
  const [g, setG] = useState(false);
  useEffect(() => {
    let to: number;
    const range = intensity === 'high' ? [2000, 6000] : intensity === 'low' ? [6000, 14000] : [4000, 10000];
    const loop = () => {
      const wait = Math.random() * (range[1] - range[0]) + range[0];
      to = window.setTimeout(() => {
        setG(true);
        const dur = 150 + Math.random() * 150;
        window.setTimeout(() => { setG(false); loop(); }, dur);
      }, wait);
    };
    loop();
    return () => window.clearTimeout(to);
  }, [intensity]);

  const off = intensity === 'high' ? 6 : intensity === 'low' ? 2 : 3;

  return (
    <span className={cn('relative inline-block', className)} data-text={children}>
      <span className="relative z-10">{children}</span>
      {g && (
        <>
          <span aria-hidden style={{
            position: 'absolute', inset: 0, color: '#ff2d55',
            transform: `translateX(-${off}px)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 40%)',
            mixBlendMode: 'screen', pointerEvents: 'none',
          }}>{children}</span>
          <span aria-hidden style={{
            position: 'absolute', inset: 0, color: '#00c3ff',
            transform: `translateX(${off}px)`,
            clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)',
            mixBlendMode: 'screen', pointerEvents: 'none',
          }}>{children}</span>
        </>
      )}
    </span>
  );
};

export default GlitchText;