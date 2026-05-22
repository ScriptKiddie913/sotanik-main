import { useLocation } from 'react-router-dom';

const LABELS: Record<string, string> = {
  '/': 'OPERATIONS CENTER',
  '/services': 'CAPABILITIES MATRIX',
  '/about': 'PLATFORM ARCHITECTURE',
  '/labs': 'R&D SKUNKWORKS',
  '/contact': 'SECURE COMMS',
};

const ClassificationBreadcrumb = () => {
  const { pathname } = useLocation();
  const label = LABELS[pathname] ?? pathname.toUpperCase().replace('/', '');
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 border-b border-cyber-green/20 bg-black/80 font-data text-[10px] tracking-[0.18em]">
      <span className="classification-ts">TS//SCI</span>
      <span className="text-cyber-green/40">›</span>
      <span className="text-cyber-green/80">SOTANIK AI</span>
      <span className="text-cyber-green/40">›</span>
      <span className="text-cyber-green">{label}</span>
      <span className="ml-auto text-muted-foreground hidden sm:inline">SESSION ENCRYPTED // AES-256</span>
    </div>
  );
};

export default ClassificationBreadcrumb;
