import { useEffect, useRef } from 'react';

// Lightweight network particle field — kept as wrapper around MatrixBackground for any old imports.
// The real background is MatrixBackground; this component is a no-op fallback.
const ParticleField = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => { /* intentionally idle — replaced by MatrixBackground globally */ }, []);
  return <canvas ref={ref} className="hidden" aria-hidden />;
};

export default ParticleField;
