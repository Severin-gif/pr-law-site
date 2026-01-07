import React from "react";

import Header from "./components/header";
import Footer from "./components/Footer";

import Hero from "./components/hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import InterludeSection from "./components/InterludeSection";
import TrustSection from "./components/TrustSection";
import CredentialsMiniSection from "./components/CredentialsMiniSection";

import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";

const App: React.FC = () => {
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
          <CredentialsMiniSection />

          {/* короткий FAQ (3–4 вопроса) */}
          <FAQSection />

          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
