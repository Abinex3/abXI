import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const MOBILE_BREAKPOINT = 768; // below this → one card per row (single column)

export default function PortfolioList() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      style={{
        // DESKTOP padding unchanged. MOBILE: tighter side padding.
        padding: isMobile ? "40px 20px" : "60px 48px",
        backgroundColor: "#e8e0d5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "grid",
          // DESKTOP: two columns (unchanged).
          // MOBILE: single column → cards stack one by one.
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gridAutoRows: "auto",
          alignItems: "start",
          columnGap: "48px",
          rowGap: isMobile ? "48px" : "60px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}