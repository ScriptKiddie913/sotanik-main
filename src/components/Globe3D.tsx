import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import recon1 from '@/assets/recon-1.png';
import recon2 from '@/assets/recon-2.png';
import recon3 from '@/assets/recon-3.png';

const RECON = [recon1, recon2, recon3];

type AssetKind = 'UCAV' | 'HALE-ISR' | 'RECON SAT' | 'AWACS' | 'SIGINT' | 'MPA' | 'CARRIER' | 'DESTROYER' | 'SUBMARINE' | 'TANKER' | 'CONTAINER';
type AssetStatus = 'TRACKING' | 'LOITERING' | 'PASSING' | 'ORBIT' | 'COLLECTING' | 'PATROL' | 'TRANSIT' | 'SILENT RUN';

interface Asset {
  id: string; type: AssetKind; alt: string; spd: string;
  status: AssetStatus; class: 'TS//SCI' | 'TS' | 'SECRET'; group: 'AIR' | 'SPACE' | 'NAVAL';
}

const ASSETS: Asset[] = [
  { id: 'MQ-9A REAPER', type: 'UCAV', alt: '24,800 FT', spd: '210 KTS', status: 'TRACKING', class: 'TS//SCI', group: 'AIR' },
  { id: 'RQ-4 GLOBAL HAWK', type: 'HALE-ISR', alt: '54,200 FT', spd: '340 KTS', status: 'LOITERING', class: 'TS', group: 'AIR' },
  { id: 'KH-11 KENNEN', type: 'RECON SAT', alt: '512 KM', spd: '7.6 KM/S', status: 'PASSING', class: 'TS//SCI', group: 'SPACE' },
  { id: 'E-3G SENTRY', type: 'AWACS', alt: '32,000 FT', spd: '380 KTS', status: 'ORBIT', class: 'SECRET', group: 'AIR' },
  { id: 'RC-135V RIVET', type: 'SIGINT', alt: '38,500 FT', spd: '460 KTS', status: 'COLLECTING', class: 'TS', group: 'AIR' },
  { id: 'P-8A POSEIDON', type: 'MPA', alt: '28,000 FT', spd: '440 KTS', status: 'PATROL', class: 'SECRET', group: 'AIR' },
  { id: 'USS GERALD R FORD', type: 'CARRIER', alt: 'SURFACE', spd: '24 KTS', status: 'TRANSIT', class: 'SECRET', group: 'NAVAL' },
  { id: 'USS ZUMWALT DDG-1000', type: 'DESTROYER', alt: 'SURFACE', spd: '32 KTS', status: 'PATROL', class: 'TS', group: 'NAVAL' },
  { id: 'SSN-23 JIMMY CARTER', type: 'SUBMARINE', alt: '-220 M', spd: '12 KTS', status: 'SILENT RUN', class: 'TS//SCI', group: 'NAVAL' },
  { id: 'MV STRIDE 9847', type: 'CONTAINER', alt: 'SURFACE', spd: '18 KTS', status: 'TRANSIT', class: 'SECRET', group: 'NAVAL' },
  { id: 'MT ARDMORE TYNE', type: 'TANKER', alt: 'SURFACE', spd: '14 KTS', status: 'TRANSIT', class: 'SECRET', group: 'NAVAL' },
  { id: 'LACROSSE-5', type: 'RECON SAT', alt: '680 KM', spd: '7.4 KM/S', status: 'PASSING', class: 'TS//SCI', group: 'SPACE' },
];

type FlowState = 'global-idle' | 'activity-spike' | 'target-acquisition' | 'zoom-lock' | 'drone-tracking' | 'pull-back';

const FLOW: FlowState[] = ['global-idle', 'activity-spike', 'target-acquisition', 'zoom-lock', 'drone-tracking', 'pull-back'];
const PHASE_MS: Record<FlowState, number> = {
  'global-idle': 7000,
  'activity-spike': 6000,
  'target-acquisition': 2500,
  'zoom-lock': 4000,
  'drone-tracking': 4000,
  'pull-back': 2500,
};

