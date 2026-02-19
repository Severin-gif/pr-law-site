import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ProBono from "./pages/ProBono";
import PartnersPage from "./components/partners";

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
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
