import React from "react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import Hero from "../components/layout/Hero";
import AboutSection from "../components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import InterludeSection from "../components/InterludeSection";
import TrustSection from "../components/trust/TrustSection";
import FAQSection from "../components/sections/FAQSection";
import EcosystemSection from "../sections/ecosystem/EcosystemSection";
import ContactSection from "../components/sections/ContactSection";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#EDEAE2]">
      <Header />

      <main className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl space-y-12 sm:space-y-16 lg:space-y-20">
          <Hero />

          {/* смысловой блок — коротко, без “умничания” */}
          <AboutSection />

          <ServicesSection />
          <InterludeSection />

          <TrustSection />

          {/* короткий FAQ (3–4 вопроса) */}
          <FAQSection />
          <EcosystemSection />

          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
