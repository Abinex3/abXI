import { useEffect, useRef, useState } from "react";
import IMG1 from "../../assets/about/beach.jpeg";
import IMG2 from "../../assets/about/book.jpeg";
import IMG3 from "../../assets/about/clg.jpeg";

const MOBILE_BREAKPOINT = 768; // below this → 3 small cards in a row

const PHOTO1 = IMG1;
const PHOTO2 = IMG2;
const PHOTO3 = IMG3;

const POLAROIDS = [
  { photo: PHOTO1, rotate: "-12deg", label: "living seaside, no filter needed.",      arrowSide: "right", zIndex: 2 },
  { photo: PHOTO2, rotate: "4deg",   label: "Currently Reading", arrowSide: "right", zIndex: 4 },
  { photo: PHOTO3, rotate: "-6deg",  label: "Where My Career started", arrowSide: "left",  zIndex: 3 },
];

function CurvedArrow({ side, size = 70 }) {
  const h = Math.round(size * (55 / 70));
  if (side === "right") {
    return (
      <svg viewBox="0 0 70 55" width={size} height={h} fill="none" style={{ display: "block", flexShrink: 0 }}>
        <path d="M 8 48 C 15 30, 42 18, 62 8" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M 54 4 L 64 8 L 56 16" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 70 55" width={size} height={h} fill="none" style={{ display: "block", flexShrink: 0 }}>
      <path d="M 62 48 C 55 30, 28 18, 8 8" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M 16 4 L 6 8 L 14 16" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function AboutHero() {
  const sectionRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

 useEffect(() => {
  // The hover-tilt is a pointer effect — skip it on mobile (touch).
  if (isMobile) return;

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
}, [isMobile]);


  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        // DESKTOP: tall hanging-string hero (unchanged).
        // MOBILE: shorter so the small cards don't leave a huge empty space.
        height: isMobile ? "auto" : "130vh",
        minHeight: isMobile ? 0 : 680,
        paddingTop: isMobile ? 100 : 0,
        paddingBottom: isMobile ? 40 : 0,
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
      {/* Catenary string — wall to wall, hugs top on sides.
          DESKTOP: original single-dip path (unchanged).
          MOBILE: three dips, one reaching down to each card's tape. */}
<svg
  viewBox="0 0 1000 160"
  preserveAspectRatio="none"
  style={{
    position: "absolute",
    top: isMobile ? 76 : 80,
    left: 0,
    width: "100%",
    height: isMobile ? 150 : 160,
    zIndex: 6,
    pointerEvents: "none",
  }}
>
  <path
    d={
      isMobile
        ? // three dips at the column centers (~167, 500, 833), each reaching
          // the tape of its card; outer dips shallower, middle one deepest.
          "M 0 6 C 90 6, 130 95, 167 95 C 205 95, 300 20, 333 20 C 420 20, 470 150, 500 150 C 535 150, 615 25, 667 25 C 720 25, 770 90, 833 90 C 880 90, 920 8, 1000 8"
        : "M 0 2 C 250 2, 350 140, 500 120 C 650 100, 750 2, 1000 2"
    }
    stroke="#1a0800"
    strokeWidth="2"
    fill="none"
    opacity="0.75"
  />
</svg>


      {/* Three columns
          DESKTOP: absolutely-filled 3-col grid (unchanged).
          MOBILE: in-flow 3-col grid so the section can size to content. */}
      <div
        style={{
          position: isMobile ? "relative" : "absolute",
          top: isMobile ? "auto" : 0,
          left: isMobile ? "auto" : 0,
          right: isMobile ? "auto" : 0,
          bottom: isMobile ? "auto" : 0,
          width: isMobile ? "100%" : "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {POLAROIDS.map((p, i) => {
          // Tape sits on the string — left/right high, center dips low.
          // MOBILE values track the three dips of the mobile string path.
          const tapeTopPx = isMobile
            ? [66, 118, 60][i]
            : [90, 182, 85][i];


          const colPadding = isMobile
            ? [
                { paddingLeft: "2%",  paddingRight: "1%" },
                { paddingLeft: "1%",  paddingRight: "1%" },
                { paddingLeft: "1%",  paddingRight: "2%" },
              ][i]
            : [
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
                  width: isMobile ? 24 : 60,
                  height: isMobile ? 36 : 90,
                  background: "rgba(253,218,90,0.92)",
                  flexShrink: 0,
                  zIndex: 7,
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 5px)",
                }}
              />

              {/* Polaroid — large on desktop, small on mobile (3 across) */}
              <div
                className="p-card"
                style={{
                  background: "#fff",
                  padding: isMobile ? "5px 5px 22px 5px" : "14px 14px 70px 14px",
                  width: isMobile ? "28vw" : "clamp(280px, 30vw, 420px)",
                  maxWidth: isMobile ? "120px" : "none",
                  boxShadow: isMobile
                    ? "3px 6px 18px rgba(0,0,0,0.32)"
                    : "8px 20px 60px rgba(0,0,0,0.35)",
                  transform: `rotate(${p.rotate})`,
                  transition: "transform 0.25s ease",
                  marginTop: isMobile ? -6 : -10,
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
                        fontSize: isMobile ? 8 : 12,
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
                    marginTop: isMobile ? 6 : 12,
                    zIndex: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: isMobile ? "0.8rem" : "clamp(1rem, 1.5vw, 1.4rem)",
                      color: "rgba(255,255,255,0.92)",
                      fontWeight: 600,
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.label}
                  </span>
                  <CurvedArrow side={p.arrowSide} size={isMobile ? 34 : 70} />
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