import { useEffect, useRef, useState } from "react";

const EMAIL = "abxidev@gmail.com";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Fade-in on enter
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    // ── Outer white wrapper with padding + border radius (matches screenshot) ──
    <div
      style={{
        background: "#e8e0d5",
        padding: "2.5rem",
      }}
    >
    <section
    id="contact" data-theme="dark"
      ref={sectionRef}
      style={{
        background: "#111",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "6rem 2rem",
        borderRadius: "24px",
        isolation: "isolate",
      }}
    >
      {/* ── Grain overlay ── */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#grain)",
          opacity: 0.04,
          pointerEvents: "none",
          zIndex: 0,
          background: "#fff",
        }}
      />

      {/* ── Radial glow behind text ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(224,58,30,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── WORK WITH ME label ── */}
      <p
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.25em",
          color: "#ffffff30",
          marginBottom: "2.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          position: "relative",
          zIndex: 1,
        }}
      >
        THE VERDICT
      </p>

      {/* ── Main headline ── */}
      <h2
        ref={headlineRef}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3.5rem, 9vw, 9rem)",
          fontWeight: 900,
          color: "#fff",
          lineHeight: 0.88,
          textAlign: "center",
          margin: "0 0 3.5rem 0",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          position: "relative",
          zIndex: 1,
        }}
      >
        YOU'VE SEEN THE WORK.
        <br />
        YOU KNOW THE ANSWER.
        <br />
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            fontStyle: "italic",
            color: "#e03a1e",
            fontWeight: 700,
            fontSize: "0.65em",
          }}
        >
          Say it.
        </span>
      </h2>

      {/* ── CTA Button ── */}
      <a
        href={`mailto:${EMAIL}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-block",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.4rem",
          letterSpacing: "0.1em",
          color: hovered ? "#fff" : "#111",
          background: hovered ? "#e03a1e" : "#fff",
          padding: "1.2rem 4rem",
          textDecoration: "none",
          border: "2px solid #fff",
          cursor: "pointer",
          transition: "background 0.25s ease, color 0.25s ease, transform 0.2s ease, border-color 0.25s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          opacity: visible ? 1 : 0,
          position: "relative",
          zIndex: 1,
          marginBottom: "3rem",
          // offset for the stagger
          transitionDelay: hovered ? "0s" : "0s",
        }}
        // entry animation via inline style override
        className="cta-btn"
      >
        HELL YES!
      </a>

      {/* ── Email address ── */}
      <a
        href={`mailto:${EMAIL}`}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.82rem",
          color: "#ffffff40",
          textDecoration: "none",
          letterSpacing: "0.05em",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s, color 0.2s ease",
          position: "relative",
          zIndex: 1,
        }}
        onMouseEnter={(e) => (e.target.style.color = "#ffffff90")}
        onMouseLeave={(e) => (e.target.style.color = "#ffffff40")}
      >
        {EMAIL}
      </a>

      {/* ── Bottom rule ── */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          opacity: visible ? 0.3 : 0,
          transition: "opacity 0.7s ease 0.7s",
          zIndex: 1,
        }}
      >
        <div style={{ width: "40px", height: "1px", background: "#e03a1e" }} />
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "#fff",
          }}
        >
          YOUR MOVE. LET'S SHIP.
        </span>
        <div style={{ width: "40px", height: "1px", background: "#e03a1e" }} />
      </div>

      {/* ── CTA entry animation ── */}
      <style>{`
        .cta-btn {
          opacity: 0;
          transform: translateY(20px) scale(1);
          animation: ${visible ? "ctaEnter 0.7s ease 0.35s forwards" : "none"};
        }
        @keyframes ctaEnter {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .cta-btn:hover {
          transform: scale(1.04) !important;
        }
      `}</style>
    </section>
    </div>
  );
}