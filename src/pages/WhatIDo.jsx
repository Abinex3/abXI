import { useEffect, useRef, useState } from "react";
import OrbitImages from "../components/OrbitImages";

const stats = [
  { value: "2", label: "YEARS EXPERIENCE" },
  { value: "FS", label: "FULL STACK" },
  { value: "OPEN", label: "TO WORK" },
  { value: "RE", label: "REMOTE / ABROAD" },
];

// Tech stack icons (devicon CDN — no local images needed)
const techIcons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
];

export default function WhatIDo() {
  const orbitRef = useRef(null);
  const [orbitVisible, setOrbitVisible] = useState(false);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOrbitVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "#e8e0d5",
        minHeight: "100vh",
        padding: "6rem 2rem",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Label */}
      <p
        style={{
          textAlign: "center",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          color: "#00000070",
          marginBottom: "2.5rem",
        }}
      >
        WHAT I DO
      </p>

      {/* Headline */}
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2.8rem, 8.5vw, 8.5rem)",
          fontWeight: 900,
          lineHeight: 0.9,
          textAlign: "center",
          color: "#111",
          maxWidth: "1100px",
          margin: "0 auto 5rem auto",
        }}
      >
        I TAKE YOUR ZERO AND ENGINEER IT INTO SOMETHING THE WORLD CAN'T{" "}
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            fontStyle: "italic",
            color: "#e03a1e",
            fontWeight: 700,
          }}
        >
          Ignore.
        </span>
      </h2>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "#00000015",
          border: "1px solid #00000015",
          maxWidth: "900px",
          margin: "0 auto 6rem auto",
          overflow: "hidden",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#e8e0d5",
              padding: "2.5rem 1rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                color: "#e03a1e",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "#00000060",
                marginTop: "0.5rem",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      
      {/* Orbiting tech stack — big, with visible path + scroll entrance */}
      <div
        ref={orbitRef}
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          opacity: orbitVisible ? 1 : 0,
          transform: orbitVisible ? "scale(1)" : "scale(0.82)",
          transition:
            "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <OrbitImages
          images={techIcons}
          shape="ellipse"
          radiusX={560}
          radiusY={200}
          rotation={-8}
          duration={32}
          itemSize={84}
          responsive={true}
          showPath={true}
          pathColor="#111111"
          pathWidth={2}
          centerContent={
            <div
              style={{
                textAlign: "center",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 900,
                color: "#111",
                lineHeight: 0.95,
              }}
            >
              MY
              <br />
              <span style={{ color: "#e03a1e" }}>STACK</span>
            </div>
          }
        />
      </div>
    </section>
  );
}