import Navbar from '@/components/Navbar';
import HowItWorksSection from '@/components/HowItWorksSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About — SoTaNik AI</title>
        <meta name="description" content="About SoTaNik AI — mission, how we work, and platform features." />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <HowItWorksSection />
        <FeaturesSection />
        <Footer />
      </main>
    </>
  );
};

export default About;
