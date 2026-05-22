import { Search, Shield, Globe, Database, Lock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import TacticalPanel from '@/components/TacticalPanel';
import GlitchText from '@/components/GlitchText';

const services = [
  { icon: Search, title: 'OSINT Intelligence', code: 'CAP-OSINT-01', cls: 'TS' as const, status: 'ACTIVE',
    description: 'Comprehensive open-source intelligence gathering from social media, public records, and digital footprints.',
    features: ['Social Media Analysis', 'Domain Intelligence', 'Email Reconnaissance'], variant: 'green' as const },
  { icon: Globe, title: 'Dark Web Monitoring', code: 'CAP-DARK-02', cls: 'TS' as const, status: 'ACTIVE',
    description: 'Real-time surveillance of dark web markets, forums, and channels for leaked credentials and data breaches.',
    features: ['Breach Forums Tracking', 'Telegram Monitoring', 'Market Surveillance'], variant: 'purple' as const },
  { icon: Shield, title: 'AI Penetration Testing', code: 'CAP-PEN-03', cls: 'SECRET' as const, status: 'ACTIVE',
    description: 'Automated vulnerability assessment and exploitation testing powered by advanced machine learning.',
    features: ['Automated Scanning', 'Exploit Detection', 'Risk Assessment'], variant: 'blue' as const },
  { icon: Database, title: 'Data Leak Detection', code: 'CAP-LEAK-04', cls: 'SECRET' as const, status: 'ACTIVE',
    description: "Continuous monitoring for your organization's sensitive data across leak sites and paste bins.",
    features: ['Credential Monitoring', 'Document Tracking', 'PII Detection'], variant: 'green' as const },
  { icon: Lock, title: 'Vulnerability Assessment', code: 'CAP-VULN-05', cls: 'SECRET' as const, status: 'STANDBY',
    description: 'Comprehensive security audits identifying weaknesses in your infrastructure and applications.',
    features: ['Web App Testing', 'Network Scanning', 'API Security'], variant: 'amber' as const },
  { icon: Eye, title: 'Threat Intelligence', code: 'CAP-INTEL-06', cls: 'TS' as const, status: 'ACTIVE',
    description: 'Proactive threat hunting and intelligence reports on emerging cyber threats targeting your sector.',
    features: ['APT Tracking', 'IoC Feeds', 'Threat Reports'], variant: 'red' as const },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="classification-ts">TS//SCI</span>
            <span className="font-data text-[10px] tracking-[0.25em] text-cyber-green/60">CAPABILITIES MATRIX</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-tactical tracking-[0.08em] text-cyber-green uppercase">
            <GlitchText intensity="med">CAPABILITIES MATRIX</GlitchText>
          </h2>
          <div className="mt-3 mx-auto w-40 h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent animate-pulse" />
          <p className="text-muted-foreground text-sm mt-5 font-data tracking-wide">
            // TIER-1 COLLECTION ASSETS &nbsp; • &nbsp; ANALYSIS PLATFORMS &nbsp; • &nbsp; ACTIVE DEPLOYMENTS
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <TacticalPanel
                title={service.title.toUpperCase()}
                subtitle={`${service.code} // LAST DEPLOYED ${new Date(Date.now() - index * 86400000 * 3).toISOString().slice(0, 10)}`}
                variant={service.variant}
                classified={service.cls}
                live={service.status === 'ACTIVE'}
                poweron
                contentClassName="p-5"
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 p-3 border border-cyber-${service.variant}/40 bg-cyber-${service.variant}/5 shadow-[0_0_20px_hsl(var(--accent-${service.variant === 'green' ? 'green' : service.variant === 'amber' ? 'amber' : service.variant === 'red' ? 'red' : service.variant === 'blue' ? 'blue' : 'purple'})/0.2)]`}>
                    <service.icon className={`w-6 h-6 text-cyber-${service.variant}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 font-data text-[9px]">
                      <span className={`px-1.5 py-0.5 border border-cyber-${service.variant}/40 text-cyber-${service.variant}`}>
                        STATUS: {service.status}
                      </span>
                      <span className="text-cyber-green/40">UPTIME 99.9%</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 font-data leading-relaxed">{service.description}</p>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2 font-data text-[11px] text-cyber-green/80">
                          <span className={`w-1 h-3 bg-cyber-${service.variant}`} />
                          <span>{feature}</span>
                          <span className="ml-auto text-cyber-green/30 text-[9px]">› ENGAGED</span>
                        </li>
                      ))}
                    </ul>
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

export default ServicesSection;
