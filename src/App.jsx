import HeroSection from "./pages/HeroSection";
import WhatIDo from "./pages/WhatIDo";
import useLenis from "./hooks/useLenis";
import FeaturedWork from "./pages/FeaturedWork";
import About from "./pages/About";
import WhyMe from "./pages/WhyMe";
import ContactSection from "./pages/ContactSection";
import Footer from "./pages/Footer";



function App() {
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

export default App;