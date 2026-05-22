import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HomeOverview from '@/components/HomeOverview';
import Footer from '@/components/Footer';
import CircuitDivider from '@/components/CircuitDivider';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SoTaNik AI — Global Threat Intelligence Operations Center</title>
        <meta name="description" content="SoTaNik AI: AI-powered OSINT, dark web monitoring, and automated penetration testing. Defense-grade threat intelligence platform." />
      </Helmet>

      <main className="min-h-screen relative">
        <Navbar />
        <div className="pt-[56px]">
          <HeroSection />
          <CircuitDivider variant="green" />
          <HomeOverview />
          <CircuitDivider variant="blue" />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Index;
