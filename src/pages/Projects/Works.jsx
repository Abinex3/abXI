import { useEffect } from "react";
import PortfolioHero from "./PortfolioHero";
import PortfolioList from "./PortfolioList";

export default function PortfolioMore() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* Section 1 — Hero: FEATURED WORK (5) */}
      <PortfolioHero />

      {/* Section 2 — Project Grid */}
      <PortfolioList />

    </div>
  );
}