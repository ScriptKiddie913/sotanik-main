import { motion } from 'framer-motion';
import { Beaker, Code2, Database, Users, Lock } from 'lucide-react';
import TacticalPanel from '@/components/TacticalPanel';
import GlitchText from '@/components/GlitchText';

const labs = [
  { icon: Beaker, code: 'LAB-RECON-01', cls: 'TS//SCI', title: 'Beta: Automated Recon', description: 'A research-grade reconnaissance pipeline for rapid asset and exposure mapping. Available to vetted partners.', variant: 'green' as const },
  { icon: Code2, code: 'LAB-PLAY-02', cls: 'SECRET', title: 'Tooling Playground', description: 'Interactive demos and sandboxed tools for testing payload detection, classifier models and IoC enrichment.', variant: 'blue' as const },
  { icon: Database, code: 'LAB-DATA-03', cls: 'TS', title: 'Data Lab', description: 'Secure datasets and experiment logs for internal model tuning and evaluation.', variant: 'purple' as const },
  { icon: Users, code: 'LAB-PART-04', cls: 'SECRET', title: 'Collaboration', description: 'Partner programs and responsible disclosure channels for working with our research team.', variant: 'amber' as const },
];

const LabsSection = () => {
  return (
    <section id="labs" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none">
        <div className="font-tactical text-[80px] md:text-[140px] tracking-[0.2em] text-cyber-red/[0.04] rotate-[-12deg]">
          ABOVE TOP SECRET
        </div>
      </div>

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="classification-ts">TS//SCI//NOFORN</span>
            <span className="font-data text-[10px] tracking-[0.25em] text-cyber-purple">CLEARANCE REQUIRED</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-tactical tracking-[0.08em] text-cyber-green uppercase">
            <GlitchText intensity="high">R&D SKUNKWORKS</GlitchText>
          </h2>
          <div className="mt-3 mx-auto w-40 h-px bg-gradient-to-r from-transparent via-cyber-purple to-transparent animate-pulse" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {labs.map((lab, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <TacticalPanel
                title={lab.title.toUpperCase()}
                subtitle={`${lab.code} // ${lab.cls}`}
                variant={lab.variant}
                live
                poweron
                contentClassName="p-5"
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 p-3 border border-cyber-${lab.variant}/40 bg-cyber-${lab.variant}/5`}>
                    <lab.icon className={`w-6 h-6 text-cyber-${lab.variant}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm font-data leading-relaxed mb-3">{lab.description}</p>
                    <div className="flex items-center gap-2 font-data text-[10px] text-cyber-green/60">
                      <Lock className="w-3 h-3 text-cyber-amber" />
                      <span className="text-cyber-amber">CLEARANCE LOCKED</span>
                      <div className="flex-1 h-px border-t border-dashed border-cyber-green/20" />
                      <span>REQ ACCESS</span>
                    </div>
                  </div>
                </div>
              </TacticalPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsSection;
