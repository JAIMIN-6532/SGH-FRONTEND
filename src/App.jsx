import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BirthCertificate from "./pages/BirthCertificate";
import DeathCertificate from "./pages/DeathCertificate";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="relative">
        <Navbar />
        <div className="mt-16 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/birth-certificate" element={<BirthCertificate />} />
            <Route path="/death-certificate" element={<DeathCertificate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
