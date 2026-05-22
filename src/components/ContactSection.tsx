import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, MapPin, Clock, Send, Loader2, Check } from 'lucide-react';
import { z } from 'zod';
import { motion } from 'framer-motion';
import TacticalPanel from '@/components/TacticalPanel';
import GlitchText from '@/components/GlitchText';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  query: z.string().trim().min(1, 'Message is required').max(2000),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', query: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({ name: result.data.name, email: result.data.email, query: result.data.query });
      if (dbError) throw dbError;
      toast({ title: 'TRANSMISSION RECEIVED', description: 'Encrypted message logged to secure channel.' });
      setFormData({ name: '', email: '', query: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({ title: 'Error', description: 'Failed to send message. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
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
            <span className="font-data text-[10px] tracking-[0.25em] text-cyber-green/60">SECURE COMMS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-tactical tracking-[0.08em] text-cyber-green uppercase">
            <GlitchText intensity="med">SECURE COMMS</GlitchText>
          </h2>
          <div className="mt-3 mx-auto w-40 h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent animate-pulse" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <TacticalPanel title="SECURE CHANNEL ESTABLISHED" subtitle="HANDSHAKE :: AES-256-GCM" variant="green" live poweron contentClassName="p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyber-green animate-pulse-ring" />
                  <span className="font-data text-[10px] text-cyber-green tracking-wider">CLIENT</span>
                </div>
                <div className="relative flex-1 h-px border-t border-dashed border-cyber-green/40 overflow-hidden">
                  <div className="absolute top-0 left-0 h-px w-1/3 bg-cyber-green animate-[scan-sweep_2s_linear_infinite]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-data text-[10px] text-cyber-green tracking-wider">SOTANIK</span>
                  <div className="w-3 h-3 rounded-full bg-cyber-green animate-pulse-ring" />
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { icon: Mail, label: 'EMAIL CHANNEL', val: 'team@sotanikai.in', href: 'mailto:team@sotanikai.in' },
                  { icon: Clock, label: 'RESPONSE WINDOW', val: '< 24H' },
                  { icon: MapPin, label: 'OPS COVERAGE', val: 'GLOBAL // 24/7' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 border border-cyber-green/15 px-3 py-2 hover:border-cyber-green/40 transition">
                    <item.icon className="w-4 h-4 text-cyber-green shrink-0" />
                    <div className="font-data text-[9px] text-cyber-green/50 w-32">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="font-data text-[11px] text-cyber-green hover:text-cyber-amber transition">{item.val}</a>
                    ) : (
                      <span className="font-data text-[11px] text-cyber-green">{item.val}</span>
                    )}
                  </div>
                ))}
              </div>
            </TacticalPanel>

            <TacticalPanel title="OPSEC CHECKLIST" subtitle="PRE-TRANSMIT VERIFICATION" variant="amber" poweron contentClassName="p-4">
              <ul className="space-y-1.5">
                {['PGP KEY ACTIVE', 'VPN TUNNEL ESTABLISHED', 'TOR ROUTING VERIFIED', 'SESSION ENCRYPTED', 'METADATA STRIPPED'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-data text-[10px]">
                    <Check className="w-3 h-3 text-cyber-green" />
                    <span className="text-cyber-green/90">{item}</span>
                    <div className="flex-1 h-px border-t border-dashed border-cyber-green/15" />
                    <span className="text-cyber-green text-[9px]">OK</span>
                  </li>
                ))}
              </ul>
            </TacticalPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <TacticalPanel title="TRANSMIT MESSAGE" subtitle="ENCRYPTED FORM // E2EE" variant="green" classified="TS" live poweron contentClassName="p-5">
              <form onSubmit={handleSubmit} className="space-y-4 font-data">
                <div>
                  <label htmlFor="name" className="block text-[10px] tracking-[0.2em] text-cyber-green/60 mb-1">CALLSIGN / NAME</label>
                  <Input
                    id="name" name="name" type="text" placeholder="> ENTER NAME"
                    value={formData.name} onChange={handleChange}
                    className={`bg-black border border-cyber-green/30 text-cyber-green font-data placeholder:text-cyber-green/30 focus:border-cyber-green rounded-none ${errors.name ? 'border-cyber-red' : ''}`}
                  />
                  {errors.name && <p className="text-cyber-red text-[10px] mt-1">› {errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] tracking-[0.2em] text-cyber-green/60 mb-1">RETURN ADDRESS</label>
                  <Input
                    id="email" name="email" type="email" placeholder="> name@domain"
                    value={formData.email} onChange={handleChange}
                    className={`bg-black border border-cyber-green/30 text-cyber-green font-data placeholder:text-cyber-green/30 focus:border-cyber-green rounded-none ${errors.email ? 'border-cyber-red' : ''}`}
                  />
                  {errors.email && <p className="text-cyber-red text-[10px] mt-1">› {errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="query" className="block text-[10px] tracking-[0.2em] text-cyber-green/60 mb-1">PAYLOAD</label>
                  <Textarea
                    id="query" name="query" placeholder="> Describe operational requirement..."
                    rows={5} value={formData.query} onChange={handleChange}
                    className={`bg-black border border-cyber-green/30 text-cyber-green font-data placeholder:text-cyber-green/30 focus:border-cyber-green resize-none rounded-none ${errors.query ? 'border-cyber-red' : ''}`}
                  />
                  {errors.query && <p className="text-cyber-red text-[10px] mt-1">› {errors.query}</p>}
                </div>
                <Button type="submit" variant="cyberFilled" size="lg" className="w-full font-data tracking-[0.18em] rounded-none" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" />TRANSMITTING...</>
                  ) : (
                    <><Send className="w-4 h-4" />TRANSMIT ENCRYPTED MESSAGE</>
                  )}
                </Button>
              </form>
            </TacticalPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