interface Hotspot {
  id: number; lat: number; lon: number; label: string;
  threat: 'LOW' | 'MED' | 'HIGH' | 'CRIT'; classification: 'TS' | 'SECRET' | 'UNCLASS';
}

const HOTSPOTS: Hotspot[] = [
  { id: 0, lat: 52.5, lon: 13.4, label: 'BERLIN', threat: 'HIGH', classification: 'TS' },
  { id: 1, lat: 35.7, lon: 139.7, label: 'TOKYO', threat: 'MED', classification: 'SECRET' },
  { id: 2, lat: 40.7, lon: -74.0, label: 'NEW YORK', threat: 'HIGH', classification: 'TS' },
  { id: 3, lat: 55.8, lon: 37.6, label: 'MOSCOW', threat: 'CRIT', classification: 'TS' },
  { id: 4, lat: 31.2, lon: 121.5, label: 'SHANGHAI', threat: 'HIGH', classification: 'TS' },
  { id: 5, lat: 1.3, lon: 103.8, label: 'SINGAPORE', threat: 'MED', classification: 'SECRET' },
  { id: 6, lat: 25.2, lon: 55.3, label: 'DUBAI', threat: 'MED', classification: 'SECRET' },
  { id: 7, lat: 37.8, lon: -122.4, label: 'SAN FRAN', threat: 'LOW', classification: 'UNCLASS' },
  { id: 8, lat: 51.5, lon: -0.1, label: 'LONDON', threat: 'MED', classification: 'SECRET' },
  { id: 9, lat: 35.6, lon: 51.3, label: 'TEHRAN', threat: 'CRIT', classification: 'TS' },
  { id: 10, lat: 22.3, lon: 114.2, label: 'HONG KONG', threat: 'HIGH', classification: 'TS' },
  { id: 11, lat: 41.0, lon: 28.9, label: 'ISTANBUL', threat: 'MED', classification: 'SECRET' },
  { id: 12, lat: -33.9, lon: 18.4, label: 'CAPE TOWN', threat: 'LOW', classification: 'UNCLASS' },
  { id: 13, lat: 19.1, lon: 72.9, label: 'MUMBAI', threat: 'MED', classification: 'SECRET' },
  { id: 14, lat: 14.6, lon: 121.0, label: 'MANILA', threat: 'MED', classification: 'SECRET' },
];

const GLOBE_RADIUS = 2;

