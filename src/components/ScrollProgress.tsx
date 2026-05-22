import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleY, transformOrigin: 'top' }}
      className="fixed left-0 top-0 w-[2px] h-screen bg-cyber-green z-[9999] pointer-events-none"
      aria-hidden
    />
  );
};

export default ScrollProgress;