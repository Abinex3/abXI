import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import useLenis from "./hooks/useLenis";

// Home page sections
import HeroSection from "./pages/HeroSection";
import WhatIDo from "./pages/WhatIDo";
import FeaturedWork from "./pages/FeaturedWork";
import About from "./pages/About";
import WhyMe from "./pages/WhyMe";
import ContactSection from "./pages/ContactSection";
import Footer from "./pages/Footer";

// Separate route page
import AboutMore from "./pages/About/More";

// ── Home — all sections stacked ───────────────────────────────────────────────
function Home() {
  useLenis();

  return (
    <div>
      <div style={{ position: "sticky", top: 0, zIndex: 0, height: "100vh" }}>
        <HeroSection />
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        <WhatIDo />
        <FeaturedWork />
        <About />
        <WhyMe />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

// ── App — router root ─────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar floats over every route */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMore />} />
      </Routes>
    </BrowserRouter>
  );
}