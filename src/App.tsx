import React from "react";
import Header from "./components/header";
import Hero from "./components/hero";

import QuoteSection from "./components/QuoteSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import AudienceSection from "./components/AudienceSection";
import AboutSpeakerSection from "./components/AboutSpeakerSection";
import ProcessSection from "./components/ProcessSection";
import PersonalFormatSection from "./components/PersonalFormatSection";
import ResultsSection from "./components/ResultsSection";
import FAQSection from "./components/FAQSection";

import InterludeSection from "./components/InterludeSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#EDEAE2]">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-16">
        <Hero />
        <QuoteSection />

        <AboutSection />
        <ServicesSection />

        {/* визуальная пауза/фото-блок */}
        <InterludeSection />

        <AudienceSection />
        <AboutSpeakerSection />
        <ProcessSection />
        <PersonalFormatSection />
        <ResultsSection />
        <FAQSection />

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
