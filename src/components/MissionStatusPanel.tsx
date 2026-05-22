import TacticalPanel from './TacticalPanel';

const MISSIONS = [
  { id: 'OP-NIGHTFALL', phase: 'DISSEMINATION', progress: 82, threat: 'HIGH' as const },
  { id: 'OP-IRON-VEIL', phase: 'ANALYSIS', progress: 47, threat: 'CRIT' as const },
  { id: 'OP-QUIET-STORM', phase: 'COLLECTION', progress: 23, threat: 'MED' as const },
  { id: 'OP-DARKWATER', phase: 'EXPLOITATION', progress: 65, threat: 'HIGH' as const },
  { id: 'OP-GHOST-SIGNAL', phase: 'PLANNING', progress: 8, threat: 'LOW' as const },
];

const phaseColor: Record<string, string> = {
  PLANNING: 'text-muted-foreground',
  COLLECTION: 'text-cyber-blue',
  EXPLOITATION: 'text-cyber-amber',
  ANALYSIS: 'text-cyber-purple',
  DISSEMINATION: 'text-cyber-green',
};

const threatColor: Record<string, string> = {
  LOW: 'text-cyber-green', MED: 'text-cyber-amber', HIGH: 'text-orange-400', CRIT: 'text-cyber-red',
};

const barColor: Record<string, string> = {
  LOW: 'bg-cyber-green', MED: 'bg-cyber-amber', HIGH: 'bg-orange-400', CRIT: 'bg-cyber-red',
};

const MissionStatusPanel = () => (
  <TacticalPanel title="MISSION STATUS" subtitle="CONCURRENT OPERATIONS" variant="amber" live classified="SECRET">
    <div className="space-y-2.5">
      {MISSIONS.map(m => (
        <div key={m.id} className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-data">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-amber animate-blink-dot" />
              <span className="text-cyber-amber">{m.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={phaseColor[m.phase]}>{m.phase}</span>
              <span className={`${threatColor[m.threat]} font-bold`}>{m.threat}</span>
              <span className="text-muted-foreground">{m.progress}%</span>
            </div>
          </div>
          <div className="h-[3px] bg-black border border-cyber-green/15">
            <div className={`h-full ${barColor[m.threat]} transition-all`} style={{ width: `${m.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  </TacticalPanel>
);

export default MissionStatusPanel;
