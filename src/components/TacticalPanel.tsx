import { ReactNode, useRef, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'green' | 'amber' | 'red' | 'blue' | 'purple';

interface Props {
  title?: string;
  subtitle?: string;
  variant?: Variant;
  live?: boolean;
  classified?: 'TS' | 'SECRET' | 'UNCLASS';
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  poweron?: boolean;
}

const borderMap: Record<Variant, string> = {
  green: 'border-cyber-green/30 shadow-[0_0_18px_hsl(var(--accent-green)/0.08)]',
  amber: 'border-cyber-amber/30 shadow-[0_0_18px_hsl(var(--accent-amber)/0.08)]',
  red: 'border-cyber-red/30 shadow-[0_0_18px_hsl(var(--accent-red)/0.1)]',
  blue: 'border-cyber-blue/30 shadow-[0_0_18px_hsl(var(--accent-blue)/0.08)]',
  purple: 'border-cyber-purple/30 shadow-[0_0_18px_hsl(var(--accent-purple)/0.08)]',
};

const stripeMap: Record<Variant, string> = {
  green: 'bg-cyber-green',
  amber: 'bg-cyber-amber',
  red: 'bg-cyber-red',
  blue: 'bg-cyber-blue',
  purple: 'bg-cyber-purple',
};

const titleColorMap: Record<Variant, string> = {
  green: 'text-cyber-green',
  amber: 'text-cyber-amber',
  red: 'text-cyber-red',
  blue: 'text-cyber-blue',
  purple: 'text-cyber-purple',
};

const classifiedClass: Record<NonNullable<Props['classified']>, string> = {
  TS: 'classification-ts',
  SECRET: 'classification-secret',
  UNCLASS: 'classification-unclass',
};

const TacticalPanel = ({
  title, subtitle, variant = 'green', live, classified,
  children, className, contentClassName, poweron,
}: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 12;
    const ry = (x - 0.5) * 12;
    if (innerRef.current) {
      innerRef.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, hsl(var(--accent-green)/0.18), hsl(var(--accent-blue)/0.08) 30%, transparent 60%)`;
      sheenRef.current.style.opacity = '1';
    }
  };
  const handleLeave = () => {
    if (innerRef.current) innerRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    if (sheenRef.current) sheenRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      className={cn('group/tac relative', className)}
    >
    <div
      ref={innerRef}
      style={{ transition: 'transform 400ms cubic-bezier(0.2,0.8,0.2,1)' }}
      className={cn('relative bg-[hsl(210_30%_3%/0.92)] border', borderMap[variant], poweron && 'animate-power-on')}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,159,0.012) 2px, rgba(0,255,159,0.012) 3px)' }} />

      {/* Holographic sheen */}
      <div ref={sheenRef} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 mix-blend-screen" />

      {/* Corner brackets */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyber-green/60" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyber-green/60" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyber-green/60" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyber-green/60" />

      {title && (
        <div className="relative flex items-center justify-between border-b border-cyber-green/20 bg-black/50 px-3 py-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className={cn('w-1 h-4', stripeMap[variant])} />
            <div className="min-w-0">
              <div className={cn('font-tactical text-[11px] truncate', titleColorMap[variant])}>{title}</div>
              {subtitle && <div className="font-data text-[9px] text-muted-foreground truncate">{subtitle}</div>}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {classified && <span className={classifiedClass[classified]}>{classified === 'TS' ? 'TS//SCI//NOFORN' : classified}</span>}
            {live && (
              <span className="flex items-center gap-1 text-[9px] font-data text-cyber-red">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-red animate-blink-dot" />
                LIVE
              </span>
            )}
            <span className="hidden sm:flex items-center gap-1 text-cyber-green/30 font-data text-[10px]">
              <span>—</span><span>□</span><span>×</span>
            </span>
          </div>
        </div>
      )}

      <div className={cn('relative', contentClassName ?? 'p-3')}>{children}</div>
    </div>
    </div>
  );
};

export default TacticalPanel;
