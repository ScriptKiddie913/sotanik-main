interface Props { variant?: 'green' | 'amber' | 'blue' }

const colorMap = { green: '#00ff9f', amber: '#ffb800', blue: '#00c3ff' };

const CircuitDivider = ({ variant = 'green' }: Props) => {
  const c = colorMap[variant];
  return (
    <div className="relative w-full h-[60px] overflow-hidden" aria-hidden>
      <svg width="100%" height="60" viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute inset-0">
        <defs>
          <filter id={`glow-${variant}`}>
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g stroke={c} strokeOpacity="0.5" fill="none" strokeWidth="1">
          <line x1="0" y1="30" x2="1200" y2="30" />
          {[120, 260, 380, 520, 680, 820, 960, 1100].map((x, i) => (
            <g key={i}>
              <rect x={x - 2} y={28} width="4" height="4" fill={c} fillOpacity="0.7" />
              <line x1={x} y1={i % 2 ? 30 : 30} x2={x} y2={i % 2 ? 12 : 48} />
              <line x1={x} y1={i % 2 ? 12 : 48} x2={x + 18} y2={i % 2 ? 12 : 48} />
              <circle cx={x + 18} cy={i % 2 ? 12 : 48} r="3" fill={c} style={{ filter: `drop-shadow(0 0 4px ${c})` }} />
            </g>
          ))}
          {/* IC chips */}
          {[300, 900].map((x, k) => (
            <g key={k}>
              <rect x={x} y={20} width="40" height="20" stroke={c} fill="black" />
              {[0, 1, 2, 3].map(i => (
                <g key={i}>
                  <line x1={x + 6 + i * 9} y1={20} x2={x + 6 + i * 9} y2={16} />
                  <line x1={x + 6 + i * 9} y1={40} x2={x + 6 + i * 9} y2={44} />
                </g>
              ))}
            </g>
          ))}
        </g>
        <line x1="0" y1="30" x2="1200" y2="30" stroke={c} strokeWidth="2" strokeDasharray="20 1180" strokeLinecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-1200" dur="3s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  );
};

export default CircuitDivider;