const threatColorMap: Record<Hotspot['threat'], string> = {
  LOW: '#00ff9f', MED: '#ffb800', HIGH: '#ff7a00', CRIT: '#ff2d55',
};

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function getArcCurve(start: THREE.Vector3, end: THREE.Vector3, lift = 0.35) {
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const dist = start.distanceTo(end);
  mid.normalize().multiplyScalar(GLOBE_RADIUS + dist * lift);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

function worldToScreen(p: THREE.Vector3, camera: THREE.Camera, w: number, h: number) {
  const v = p.clone().project(camera);
  return { x: (v.x * 0.5 + 0.5) * w, y: (-v.y * 0.5 + 0.5) * h, visible: v.z > -1 && v.z < 1 };
}

function Earth() {
  const dayMap = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg');
  const bumpMap = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png');

  return (
    <group>
      <Sphere args={[GLOBE_RADIUS, 96, 96]}>
        <meshPhongMaterial
          map={dayMap}
          bumpMap={bumpMap}
          bumpScale={0.04}
          specular={new THREE.Color('#0a2540')}
          shininess={6}
          emissive={new THREE.Color('#001a2e')}
          emissiveIntensity={0.18}
        />
      </Sphere>

      {/* Atmosphere */}
      <mesh scale={[1.08, 1.08, 1.08]}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          vertexShader={`varying vec3 vNormal; void main(){ vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
          fragmentShader={`varying vec3 vNormal; void main(){ float i = pow(0.7 - dot(vNormal, vec3(0.0,0.0,1.0)), 3.5); gl_FragColor = vec4(0.0, 0.85, 1.0, 1.0) * i * 0.32; }`}
        />
      </mesh>

      {/* Subtle wireframe overlay */}
      <mesh scale={[1.003, 1.003, 1.003]}>
        <sphereGeometry args={[GLOBE_RADIUS, 36, 36]} />
        <meshBasicMaterial wireframe color="#00ff9f" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function RadarSweep() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.6; });

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segs = 64;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const a = (t * Math.PI) / 1.4;
      pts.push(new THREE.Vector3(Math.cos(a) * GLOBE_RADIUS * 1.005, 0, Math.sin(a) * GLOBE_RADIUS * 1.005));
    }
    return pts;
  }, []);

  return (
    <group ref={ref}>
      <Line points={points} color="#00ff9f" lineWidth={1.5} transparent opacity={0.55} />
      {/* trailing fade */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[GLOBE_RADIUS * 1.001, GLOBE_RADIUS * 1.012, 64, 1, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#00ff9f" transparent opacity={0.18} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const pos = useMemo(() => {
    const a = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      a[i * 3] = (Math.random() - 0.5) * 24;
      a[i * 3 + 1] = (Math.random() - 0.5) * 24;
      a[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return a;
  }, []);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.012; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#9feaff" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

interface Arc {
  id: number; from: number; to: number; type: 'attack' | 'sigint' | 'data';
  progress: number; speed: number; life: number; maxLife: number; color: string;
}

interface SceneProps {
  flow: FlowState;
  target: Hotspot | null;
  setOverlay: (pts: Array<{ id: number; x: number; y: number; visible: boolean }>) => void;
  setSignal: (n: number) => void;
  setRisk: (n: number) => void;
  setLinks: (n: number) => void;
  onZoomTarget: (h: Hotspot | null) => void;
}

function Scene({ flow, target, setOverlay, setSignal, setRisk, setLinks, onZoomTarget }: SceneProps) {
  const { camera, size } = useThree();
  const controls = useRef<OrbitControlsImpl | null>(null);
  const globe = useRef<THREE.Group>(null);
  const arcs = useRef<Arc[]>([]);
  const seq = useRef(0);
  const lastTarget = useRef<number | null>(null);

  const positions = useMemo(() => {
    const m = new Map<number, THREE.Vector3>();
    HOTSPOTS.forEach(h => m.set(h.id, latLonToVec3(h.lat, h.lon, GLOBE_RADIUS * 1.005)));
    return m;
  }, []);

  const spawnArc = useCallback((from: number, to: number) => {
    if (from === to) return;
    seq.current += 1;
    const r = Math.random();
    const type: Arc['type'] = r > 0.6 ? 'attack' : r > 0.3 ? 'sigint' : 'data';
    const color = type === 'attack' ? '#ff2d55' : type === 'sigint' ? '#00c3ff' : '#00ff9f';
    arcs.current.push({
      id: seq.current, from, to, type, color,
      progress: 0,
      speed: type === 'attack' ? 0.7 : 0.4,
      life: 3 + Math.random() * 2.5,
      maxLife: 3 + Math.random() * 2.5,
    });
    if (arcs.current.length > 50) arcs.current.splice(0, arcs.current.length - 50);
  }, []);

  // Spawn arcs continuously
  useEffect(() => {
    const i = window.setInterval(() => {
      const burst = flow === 'activity-spike' ? 6 : 2;
      for (let k = 0; k < burst; k++) {
        const a = HOTSPOTS[Math.floor(Math.random() * HOTSPOTS.length)].id;
        const b = HOTSPOTS[Math.floor(Math.random() * HOTSPOTS.length)].id;
        spawnArc(a, b);
      }
      setSignal(50 + Math.floor(Math.random() * 48));
      setLinks(arcs.current.length);
    }, flow === 'activity-spike' ? 900 : 1700);
    return () => clearInterval(i);
  }, [flow, spawnArc, setSignal, setLinks]);

  // Zoom timeline — runs whenever target changes to a new hotspot
  useEffect(() => {
    if (!target) {
      // pull back home
      gsap.killTweensOf(camera.position);
      gsap.to(camera.position, {
        duration: 2.2, x: 0, y: 0.3, z: 5.6, ease: 'power2.inOut',
        onUpdate: () => camera.lookAt(0, 0, 0),
      });
      if (controls.current) gsap.to(controls.current.target, { duration: 2.2, x: 0, y: 0, z: 0, ease: 'power2.inOut' });
      lastTarget.current = null;
      return;
    }
    if (lastTarget.current === target.id) return;
    lastTarget.current = target.id;

    const tp = positions.get(target.id);
    if (!tp) return;

    onZoomTarget(target);
    setRisk(target.threat === 'CRIT' ? 92 : target.threat === 'HIGH' ? 75 : target.threat === 'MED' ? 52 : 28);

    const camDest = tp.clone().normalize().multiplyScalar(3.4);
    gsap.killTweensOf(camera.position);
    gsap.timeline()
      .to(camera.position, {
        duration: 2.2, x: camDest.x, y: camDest.y, z: camDest.z, ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(tp),
      });

    if (controls.current) {
      gsap.to(controls.current.target, { duration: 2.2, x: tp.x * 0.4, y: tp.y * 0.4, z: tp.z * 0.4, ease: 'power3.inOut' });
    }

    // also fire some arcs into the target
    for (let i = 0; i < 5; i++) {
      const from = HOTSPOTS[Math.floor(Math.random() * HOTSPOTS.length)].id;
      spawnArc(from, target.id);
    }
  }, [target, camera, positions, setRisk, spawnArc, onZoomTarget]);

  useFrame((state, delta) => {
    if (globe.current && !target) {
      globe.current.rotation.y += delta * 0.04;
    }

    arcs.current = arcs.current
      .map(a => ({ ...a, progress: a.progress + a.speed * delta * 0.5, life: a.life - delta }))
      .filter(a => a.life > 0);

    const f = Math.floor(state.clock.elapsedTime * 60);
    if (f % 10 === 0) {
      const proj = HOTSPOTS.map(h => {
        const p = positions.get(h.id)!;
        const s = worldToScreen(p, camera, size.width, size.height);
        return { id: h.id, ...s };
      });
      setOverlay(proj);
    }
  });

  return (
    <>
      <fog attach="fog" args={['#000000', 6, 16]} />
      <ambientLight intensity={0.18} />
      <directionalLight intensity={1.1} color="#90c8ff" position={[4, 2, 3]} />
      <pointLight intensity={0.4} color="#00ff9f" position={[0, 0, 5]} />
      <Starfield />

      <group ref={globe}>
        <Earth />
        <RadarSweep />

        {HOTSPOTS.map(h => {
          const p = positions.get(h.id)!;
          const isTarget = target?.id === h.id;
          const c = threatColorMap[h.threat];
          return (
            <group key={h.id} position={p}>
              <mesh>
                <sphereGeometry args={[isTarget ? 0.05 : 0.032, 14, 14]} />
                <meshBasicMaterial color={c} />
              </mesh>
              <mesh scale={isTarget ? 1.6 : 1}>
                <sphereGeometry args={[0.07, 14, 14]} />
                <meshBasicMaterial color={c} transparent opacity={0.3} depthWrite={false} />
              </mesh>
            </group>
          );
        })}

        {arcs.current.map(a => {
          const from = positions.get(a.from);
          const to = positions.get(a.to);
          if (!from || !to) return null;
          const curve = getArcCurve(from, to, a.type === 'attack' ? 0.22 : 0.4);
          const pts = curve.getPoints(28);
          const packet = curve.getPoint(Math.min(1, a.progress));
          return (
            <group key={a.id}>
              <Line points={pts} color={a.color} lineWidth={a.type === 'attack' ? 1.4 : 1} transparent opacity={Math.max(0, (a.life / a.maxLife) * 0.75)} />
              <mesh position={packet}>
                <sphereGeometry args={[0.018, 8, 8]} />
                <meshBasicMaterial color={a.color} />
              </mesh>
            </group>
          );
        })}
      </group>

      <OrbitControls ref={controls} enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.22} maxPolarAngle={Math.PI * 0.78} rotateSpeed={0.4} />
    </>
  );
}

const Globe3D = () => {
  const [phase, setPhase] = useState(0);
  const flow = FLOW[phase];
  const [target, setTarget] = useState<Hotspot | null>(null);
  const [overlay, setOverlay] = useState<Array<{ id: number; x: number; y: number; visible: boolean }>>([]);
  const [signal, setSignal] = useState(67);
  const [risk, setRisk] = useState(54);
  const [links, setLinks] = useState(0);
  const [zoomedHotspot, setZoomedHotspot] = useState<Hotspot | null>(null);
  const [trackedAssets, setTrackedAssets] = useState<Asset[]>(() => {
    return [...ASSETS].sort(() => Math.random() - 0.5).slice(0, 7);
  });
  const reconIdx = useRef(0);

  // Randomize tracked assets list every few seconds
  useEffect(() => {
    const t = window.setInterval(() => {
      setTrackedAssets([...ASSETS].sort(() => Math.random() - 0.5).slice(0, 7));
    }, 5000);
    return () => clearInterval(t);
  }, []);


  // Phase progression
  useEffect(() => {
    const t = window.setTimeout(() => {
      setPhase(p => (p + 1) % FLOW.length);
    }, PHASE_MS[flow]);
    return () => clearTimeout(t);
  }, [flow]);

  // Phase → target mapping
  useEffect(() => {
    if (flow === 'target-acquisition') {
      const next = HOTSPOTS[Math.floor(Math.random() * HOTSPOTS.length)];
      reconIdx.current = (reconIdx.current + 1) % RECON.length;
      setTarget(next);
    } else if (flow === 'pull-back' || flow === 'global-idle') {
      setTarget(null);
      setZoomedHotspot(null);
    }
  }, [flow]);

  const handleZoomTarget = useCallback((h: Hotspot | null) => setZoomedHotspot(h), []);

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0.3, 5.6], fov: 46 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <Scene
          flow={flow}
          target={target}
          setOverlay={setOverlay}
          setSignal={setSignal}
          setRisk={setRisk}
          setLinks={setLinks}
          onZoomTarget={handleZoomTarget}
        />
      </Canvas>

      {/* HUD overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* node labels for active hotspots */}
        {overlay.map(o => {
          const h = HOTSPOTS[o.id];
          if (!h || !o.visible) return null;
          const isTarget = zoomedHotspot?.id === h.id;
          if (!isTarget && h.threat !== 'CRIT' && h.threat !== 'HIGH') return null;
          return (
            <div key={o.id} className="absolute font-data text-[9px] leading-tight"
              style={{ left: o.x + 10, top: o.y - 18, color: threatColorMap[h.threat] }}>
              <div className="font-bold">{h.label}</div>
              <div className="text-[8px] opacity-80">{h.classification} • {h.threat}</div>
            </div>
          );
        })}

        {/* Targeting reticle on zoom */}
        <AnimatePresence>
          {zoomedHotspot && overlay.find(o => o.id === zoomedHotspot.id)?.visible && (() => {
            const o = overlay.find(p => p.id === zoomedHotspot.id)!;
            return (
              <motion.div
                key={zoomedHotspot.id}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute" style={{ left: o.x, top: o.y, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 border border-cyber-red/80 animate-pulse-ring" />
                  <div className="absolute inset-3 border border-cyber-red/80" />
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-6 bg-cyber-red" />
                  <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-px h-6 bg-cyber-red" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-6 bg-cyber-red" />
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 h-px w-6 bg-cyber-red" />
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Recon PiP — bottom left */}
        <AnimatePresence>
          {zoomedHotspot && (
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="absolute left-3 bottom-3 w-[260px] border border-cyber-amber/40 bg-black/95 shadow-[0_0_25px_hsl(var(--accent-amber)/0.18)]"
            >
              <div className="flex items-center justify-between border-b border-cyber-amber/30 bg-black px-2 py-1">
                <span className="font-data text-[10px] tracking-[0.2em] text-cyber-amber">SAT FEED // KH-11</span>
                <span className="flex items-center gap-1 text-[9px] font-data text-cyber-red">
                  <span className="w-1.5 h-1.5 bg-cyber-red rounded-full animate-blink-dot" />
                  REC
                </span>
              </div>
              <div className="relative aspect-video bg-black overflow-hidden">
                <img src={RECON[reconIdx.current]} alt="recon feed" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)' }} />
                <div className="absolute top-1 left-1 font-data text-[8px] text-cyber-amber/90">{zoomedHotspot.label}</div>
                <div className="absolute top-1 right-1 font-data text-[8px] text-cyber-amber/90">
                  {zoomedHotspot.lat.toFixed(3)}°N {zoomedHotspot.lon.toFixed(3)}°E
                </div>
                <div className="absolute bottom-1 left-1 font-data text-[8px] text-cyber-red">CONF {Math.floor((signal + risk) / 2)}%</div>
                <div className="absolute bottom-1 right-1 font-data text-[8px] text-cyber-amber">THR {zoomedHotspot.threat}</div>
              </div>
              <div className="grid grid-cols-3 gap-px bg-cyber-amber/20">
                {[
                  ['ALT', '1,240 FT'],
                  ['SPD', '148 KTS'],
                  ['ETA', '02:14'],
                ].map(([k, v]) => (
                  <div key={k} className="bg-black/95 px-1.5 py-1">
                    <div className="font-data text-[8px] text-muted-foreground">{k}</div>
                    <div className="font-data text-[10px] text-cyber-amber">{v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tracked assets — bottom right */}
        <div className="absolute right-3 bottom-3 w-[280px] border border-cyber-green/30 bg-black/95 hidden md:block">
          <div className="flex items-center justify-between border-b border-cyber-green/25 bg-black px-2 py-1">
            <span className="font-data text-[10px] tracking-[0.2em] text-cyber-green">// ASSETS TRACKED</span>
            <span className="font-data text-[9px] text-cyber-green/60">{trackedAssets.length} ACTIVE</span>
          </div>
          <div className="max-h-[180px] overflow-hidden">
            {trackedAssets.map(a => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="px-2 py-1 border-b border-cyber-green/10 flex items-center justify-between text-[9px] font-data hover:bg-cyber-green/5"
              >
                <div className="min-w-0">
                  <div className="text-cyber-green truncate">{a.id}</div>
                  <div className="text-cyber-green/50 text-[8px]">{a.type} • {a.alt}</div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <div className={a.status === 'TRACKING' || a.status === 'COLLECTING' || a.status === 'SILENT RUN' ? 'text-cyber-red' : 'text-cyber-green/70'}>
                    {a.status}
                  </div>
                  <div className="text-cyber-green/40 text-[8px]">{a.spd}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right intel summary on zoom */}
        <AnimatePresence>
          {zoomedHotspot && (
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
              className="absolute right-3 top-3 w-[240px] border border-cyber-green/30 bg-black/90 p-2 font-data text-[10px] hidden lg:block"
            >
              <div className="text-cyber-green tracking-[0.2em] mb-1">TGT INTEL</div>
              <div className="text-cyber-green/80">LABEL: {zoomedHotspot.label}</div>
              <div className="text-cyber-blue">SIG: {signal}%</div>
              <div className="text-cyber-red">RISK: {risk}%</div>
              <div className="text-cyber-purple">LINKS: {links}</div>
              <div className="text-cyber-amber">CLASS: {zoomedHotspot.classification}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Globe3D;
