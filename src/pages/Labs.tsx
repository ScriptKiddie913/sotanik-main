import Navbar from '@/components/Navbar';
import LabsSection from '@/components/LabsSection';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Labs = () => {
  return (
    <>
      <Helmet>
        <title>Labs — SoTaNik AI</title>
        <meta name="description" content="SoTaNik AI Labs – experimental tooling, research and beta projects." />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <LabsSection />
        <Footer />
      </main>
    </>
  );
};

export default Labs;
