import React from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import InterludeSection from "./components/InterludeSection";
import TrustSection from "./components/TrustSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#EDEAE2]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-16">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <InterludeSection />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
