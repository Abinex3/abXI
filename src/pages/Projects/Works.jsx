import { useEffect } from "react";
import PortfolioHero from "./PortfolioHero";
import PortfolioList from "./PortfolioList";
import ContactSection from "../ContactSection";
import Footer from "../Footer";
import usePageTitle from "../../hooks/usePageTitle";


export default function PortfolioMore() {
    usePageTitle("Project Showcases");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* Section 1 — Hero: FEATURED WORK (5) */}
      <PortfolioHero />

      {/* Section 2 — Project Grid */}
      <PortfolioList />

      <ContactSection />

      <Footer />

    </div>
  );
}