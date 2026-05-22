const ScanlineOverlay = () => (
  <>
    <div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
        mixBlendMode: 'multiply',
      }}
      aria-hidden
    />
    <div className="fixed left-0 right-0 h-[2px] pointer-events-none z-[2] bg-gradient-to-b from-transparent via-cyber-green/40 to-transparent animate-scan-sweep" aria-hidden />
  </>
);

export default ScanlineOverlay;
