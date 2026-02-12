import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import PartnersPage from "./components/partners";
import ProBono from "./pages/ProBono";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/pro-bono" element={<ProBono />} />
    </Routes>
  );
};

export default App;
