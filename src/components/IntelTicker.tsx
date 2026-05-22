const EVENTS = [
  'TS// SIGINT COLLECTION ACTIVE — NODE-14 BERLIN — 2,847 SIGNALS INTERCEPTED',
  'SECRET// DARKWEB ALERT — CREDENTIAL LEAK DETECTED — SOURCE: RU-FORUM-447 — 14,200 RECORDS',
  'TS// APT-29 TTPs IDENTIFIED IN EU SECTOR — CONFIDENCE: HIGH — ANALYST: AUTO',
  'TS//SCI// SATELLITE PASS SCHEDULED — KH-11 KENNEN — GRID 52.5N 13.4E — T-00:14:22',
  'SECRET// THREAT ACTOR: SANDWORM — NEW C2 INFRASTRUCTURE — ASN 47764',
  'TS// NODE-7 (TOKYO) ANOMALOUS TRAFFIC — 450 GB/S OUTBOUND — INVESTIGATING',
  'CRIT// ZERO-DAY EXPLOIT CIRCULATING — CVE-2024-XXXX — SEVERITY: CRITICAL',
  'SECRET// DRONE ALPHA-7 — FUEL 68% — ALT 1,240 FT — HEADING 274° — STATUS ACTIVE',
  'UNCLASS// OSINT SWEEP COMPLETE — 4,219 ENTITIES PROCESSED — 31 HIGH-PRIORITY FLAGS',
  'TS// RANSOMWARE VARIANT BLACKCAT — VICTIM SECTOR: FINANCIAL',
  'SECRET// HUMINT REPORT — SOURCE ALPHA — LOCATION: EAST ASIA — RELIABILITY B2',
  'TS//SCI// BOTNET TAKEDOWN INITIATED — C2 NODES 1,847 — OP NIGHTFALL',
  'SECRET// CARRIER STRIKE GROUP-12 TRANSIT — BAB-EL-MANDEB — SPD 24 KTS',
  'UNCLASS// AIS TRACK MT ARDMORE — TANKER — ETA 04:18Z STRAIT OF HORMUZ',
];

const IntelTicker = () => {
  const doubled = [...EVENTS, ...EVENTS];
  return (
    <div className="relative overflow-hidden border-y border-cyber-green/25 bg-black/70">
      <div className="absolute inset-y-0 left-0 z-10 flex items-center gap-2 px-3 bg-gradient-to-r from-black via-black to-transparent">
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-red animate-blink-dot" />
        <span className="font-data text-[10px] tracking-[0.2em] text-cyber-red">SIGINT FEED</span>
      </div>
      <div className="flex whitespace-nowrap py-1.5 pl-32 animate-ticker">
        {doubled.map((e, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-4 font-data text-[11px] text-cyber-green/85">
            <span>{e}</span>
            <span className="text-cyber-red/70">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default IntelTicker;
