import { useEffect, useRef, useState } from 'react';
import TacticalPanel from './TacticalPanel';

type Level = 'INFO' | 'WARN' | 'ALERT' | 'CRIT';

interface Entry { id: number; time: string; level: Level; msg: string; }

const SAMPLE: Array<[Level, string]> = [
  ['INFO', 'Node-14 (BERLIN) heartbeat received — latency 12ms'],
  ['INFO', 'OSINT scan batch #4471 complete — entities 2,847'],
  ['WARN', 'Anomalous traffic — AS47764 — 450 Gb/s'],
  ['ALERT', 'Credential exposure confirmed — darkweb-forum-ru-447'],
  ['INFO', 'Drone ALPHA-7 telemetry nominal — alt 1,240 ft'],
  ['WARN', 'Node-22 (TEHRAN) connectivity degraded — 340ms'],
  ['CRIT', 'APT-29 lateral movement detected — pivot 192.168.x.x'],
  ['INFO', 'Satellite KH-11 ingest complete — 14.2 GB processed'],
  ['ALERT', 'Zero-day probe detected — target Node-8 (MOSCOW)'],
  ['INFO', 'TOR exit enumeration — 1,204 nodes mapped'],
  ['WARN', 'HUMINT source BRAVO went dark — 02:14 UTC'],
  ['INFO', 'Threat feed sync — 44 new IOCs ingested'],
  ['CRIT', 'Ransomware BLACKCAT detected — FINANCIAL sector'],
  ['ALERT', 'Botnet C2 beacon — DNS-over-HTTPS protocol'],
  ['INFO', 'AIS track MV STRIDE — heading 091° — Strait of Malacca'],
  ['WARN', 'Carrier Group-12 SATCOM degraded — switching backup'],
];

const nowStr = () => new Date().toISOString().replace('T', ' ').slice(0, 19) + 'Z';

const colorFor = (l: Level) =>
  l === 'INFO' ? 'text-cyber-green' :
  l === 'WARN' ? 'text-cyber-amber' :
  l === 'ALERT' ? 'text-orange-400' :
  'text-cyber-red';

const TransactionLog = () => {
  const [entries, setEntries] = useState<Entry[]>(() =>
    SAMPLE.slice(0, 6).map((s, i) => ({ id: i, time: nowStr(), level: s[0], msg: s[1] }))
  );
  const counterRef = useRef(6);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      const s = SAMPLE[counterRef.current % SAMPLE.length];
      counterRef.current += 1;
      setEntries(prev => [...prev.slice(-40), { id: counterRef.current, time: nowStr(), level: s[0], msg: s[1] }]);
    }, 1700);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [entries]);

  return (
    <TacticalPanel title="EVENT STREAM" subtitle="REAL-TIME OPS LOG" variant="green" live classified="SECRET" contentClassName="p-0">
      <div className="max-h-[200px] overflow-y-auto font-data text-[11px] leading-relaxed px-3 py-2">
        {entries.map(e => (
          <div key={e.id} className="flex items-start gap-2 py-0.5">
            <span className="text-muted-foreground/60 shrink-0">{e.time}</span>
            <span className={`${colorFor(e.level)} shrink-0`}>[{e.level}]</span>
            <span className="text-foreground/85 truncate">{e.msg}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </TacticalPanel>
  );
};

export default TransactionLog;
