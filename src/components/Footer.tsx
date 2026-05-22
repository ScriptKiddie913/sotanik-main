const Footer = () => {
  return (
    <footer className="border-t border-cyber-green/25 bg-black mt-12">
      <div className="container mx-auto px-4 py-6 flex items-center justify-center">
        <div className="font-data text-[10px] text-cyber-green/70 tracking-[0.2em]">
          © {new Date().getFullYear()} SOTANIK AI
        </div>
      </div>
    </footer>
  );
};

export default Footer;
