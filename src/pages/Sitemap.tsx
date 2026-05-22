import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sitemapLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Labs", to: "/labs" },
  { label: "Contact", to: "/contact" },
];

const Sitemap = () => {
  return (
    <>
      <Helmet>
        <title>Sitemap — SoTaNik AI</title>
        <meta name="description" content="Sitemap for SoTaNik AI public pages." />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="container mx-auto px-4 pt-24 pb-10">
          <h1 className="font-tactical text-2xl md:text-3xl text-cyber-green tracking-[0.08em]">SITEMAP</h1>
          <ul className="mt-6 space-y-3 font-data text-sm tracking-[0.12em]">
            {sitemapLinks.map((item) => (
              <li key={item.to}>
                <Link className="text-cyber-green/80 hover:text-cyber-green" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Sitemap;
