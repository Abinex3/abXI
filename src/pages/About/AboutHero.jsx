import { useEffect, useRef } from "react";

const PHOTO1 = null;
const PHOTO2 = null;
const PHOTO3 = null;

const POLAROIDS = [
  { photo: PHOTO1, rotate: "-12deg", label: "Test",      arrowSide: "right", zIndex: 2 },
  { photo: PHOTO2, rotate: "4deg",   label: "Barbara", arrowSide: "right", zIndex: 4 },
  { photo: PHOTO3, rotate: "-6deg",  label: "My wife", arrowSide: "left",  zIndex: 3 },
];

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

 useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;
  const cards = section.querySelectorAll(".p-card");
  const baseRots = ["-12deg", "4deg", "-6deg"];

  cards.forEach((card, i) => {
    const onMove = (e) => {
      const { width, height, left, top } = card.getBoundingClientRect();
      const mx = (e.clientX - left) / width - 0.5;
      const my = (e.clientY - top) / height - 0.5;
      card.style.transform = `rotate(${baseRots[i]}) translate(${mx * 18}px, ${my * 12}px)`;
    };

    const onLeave = () => {
      card.style.transform = `rotate(${baseRots[i]}) translate(0, 0)`;
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
  });

  return () => {
    cards.forEach((card, i) => {
      card.replaceWith(card.cloneNode(true)); // clean remove listeners
    });
  };
}, []);


  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "130vh",
        minHeight: 680,
        background: "#e05a30",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
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

      {/* Catenary string — sits at ~18% from top */}
      {/* Catenary string — wall to wall, hugs top on sides */}
<svg
  viewBox="0 0 1000 160"
  preserveAspectRatio="none"
  style={{
    position: "absolute",
    top: 80,
    left: 0,
    width: "100%",
    height: 160,
    zIndex: 6,
    pointerEvents: "none",
  }}
>
  <path
    d="M 0 2 C 250 2, 350 140, 500 120 C 650 100, 750 2, 1000 2"
    stroke="#1a0800"
    strokeWidth="2"
    fill="none"
    opacity="0.75"
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
          // Tape sits on the string — left/right high, center dips low
          const tapeTopPx = [90, 182, 85][i];


          const colPadding = [
            { paddingLeft: "2%",  paddingRight: "4%" },
            { paddingLeft: "6%",  paddingRight: "6%" },
            { paddingLeft: "4%",  paddingRight: "2%" },
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
              {/* Tape — tall rectangle like reference */}
              <div
                style={{
                  marginTop: tapeTopPx,
                  width: 60,
                  height: 90,
                  background: "rgba(253,218,90,0.92)",
                  flexShrink: 0,
                  zIndex: 7,
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 5px)",
                }}
              />

              {/* Polaroid — large, fills the viewport */}
              <div
                className="p-card"
                style={{
                  background: "#fff",
                  padding: "14px 14px 70px 14px",
                  width: "clamp(280px, 30vw, 420px)",
                  boxShadow: "8px 20px 60px rgba(0,0,0,0.35)",
                  transform: `rotate(${p.rotate})`,
                  transition: "transform 0.25s ease",
                  marginTop: -10,
                  zIndex: p.zIndex + 5,
                  willChange: "transform",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1.2",
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

              {/* Handwritten label + arrow */}
              {p.label && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: p.arrowSide === "right" ? "row" : "row-reverse",
                    alignItems: "flex-end",
                    gap: 4,
                    marginTop: 12,
                    zIndex: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "clamp(1rem, 1.5vw, 1.4rem)",
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

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(7px); }
        }
      `}</style>
    </section>
  );
}