import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Drone {
  id: string; alt: number; speed: number; heading: number;
  lat: number; lon: number; fuel: number;
  status: 'ACTIVE' | 'ACQUIRING' | 'RETURNING' | 'HOLDING';
}

const DRONES: Drone[] = [
  { id: 'ALPHA-7', alt: 1240, speed: 148, heading: 274, lat: 52.51, lon: 13.40, fuel: 68, status: 'ACTIVE' },
  { id: 'BRAVO-3', alt: 890, speed: 112, heading: 91, lat: 35.69, lon: 139.69, fuel: 45, status: 'ACQUIRING' },
  { id: 'DELTA-1', alt: 1640, speed: 182, heading: 180, lat: 40.71, lon: -74.00, fuel: 82, status: 'HOLDING' },
];

const noisify = (n: number, d: number) => +(n + (Math.random() - 0.5) * d).toFixed(2);

const DroneTelemetryFeed = () => {
  const [visible, setVisible] = useState(false);
  const [drone, setDrone] = useState<Drone>(DRONES[0]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const show = () => {
      setIdx(i => {
        const next = (i + 1) % DRONES.length;
        setDrone({ ...DRONES[next] });
        return next;
      });
      setVisible(true);
      window.setTimeout(() => setVisible(false), 7000);
    };
    const t = window.setInterval(show, 18000);
    const initial = window.setTimeout(show, 5000);
    return () => { clearInterval(t); clearTimeout(initial); };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = window.setInterval(() => {
      setDrone(d => ({
        ...d,
        alt: noisify(d.alt, 30),
        speed: noisify(d.speed, 8),
        heading: noisify(d.heading, 3),
        lat: noisify(d.lat, 0.002),
        lon: noisify(d.lon, 0.002),
        fuel: +Math.max(0, d.fuel - 0.05).toFixed(2),
      }));
    }, 500);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: -10 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-40 w-[260px] hidden md:block"
        >
          <div className="border border-cyber-amber/40 bg-black/95 shadow-[0_0_25px_hsl(var(--accent-amber)/0.15)]">
            <div className="flex items-center justify-between border-b border-cyber-amber/30 bg-black px-2 py-1">
              <span className="font-data text-[10px] tracking-[0.2em] text-cyber-amber">DRONE FEED // {drone.id}</span>
              <span className="flex items-center gap-1 text-[9px] font-data text-cyber-red">
                <span className="w-1.5 h-1.5 bg-cyber-red rounded-full animate-blink-dot" />
                LIVE
              </span>
            </div>
            <div className="relative aspect-video bg-[#0a0d10] overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,159,0.04) 2px, rgba(0,255,159,0.04) 3px)' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 border border-cyber-amber/60 rounded-full" />
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-3 bg-cyber-amber" />
                  <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-px h-3 bg-cyber-amber" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-3 bg-cyber-amber" />
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 h-px w-3 bg-cyber-amber" />
                </div>
              </div>
              <div className="absolute top-1 left-1 font-data text-[8px] text-cyber-amber/90">
                {drone.lat.toFixed(4)}°N {drone.lon.toFixed(4)}°E
              </div>
              <div className="absolute bottom-1 right-1 font-data text-[8px] text-cyber-amber/90">
                {drone.status === 'ACQUIRING' ? 'ACQUIRING TARGET...' : drone.status}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-px bg-cyber-amber/15">
              {[
                ['ALT', `${drone.alt.toFixed(0)} FT`],
                ['SPD', `${drone.speed.toFixed(0)} KTS`],
                ['HDG', `${drone.heading.toFixed(0)}°`],
                ['FUEL', `${drone.fuel.toFixed(0)}%`],
                ['LINK', 'AES-256'],
                ['STAT', drone.status],
              ].map(([k, v]) => (
                <div key={k} className="bg-black/95 px-1.5 py-1">
                  <div className="font-data text-[8px] text-muted-foreground">{k}</div>
                  <div className="font-data text-[10px] text-cyber-amber">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DroneTelemetryFeed;
