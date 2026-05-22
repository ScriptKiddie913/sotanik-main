import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services — SoTaNik AI</title>
        <meta name="description" content="SoTaNik AI services: OSINT, dark web monitoring, AI pentesting and more." />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <ServicesSection />
        <Footer />
      </main>
    </>
  );
};

export default Services;
