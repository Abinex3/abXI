import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IMG from "../assets/img.png";
import TransitionLink from "../components/TransitionLink";

const MOBILE_BREAKPOINT = 768; // below this → stacked layout

export default function About() {
  const polaroidRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return; // skip the 3D tilt on touch / mobile
    const card = polaroidRef.current;
    const section = sectionRef.current;
    if (!card || !section) return;

    const rect = section.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `rotate(6deg) rotateX(${-y * 18}deg) rotateY(${x * 18}deg) translate(${x * 30}px, ${y * 20}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!polaroidRef.current) return;
    polaroidRef.current.style.transform =
      "rotate(6deg) rotateX(0deg) rotateY(0deg) translate(0,0) scale(1)";
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "#e8e0d5",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        position: "relative",
        paddingBottom: "6rem",
      }}
    >
      {/* Giant ABOUT — bleeds full width */}
      <div
        style={{
          paddingTop: "5rem",
          overflow: "hidden",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "28.5vw",
            fontWeight: 900,
            color: "#111",
            margin: 0,
            letterSpacing: "-0.01em",
            lineHeight: 0.85,
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          ABOUT
        </h2>

        <div
          style={{
            // DESKTOP: pushed to the right (unchanged).
            // MOBILE: centered straight below ABOUT.
            textAlign: isMobile ? "center" : "right",
            paddingRight: isMobile ? "0" : "2rem",
            marginTop: "0.6rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: isMobile ? "1.4rem" : "clamp(1.2rem, 2vw, 1.8rem)",
              fontStyle: "italic",
              color: "#e03a1e",
              fontWeight: 700,
            }}
          >
            the human behind the code.
          </span>
        </div>
      </div>

      {/* Content grid
          DESKTOP: 3-column grid (1fr auto 1fr) — unchanged.
          MOBILE: single column, stacked: bio → polaroid → paragraph → CTA. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto 1fr",
          justifyItems: isMobile ? "center" : "stretch",
          alignItems: "center",
          gap: isMobile ? "2.5rem" : "2rem",
          maxWidth: "1200px",
          margin: "3rem auto 0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Left — bio */}
        <div>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "#00000075",
              maxWidth: isMobile ? "420px" : "300px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Hi, I'm Abinesh. A full stack developer building products from zero
            to something real — clean code, sharp interfaces, and nothing that
            embarrasses itself in production.
          </p>
        </div>

        {/* Center — polaroid */}
        <div style={{ perspective: "900px", cursor: isMobile ? "default" : "none" }}>
          <div
            ref={polaroidRef}
            style={{
              background: "#fff",
              padding: "14px 14px 56px 14px",
              width: isMobile ? "min(72vw, 300px)" : "clamp(240px, 22vw, 340px)",
              boxShadow: "0 32px 80px #00000022",
              transform: "rotate(6deg)",
              transition: "transform 0.2s ease",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                overflow: "hidden",
                background: "#ccc",
              }}
            >
              <img
                src={IMG}
                alt="About"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "grayscale(100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right — paragraph + CTA */}
        <div>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "#00000075",
              maxWidth: isMobile ? "420px" : "320px",
              marginBottom: "2.5rem",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Most developers write code. I build experiences — the kind that
            loads fast, feels smooth, and makes whoever hired me look good. I'm
            open to abroad opportunities and freelance work where the bar is
            high and the problem is real.
          </p>

          {/* CTA — handwritten label + arrow + button */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "1rem",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              <p
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.1rem",
                  color: "#00000060",
                  lineHeight: 1.4,
                  marginBottom: "0.25rem",
                }}
              >
                more fun part
                <br />
                about me
              </p>
              <svg
                viewBox="0 0 60 40"
                width="60"
                height="40"
                fill="none"
                style={{ marginLeft: "auto", display: "block" }}
              >
                <path
                  d="M4 8 C10 20, 30 30, 52 28"
                  stroke="#00000045"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M44 22 L52 28 L44 34"
                  stroke="#00000045"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Button — navigate to /about instead of href */}
            <TransitionLink to={`/about`}>
              <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "#111",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                padding: "1rem 1.5rem",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "background 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e03a1e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={IMG}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(100%)",
                  }}
                />
              </span>
              MORE ABOUT ME
            </button>
            </TransitionLink>
          </div>
        </div>
      </div>

      {/* Bottom detail */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
       
      </div>
    </section>
  );
}