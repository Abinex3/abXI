import { useState, useEffect } from "react";

export default function ProjectDetailHero({ project }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade + slight scale as you scroll past the hero
  const fade = Math.max(0, 1 - scrollY / 600);
  const scale = 1 + scrollY / 4000;

  return (
    <section
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(to bottom, #e8e0d5 0%, #e8e0d5 45%, #f0a085 75%, #ee5230 100%)",
        padding: "0 48px",
        textAlign: "center",
      }}
    >
      
      <h1
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(80px, 16vw, 240px)",
          fontWeight: 900,
          color: "#0f0f0f",
          margin: 0,
          textTransform: "uppercase",
          lineHeight: 0.85,
          letterSpacing: "2px",
          opacity: fade,
          transform: `scale(${scale})`,
        }}
      >
        {project.name}
      </h1>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "18px",
          color: "#1a1a1a",
          lineHeight: 1.5,
          margin: "120px 0 0",
          maxWidth: "640px",
          opacity: fade,
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {project.description}
      </p>
    </section>
  );
}