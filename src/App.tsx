import { Routes, Route } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ProBono from "./pages/ProBono";
import PartnersPage from "./components/partners";

const App = () => {
  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-160px)]">
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
    </>
  );
};

export default App;
