import { lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Globe3D = lazy(() => import('@/components/Globe3D'));

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

      {/* 3D Globe */}
      <div className="absolute inset-0 opacity-70">
        <Suspense fallback={null}>
          <Globe3D />
        </Suspense>
      </div>

      {/* Volumetric light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-green/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-blue/5 blur-[100px] pointer-events-none" />

      {/* Volumetric light beams */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[-30, -15, 15].map((deg, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2 w-[200px] h-[140vh] origin-top"
            style={{
              background: 'linear-gradient(to bottom, transparent, hsl(157 100% 50% / 0.05), transparent)',
              transform: `translateX(-50%) rotate(${deg}deg)`,
              animation: `beamDrift 8s ease-in-out ${i * 2.5}s infinite alternate`,
            }}
          />
        ))}
        <div
          className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 600, height: 300,
            background: 'radial-gradient(ellipse, hsl(157 100% 50% / 0.08) 0%, transparent 70%)',
            animation: 'beamBloom 4s ease-in-out infinite',
          }}
        />
      </div>
      <style>{`
        @keyframes beamDrift { 0% { transform: translateX(calc(-50% - 30px)) rotate(var(--r,0deg)); opacity: 0.3 } 100% { transform: translateX(calc(-50% + 30px)) rotate(var(--r,0deg)); opacity: 0.7 } }
        @keyframes beamBloom { 0%,100% { opacity: 0.5 } 50% { opacity: 1 } }
      `}</style>

      <div className="container relative z-10 px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel neon-border mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-mono text-neon-green">Global Intelligence Active</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-heading"
          >
            <span className="text-foreground">Autonomous </span>
            <span className="text-gradient-cyber glow-text">Threat Intelligence</span>
            <br />
            <span className="text-foreground">& </span>
            <span className="text-neon-green">Penetration Testing</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            Harness the power of AI to monitor dark web markets, breach forums, and leak channels. 
            Automatically discover vulnerabilities before attackers do.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              variant="cyberFilled"
              size="xl"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group"
            >
              <Shield className="w-5 h-5 group-hover:animate-pulse" />
              Request Demo
            </Button>

            <Button
              variant="cyber"
              size="xl"
              onClick={() => window.location.href = 'https://osinthub.sotanikai.online'}
            >
              <Terminal className="w-5 h-5" />
              Explore Services
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { value: '10M+', label: 'Data Points Analyzed Daily' },
              { value: '500+', label: 'Dark Web Sources' },
              { value: '99.7%', label: 'Threat Detection Rate' },
              { value: '<5min', label: 'Average Response Time' },
            ].map((stat, index) => (
              <div key={index} className="group rounded-xl p-4 border border-cyber-green/15 bg-transparent backdrop-blur-[1px] hover:border-cyber-green/40 hover:bg-cyber-green/[0.02] transition-all duration-500">
                <div className="text-2xl md:text-3xl font-bold text-neon-green font-heading group-hover:glow-text transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
