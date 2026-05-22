import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Gauge } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7 },
};

const HomeOverview = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-muted/20 to-black pointer-events-none" />
      <div className="container relative z-10 px-6">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-neon-green font-mono text-sm tracking-wider uppercase">Platform Overview</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-heading">
            Enterprise-Grade <span className="text-gradient-cyber">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            SoTaNik AI delivers autonomous threat intelligence and automated penetration testing.
            Our platform correlates OSINT, dark web signals, and telemetry for actionable insights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Activity,
              title: 'Core Capabilities',
              items: ['Dark web & breach monitoring at scale', 'Automated vulnerability discovery', 'Threat prioritization & remediation'],
              color: 'neon-green',
            },
            {
              icon: ShieldCheck,
              title: 'Compliance & Security',
              items: ['Responsible disclosure practices', 'End-to-end encryption', 'Role-based access control'],
              color: 'neon-blue',
            },
            {
              icon: Gauge,
              title: 'Proven Results',
              items: ['Reduced exposure time by 95%', 'Real-time alerting pipeline', 'Low mean time to remediation'],
              color: 'neon-purple',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group glass-panel rounded-2xl p-6 hover:neon-border transition-all duration-500"
            >
              <div className={`inline-flex p-3 rounded-xl bg-${card.color}/10 border border-${card.color}/20 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className={`w-6 h-6 text-${card.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">{card.title}</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${card.color}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 glass-panel-strong rounded-2xl p-8 text-center"
        >
          <h4 className="font-semibold mb-6 font-heading text-lg">Live Intelligence Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '10M+', label: 'Data points analyzed daily', color: 'text-neon-green' },
              { value: '500+', label: 'Dark web sources monitored', color: 'text-neon-blue' },
              { value: '99.7%', label: 'Threat detection rate', color: 'text-neon-purple' },
              { value: '<5min', label: 'Average response time', color: 'text-neon-green' },
            ].map((stat, i) => (
              <div key={i}>
                <div className={`text-2xl md:text-3xl font-bold ${stat.color} font-heading`}>
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeOverview;
