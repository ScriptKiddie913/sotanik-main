import { Zap, Clock, Shield, BarChart3, Users, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import TacticalPanel from '@/components/TacticalPanel';
import GlitchText from '@/components/GlitchText';

const features = [
  { icon: Zap, mid: 'MOD-ALERT-01', title: 'Real-Time Alerts', description: 'Instant notifications when your data appears in breaches or dark web discussions.' },
  { icon: Clock, mid: 'MOD-WATCH-02', title: '24/7 Monitoring', description: 'Continuous surveillance of threat landscapes without human intervention.' },
  { icon: Shield, mid: 'MOD-PEN-03', title: 'Automated Pentesting', description: 'AI-driven vulnerability discovery and exploitation testing at scale.' },
  { icon: BarChart3, mid: 'MOD-RISK-04', title: 'Risk Scoring', description: 'Prioritized vulnerability reports with contextual risk assessments.' },
  { icon: Users, mid: 'MOD-CRED-05', title: 'Credential Monitoring', description: 'Track leaked credentials and compromised accounts across your organization.' },
  { icon: Globe2, mid: 'MOD-GLOBAL-06', title: 'Global Coverage', description: 'Intelligence from forums and markets across multiple languages and regions.' },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="container relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="classification-ts">TS//SCI</span>
              <span className="font-data text-[10px] tracking-[0.25em] text-cyber-blue">SYSTEM MODULES</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-tactical tracking-[0.08em] text-cyber-green uppercase mb-4">
              <GlitchText intensity="med">PLATFORM ARCHITECTURE</GlitchText>
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-cyber-blue to-transparent mb-5" />
            <p className="text-muted-foreground font-data text-sm leading-relaxed">
              Multi-domain modules operate in concert — OSINT collection, dark-web SIGINT, automated red-team operations, and AI-assisted triage — unified under a single classified analyst console.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <TacticalPanel title="SOTANIK :: TERMINAL SESSION" subtitle="OPERATOR ECHO-6 // PTY/0" variant="green" live classified="TS" poweron contentClassName="p-4 font-data text-[12px]">
              <div className="space-y-1.5">
                <p><span className="text-cyber-green">$</span> <span className="text-foreground">sotanik --init</span></p>
                <p className="text-muted-foreground">[*] Initializing OSINT transforms....</p>
                <p className="text-muted-foreground">[*] Scanning dark web sources....</p>
                <p className="text-muted-foreground">[*] Running vulnerability assessment....</p>
                <p className="text-cyber-green">[+] Found 14 critical vulnerabilities</p>
                <p className="text-cyber-amber">[!] Detected 3 credential leaks</p>
                <p className="text-cyber-blue">[✓] Report generated: BUG5_F0unD.pdf</p>
                <p className="text-cyber-green flex items-center gap-1">
                  <span>$</span><span className="w-1.5 h-3 bg-cyber-green animate-blink-dot" />
                </p>
              </div>
            </TacticalPanel>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <TacticalPanel
                title={feature.title.toUpperCase()}
                subtitle={feature.mid}
                variant="blue"
                poweron
                contentClassName="p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 p-2 border border-cyber-blue/40 bg-cyber-blue/5">
                    <feature.icon className="w-4 h-4 text-cyber-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs font-data leading-relaxed">{feature.description}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 font-data text-[9px] text-cyber-green/60">
                      <div className="flex justify-between border border-cyber-green/15 px-1.5 py-0.5">
                        <span>CPU</span><span className="text-cyber-green">{20 + (index * 9) % 60}%</span>
                      </div>
                      <div className="flex justify-between border border-cyber-green/15 px-1.5 py-0.5">
                        <span>MEM</span><span className="text-cyber-blue">{30 + (index * 7) % 50}%</span>
                      </div>
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

export default FeaturesSection;
