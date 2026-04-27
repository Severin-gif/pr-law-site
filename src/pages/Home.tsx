import React from "react";
import { Helmet } from "react-helmet-async";

import Hero from "../components/layout/Hero";
import AboutSection from "../components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import InterludeSection from "../components/InterludeSection";
import TrustSection from "../components/trust/TrustSection";
import FAQSection from "../components/sections/FAQSection";
import { EcosystemSection } from "../components/ecosystem";
import ContactSection from "../components/sections/ContactSection";

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Юрист по арбитражным спорам и банкротству | Частная практика</title>
        <meta
          name="description"
          content="Частный юрист по арбитражным спорам, банкротству, договорам и защите активов бизнеса. Анализ рисков, стратегия и сопровождение до результата."
        />
      </Helmet>

      <main className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl space-y-12 sm:space-y-16 lg:space-y-20">
          <Hero />

          {/* смысловой блок — коротко, без “умничания” */}
          <AboutSection />

          <ServicesSection />
          <InterludeSection />

          <TrustSection />
          <EcosystemSection />

          {/* короткий FAQ (3–4 вопроса) */}
          <FAQSection />

          <ContactSection />
        </div>
      </main>
    </>
  );
};

export default Home;
