import { useEffect, useRef } from "react";

// ── Google Fonts (add to your index.html <head> if not already present) ───────
// <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
// ─────────────────────────────────────────────────────────────────────────────

// ── Brand colours ─────────────────────────────────────────────────────────────
const C_BG      = "#F05235"; // background
const C_HEADING = "#1A0800"; // big ABOUT text (near-black on coral)
const C_SUB     = "#581A12"; // subtitle / body text
const C_GRAIN   = C_BG;     // grain tint stays on brand
// ─────────────────────────────────────────────────────────────────────────────

// ── Edit your content here ────────────────────────────────────────────────────
const HEADING = "ABOUT";

const SUBTITLE =
  "For 2 years building the bridge between raw intelligence and real products — the AI fullstack developer who ships things that actually think.";
// ─────────────────────────────────────────────────────────────────────────────

function Grain() {
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        zIndex: 50,
        opacity: 0.045,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "160px",
      }}
    />
  );
}

export default function AboutIntro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const targets = section.querySelectorAll("[data-reveal]");
    targets.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
      el.style.transition = `opacity 0.8s ease ${i * 0.18}s, transform 0.8s ease ${i * 0.18}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "56vh",
        background: C_BG,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 6vw 72px",
      }}
    >
      <Grain />

      {/* Big heading */}
      <h1
        data-reveal
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(100px, 18vw, 260px)",
          color: C_HEADING,
          letterSpacing: "-0.01em",
          lineHeight: 0.88,
          margin: 0,
          position: "relative",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        {HEADING}
      </h1>

      {/* Subtitle */}
      <p
        data-reveal
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(13px, 1.1vw, 16px)",
          fontWeight: 400,
          lineHeight: 1.75,
          color: C_SUB,
          textAlign: "center",
          maxWidth: 480,
          margin: "28px 0 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        {SUBTITLE}
      </p>
    </section>
  );
}