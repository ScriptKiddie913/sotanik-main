import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const links = [
    { name: 'SERVICES', to: '/services' },
    { name: 'ABOUT', to: '/about' },
    { name: 'LABS', to: '/labs' },
    { name: 'CONTACT', to: '/contact' },
  ];

  const h = String(Math.floor(time / 3600)).padStart(2, '0');
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 border-b border-cyber-green/30' : 'bg-black/70 border-b border-cyber-green/15'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="SoTaNik AI" className="w-8 h-8 object-contain group-hover:drop-shadow-[0_0_10px_hsl(157,100%,50%)] transition" />
            <div className="leading-tight">
              <div className="font-tactical text-sm text-cyber-green">SOTANIK AI</div>
              <div className="font-data text-[8px] text-cyber-green/50 flex items-center gap-1">
                <span className="w-1 h-1 bg-cyber-green rounded-full animate-blink-dot" /> SYSTEMS ONLINE
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.name} to={l.to}
                className="px-3 py-1.5 font-data text-[10px] tracking-[0.18em] text-cyber-green/70 hover:text-cyber-green hover:bg-cyber-green/5 border border-transparent hover:border-cyber-green/30 transition">
                {l.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 font-data text-[9px] text-cyber-amber">
            <Lock className="w-3 h-3" />
            <span>OPERATOR ECHO-6</span>
          </div>

          <button className="lg:hidden p-2 text-cyber-green border border-cyber-green/30" onClick={() => setOpen(!open)}>
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden py-2 border-t border-cyber-green/20">
            {links.map(l => (
              <Link key={l.name} to={l.to} onClick={() => setOpen(false)}
                className="block py-2 px-2 font-data text-[11px] tracking-[0.18em] text-cyber-green/80 hover:text-cyber-green border-b border-cyber-green/10">
                {l.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
