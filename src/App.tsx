import { Routes, Route } from "react-router-dom";

import { getServiceBySlug } from "./config/services";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

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
          <Route
            path="/services/arbitration-bankruptcy"
            element={<ServiceTemplatePage service={getServiceBySlug("arbitration-bankruptcy")} />}
          />
          <Route
            path="/services/contract-work"
            element={<ServiceTemplatePage service={getServiceBySlug("contract-work")} />}
          />
          <Route
            path="/services/corporate"
            element={<ServiceTemplatePage service={getServiceBySlug("corporate")} />}
          />
          <Route
            path="/services/asset-protection"
            element={<ServiceTemplatePage service={getServiceBySlug("asset-protection")} />}
          />

        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
