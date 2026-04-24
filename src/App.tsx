import { Routes, Route } from "react-router-dom";

import { SERVICES } from "./config/services";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import ArbitrationBankruptcy from "./pages/ArbitrationBankruptcy";

import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ProBono from "./pages/ProBono";
import PartnersPage from "./components/partners";
import Success from "./pages/Success";
import ServiceTemplatePage from "./pages/services/ServiceTemplatePage";



const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D10] text-[#EDEAE2]">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/pro-bono" element={<ProBono />} />
          <Route path="/success" element={<Success />} />
          <Route path="/services/arbitration-bankruptcy" element={<ArbitrationBankruptcy />} />
          {SERVICES.map((service) => (
            <Route
              key={service.id}
              path={service.path}
              element={<ServiceTemplatePage service={service} />}
            />
          ))}

        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
