import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact — SoTaNik AI</title>
        <meta name="description" content="Contact SoTaNik AI for inquiries, assessments and partnership." />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Contact;
