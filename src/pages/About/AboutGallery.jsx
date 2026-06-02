import { useRef, useEffect } from "react";

// ── Swap with your actual imports ─────────────────────────
const PHOTO1 = null;
const PHOTO2 = null;
// ─────────────────────────────────────────────────────────

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

export default function AboutGallery() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll(".g-card");
    const baseRots = ["-8deg", "6deg"];

    // console.log("🖼 AboutGallery: cards found →", cards.length);
    // console.log("📌 Card 1 — top: 80px | left: 6vw");
    // console.log("📌 Card 2 — bottom: 80px | right: 6vw");
    // console.log("📐 String path: M 0 0 C 300 300, 700 700, 1000 1000");
    // console.log("📏 Section minHeight: 100vh");

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
      console.log(`✅ Listeners attached to card ${i + 1}`);
    });

    return () => {
      cards.forEach((card) => {
        const clone = card.cloneNode(true);
        card.parentNode?.replaceChild(clone, card);
      });
      console.log("🧹 AboutGallery: listeners cleaned up");
    };
  }, []);

  return (
   <section
  ref={sectionRef}
  style={{
    position: "relative",
    width: "100%",
    height: "150vh",
    maxHeight: "150vh",     // ← lock it from growing
    flexShrink: 0,          // ← prevent parent flex from squishing it
    background: "#e05a30",
    // overflow: "hidden",
  }}
>
      {/* Grain */}
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

      {/* ── Curved string top-left → bottom-right ──
          viewBox="0 0 1000 1000" means coordinates are 0-1000 in both axes
          Tune the path control points to follow your cards:
          "M 0 0"        = string starts top-left corner
          "C 300 300,"   = 1st control point (pull left side down)
          "700 700,"     = 2nd control point (pull right side up)
          "1000 1000"    = string ends bottom-right corner            */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 6,
          pointerEvents: "none",
        }}
      >
        <path
          d="M 0 0 C 350 300, 350 700, 1000 1000"
          stroke="#1a0800"
          strokeWidth="2"
          fill="none"
          opacity="0.72"
        />
      </svg>

      {/* ── Card 1 — top left ──
          top  = distance from top of section
          left = distance from left edge                  */}
      <div style={{ position: "absolute", top: 180, left: "6vw", zIndex: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Tape */}
          <div
            style={{
              width: 55, height: 80,
              background: "rgba(253,218,90,0.92)",
              flexShrink: 0, zIndex: 7,
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 5px)",
            }}
          />
          {/* Polaroid */}
          <div
            className="g-card"
            style={{
              background: "#fff",
              padding: "14px 14px 70px 14px",
              width: "clamp(260px, 28vw, 400px)",
              boxShadow: "8px 20px 60px rgba(0,0,0,0.35)",
              transform: "rotate(-8deg)",
              transition: "transform 0.25s ease",
              marginTop: -10,
              willChange: "transform",
            }}
          >
            <div style={{ width: "100%", aspectRatio: "1 / 1.2", overflow: "hidden", background: "#b8b0a8" }}>
              {PHOTO1
                ? <img src={PHOTO1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    photo 1
                  </div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* ── Card 2 — bottom right ──
          bottom = distance from bottom of section
          right  = distance from right edge               */}
      <div style={{ position: "absolute", top: "88%", right: "6vw", zIndex: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Tape */}
          <div
            style={{
              width: 55, height: 80,
              background: "rgba(253,218,90,0.92)",
              flexShrink: 0, zIndex: 7,
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 5px)",
            }}
          />
          {/* Polaroid */}
          <div
            className="g-card"
            style={{
              background: "#fff",
              padding: "14px 14px 70px 14px",
              width: "clamp(260px, 28vw, 400px)",
              boxShadow: "8px 20px 60px rgba(0,0,0,0.35)",
              transform: "rotate(6deg)",
              transition: "transform 0.25s ease",
              marginTop: -10,
              willChange: "transform",
            }}
          >
            <div style={{ width: "100%", aspectRatio: "1 / 1.2", overflow: "hidden", background: "#b8b0a8" }}>
              {PHOTO2
                ? <img src={PHOTO2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    photo 2
                  </div>
              }
            </div>
          </div>
          {/* Label */}
          <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-end", gap: 4, marginTop: 12, zIndex: 20, transform: "rotate(6deg)" }}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1rem, 1.5vw, 1.4rem)",
              color: "rgba(255,255,255,0.92)", fontWeight: 600, lineHeight: 1, whiteSpace: "nowrap" }}>
              My wife
            </span>
            <CurvedArrow side="left" />
          </div>
        </div>
      </div>

    </section>
  );
}