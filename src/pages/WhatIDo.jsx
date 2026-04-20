import { useEffect, useRef } from "react";

const stats = [
  { value: "3+", label: "YEARS EXPERIENCE" },
  { value: "FS", label: "FULL STACK" },
  { value: "OPEN", label: "TO WORK" },
  { value: "RE", label: "REMOTE / ABROAD" },
];

const services = [
  {
    number: "01",
    title: "FULL STACK DEVELOPMENT",
    desc: "End-to-end web apps built from the ground up. Clean architecture, solid backend, and a frontend that doesn't embarrass the codebase.",
    stack: ["React", "Node.js", "MongoDB", "PostgreSQL"],
    dark: true,
  },
  {
    number: "02",
    title: "FRONTEND ENGINEERING",
    desc: "Interfaces that feel alive — smooth animations, pixel-perfect layouts, and performance that doesn't tank on a real device.",
    stack: ["React", "Tailwind", "GSAP", "Framer Motion"],
    dark: false,
  },
  {
    number: "03",
    title: "FREELANCE BUILDS",
    desc: "Got an idea sitting in a Notion doc? I'll scope it, design it, build it, and ship it — solo or alongside your existing team.",
    stack: ["Discovery", "Design", "Build", "Ship"],
    dark: true,
  },
];

export default function WhatIDo() {
  const statsRef = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const allRefs = [...statsRef.current, ...cardsRef.current];
    const observers = allRefs.map((el) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <section
      style={{
        background: "#e8e0d5",
        minHeight: "100vh",
        padding: "6rem 2rem",
        fontFamily: "'Inter', sans-serif",
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
            ref={(el) => (statsRef.current[i] = el)}
            style={{
              background: "#e8e0d5",
              padding: "2.5rem 1rem",
              textAlign: "center",
              opacity: 0,
              transform: "translateY(24px)",
              transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
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

      {/* Divider label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "1100px",
          margin: "0 auto 2.5rem auto",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "#00000015" }} />
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "#00000050",
          }}
        >
          SERVICES
        </p>
        <div style={{ flex: 1, height: "1px", background: "#00000015" }} />
      </div>

      {/* Service Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {services.map((s, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{
              background: s.dark ? "#111" : "#e8e0d5",
              border: `1px solid ${s.dark ? "#ffffff10" : "#00000015"}`,
              borderRadius: "4px",
              padding: "2.5rem 2rem",
              opacity: 0,
              transform: "translateY(32px)",
              transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
              cursor: "default",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-6px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            {/* Number */}
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                color: s.dark ? "#ffffff30" : "#00000035",
                marginBottom: "1.75rem",
              }}
            >
              {s.number}
            </div>

            {/* Title */}
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                fontWeight: 900,
                color: s.dark ? "#fff" : "#111",
                lineHeight: 1,
                marginBottom: "1rem",
              }}
            >
              {s.title}
            </div>

            {/* Desc */}
            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.7,
                color: s.dark ? "#ffffff65" : "#00000065",
                marginBottom: "2rem",
              }}
            >
              {s.desc}
            </p>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: s.dark ? "#ffffff10" : "#00000010",
                marginBottom: "1.5rem",
              }}
            />

            {/* Stack pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {s.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    padding: "5px 12px",
                    border: `1px solid ${s.dark ? "#ffffff20" : "#00000020"}`,
                    borderRadius: "2px",
                    color: s.dark ? "#ffffff70" : "#00000070",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Bottom accent */}
            <div
              style={{
                marginTop: "2rem",
                width: "28px",
                height: "2px",
                background: "#e03a1e",
                transition: "width 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.width = "56px")}
              onMouseLeave={(e) => (e.currentTarget.style.width = "28px")}
            />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          textAlign: "center",
          marginTop: "5rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "1.4rem",
            color: "#00000060",
            marginBottom: "1.2rem",
          }}
        >
          sounds like what you need?
        </p>
        <a
          href="#contact"
          style={{
            display: "inline-block",
            background: "#111",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            padding: "1rem 2.5rem",
            textDecoration: "none",
            transition: "background 0.25s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e03a1e")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
        >
          LET'S TALK
        </a>
      </div>
    </section>
  );
}