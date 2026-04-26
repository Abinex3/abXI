import { useEffect, useRef } from "react";

// ── Swap these with your actual photo imports ─────────────────────────────────
// import PHOTO1 from "../../assets/about1.jpg";
// import PHOTO2 from "../../assets/about2.jpg";
// import PHOTO3 from "../../assets/about3.jpg";
const PHOTO1 = null;
const PHOTO2 = null;
const PHOTO3 = null;
// ─────────────────────────────────────────────────────────────────────────────

// Edit labels here. Set label: null to hide caption for that polaroid.
const POLAROIDS = [
  { photo: PHOTO1, rotate: "-10deg", label: null,      arrowSide: "right", zIndex: 2 },
  { photo: PHOTO2, rotate: "3deg",   label: "Barbara", arrowSide: "right", zIndex: 4 },
  { photo: PHOTO3, rotate: "-5deg",  label: "My wife", arrowSide: "left",  zIndex: 3 },
];

// Curved arrow — points upward toward the polaroid bottom corner
function CurvedArrow({ side }) {
  if (side === "right") {
    return (
      <svg viewBox="0 0 70 55" width="70" height="55" fill="none" style={{ display: "block", flexShrink: 0 }}>
        <path d="M 8 48 C 15 30, 42 18, 62 8" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M 54 4 L 64 8 L 56 16" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 70 55" width="70" height="55" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <path d="M 62 48 C 55 30, 28 18, 8 8" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M 16 4 L 6 8 L 14 16" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function AboutHero() {
  const sectionRef = useRef(null);

  // Mouse parallax — middle card moves more for depth
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll(".p-card");
    const baseRots = ["-10deg", "3deg", "-5deg"];
    const depths   = [1, 1.8, 1.2];

    const onMove = (e) => {
      const { width, height, left, top } = section.getBoundingClientRect();
      const mx = (e.clientX - left) / width - 0.5;
      const my = (e.clientY - top) / height - 0.5;
      cards.forEach((card, i) => {
        card.style.transform = `rotate(${baseRots[i]}) translate(${mx * 12 * depths[i]}px, ${my * 7 * depths[i]}px)`;
      });
    };
    const onLeave = () => {
      cards.forEach((card, i) => {
        card.style.transform = `rotate(${baseRots[i]}) translate(0,0)`;
      });
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 620,
        background: "#e05a30",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Grain overlay */}
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

      {/* ── Full-width string + polaroid layout ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Catenary string */}
        <svg
          viewBox="0 0 1000 110"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 110,
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          <path
            d="M 0 18 C 180 18, 280 96, 500 82 C 720 68, 820 16, 1000 16"
            stroke="#1a0800"
            strokeWidth="1.8"
            fill="none"
            opacity="0.72"
          />
        </svg>

        {/* Three columns */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          {POLAROIDS.map((p, i) => {
            // Tape top follows the string dip: left high, center low, right high
            const tapeTopPx = [20, 66, 18][i];
            // Left/right cards bleed slightly off-edge; center is truly centered
            const colPadding = [
              { paddingLeft: 0, paddingRight: "10%" },
              { paddingLeft: "8%", paddingRight: "8%" },
              { paddingLeft: "10%", paddingRight: 0 },
            ][i];

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  ...colPadding,
                }}
              >
                {/* Tape piece */}
                <div
                  style={{
                    marginTop: tapeTopPx,
                    width: 50,
                    height: 66,
                    background: "rgba(253,218,90,0.9)",
                    flexShrink: 0,
                    zIndex: 7,
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 5px)",
                  }}
                />

                {/* Polaroid */}
                <div
                  className="p-card"
                  style={{
                    background: "#fff",
                    padding: "14px 14px 66px 14px",
                    width: "clamp(240px, 25vw, 400px)",
                    boxShadow: "6px 16px 55px rgba(0,0,0,0.32)",
                    transform: `rotate(${p.rotate})`,
                    transition: "transform 0.25s ease",
                    marginTop: -6,
                    zIndex: p.zIndex + 5,
                    willChange: "transform",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1.25",
                      overflow: "hidden",
                      background: "#b8b0a8",
                    }}
                  >
                    {p.photo ? (
                      <img
                        src={p.photo}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          color: "rgba(255,255,255,0.4)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        photo {i + 1}
                      </div>
                    )}
                  </div>
                </div>

                {/* Handwritten label + curved arrow */}
                {p.label && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: p.arrowSide === "right" ? "row" : "row-reverse",
                      alignItems: "flex-end",
                      gap: 4,
                      marginTop: 10,
                      zIndex: 20,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "clamp(1rem, 1.5vw, 1.35rem)",
                        color: "rgba(255,255,255,0.92)",
                        fontWeight: 600,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.label}
                    </span>
                    <CurvedArrow side={p.arrowSide} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 10,
          opacity: 0.5,
          animation: "bob 2.2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "#fff",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
          <path d="M7 1 L7 17 M1 12 L7 18 L13 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(7px); }
        }
      `}</style>
    </section>
  );
}