import { Scan, Brain, AlertTriangle, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import TacticalPanel from '@/components/TacticalPanel';
import GlitchText from '@/components/GlitchText';

const steps = [
  { number: '01', icon: Scan, phase: 'COLLECTION', title: 'Data Collection', description: 'Our AI continuously scans dark web markets, breach forums, Telegram channels, and OSINT sources to gather threat intelligence.' },
  { number: '02', icon: Brain, phase: 'ANALYSIS', title: 'AI Analysis', description: 'Advanced machine learning algorithms process and correlate data to identify threats, leaked credentials, and vulnerabilities.' },
  { number: '03', icon: AlertTriangle, phase: 'DETECTION', title: 'Threat Detection', description: 'Real-time alerts are generated when we detect mentions of your organization, leaked data, or critical vulnerabilities.' },
  { number: '04', icon: FileCheck, phase: 'DISSEMINATION', title: 'Actionable Reports', description: 'Receive detailed intelligence reports with prioritized recommendations and remediation guidance.' },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="classification-ts">TS//SCI</span>
            <span className="font-data text-[10px] tracking-[0.25em] text-cyber-purple/80">PIPELINE FLOW</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-tactical tracking-[0.08em] text-cyber-green uppercase">
            <GlitchText intensity="med">INTELLIGENCE PIPELINE</GlitchText>
          </h2>
          <div className="mt-3 mx-auto w-40 h-px bg-gradient-to-r from-transparent via-cyber-purple to-transparent animate-pulse" />
        </motion.div>

        <div className="relative">
          {/* connecting dashed line */}
          <div className="hidden lg:block absolute top-[88px] left-0 right-0 h-px border-t border-dashed border-cyber-green/30" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* hex node above */}
                <div className="flex justify-center mb-4 relative">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-cyber-green/60">
                      <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="hsl(0 0% 0% / 0.9)" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <step.icon className="w-6 h-6 text-cyber-green relative z-10" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-green rounded-full animate-blink-dot" />
                  </div>
                </div>

                <TacticalPanel
                  title={step.phase}
                  subtitle={`PHASE ${step.number}`}
                  variant={index === 0 ? 'green' : index === 1 ? 'blue' : index === 2 ? 'amber' : 'purple'}
                  poweron
                  contentClassName="p-4"
                >
                  <h3 className="text-base font-tactical tracking-wider text-cyber-green mb-2">{step.title.toUpperCase()}</h3>
                  <p className="text-muted-foreground text-xs font-data leading-relaxed">{step.description}</p>
                  <div className="mt-3 flex items-center justify-between font-data text-[9px] text-cyber-green/50">
                    <span>SYS-LOAD</span>
                    <div className="flex-1 mx-2 h-px border-t border-dashed border-cyber-green/30" />
                    <span className="text-cyber-green">{40 + index * 12}%</span>
                  </div>
                </TacticalPanel>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16"
        >
          <TacticalPanel title="INTELLIGENCE SOURCES // INGEST FEEDS" variant="green" live poweron>
            <div className="flex flex-wrap gap-2">
              {[
                'Breach Forums', 'Dark Web Markets', 'Telegram Groups', 'Paste Sites',
                'Social Media', 'WHOIS Data', 'DNS Records', 'Public Archives',
                'Code Repositories', 'Threat Feeds',
              ].map((source, index) => (
                <span
                  key={index}
                  className="px-3 py-1 border border-cyber-green/25 bg-black/50 font-data text-[10px] tracking-wider text-cyber-green/80 hover:border-cyber-green hover:text-cyber-green hover:bg-cyber-green/5 transition-all"
                >
                  {source.toUpperCase()}
                </span>
              ))}
            </div>
          </TacticalPanel>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
