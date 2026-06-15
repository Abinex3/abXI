import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import RouteTransition from "./components/RouteTransition";
import TransitionProvider from "./components/TransitionProvider";
import useLenis from "./hooks/useLenis";

// Home page sections
import HeroSection from "./pages/HeroSection";
import WhatIDo from "./pages/WhatIDo";
import FeaturedWork from "./pages/FeaturedWork";
import About from "./pages/About";

import WhyMe from "./pages/WhyMe";
import ContactSection from "./pages/ContactSection";
import Footer from "./pages/Footer";
import Contact from "./pages/Contact";

// Separate route page
import AboutMore from "./pages/About/More";
import Projects from "./pages/Projects/Works";
import ProjectDetail from "./pages/Projects/ProjectDetail";

// Blog
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

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

export default function App() {
  // Show the loader only once per browser session.
  const [showLoader, setShowLoader] = useState(
    () => sessionStorage.getItem("introSeen") !== "true"
  );

  useEffect(() => {
    if (!showLoader) return;
    // Lock scroll while the loader is on screen.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showLoader]);

  function handleLoaderComplete() {
    sessionStorage.setItem("introSeen", "true");
    setShowLoader(false);
  }

  return (
    <>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      <BrowserRouter>
        <TransitionProvider>
          <Navbar />
          <RouteTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutMore />} />
              <Route path="/work" element={<Projects />} />
              <Route path="/work/:id" element={<ProjectDetail />} />
              <Route path="/contact" element={<><Contact /><Footer /></>} />
              <Route path="/blog" element={<><Blog /><Footer /></>} />
              <Route path="/blog/:slug" element={<><BlogPost /><Footer /></>} />
            </Routes>
          </RouteTransition>
        </TransitionProvider>
      </BrowserRouter>
    </>
  );
}