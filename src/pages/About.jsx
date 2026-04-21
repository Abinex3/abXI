import { useRef } from "react";
import IMG from "../assets/img.png";

export default function About() {
  const polaroidRef = useRef(null);
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = polaroidRef.current;
    const section = sectionRef.current;
    if (!card || !section) return;

    const rect = section.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `rotate(6deg) rotateX(${-y * 18}deg) rotateY(${x * 18}deg) translate(${x * 30}px, ${y * 20}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
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
      fontSize: "28.5vw",        // bleeds edge to edge
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

  {/* Orange label — right */}
  <div
    style={{
      textAlign: "right",
      paddingRight: "2rem",
      marginTop: "0.6rem",
    }}
  >
    <span
      style={{
        fontFamily: "'Caveat', cursive",
        fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
        fontStyle: "italic",
        color: "#e03a1e",
        fontWeight: 700,
      }}
    >
      the human behind the code.
    </span>
  </div>
</div>

      {/* Content grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "2rem",
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
              maxWidth: "300px",
            }}
          >
            Hi, I'm Abinesh. A full stack developer
            building products from zero to something real —
            clean code, sharp interfaces, and nothing
            that embarrasses itself in production.
          </p>
        </div>

        {/* Center — polaroid */}
        <div
          style={{
            perspective: "900px",
            cursor: "none",
          }}
        >
          <div
            ref={polaroidRef}
            style={{
              background: "#fff",
              padding: "14px 14px 56px 14px",
              width: "clamp(240px, 22vw, 340px)",
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
              maxWidth: "320px",
              marginBottom: "2.5rem",
            }}
          >
            Most developers write code. I build experiences —
            the kind that loads fast, feels smooth, and makes
            whoever hired me look good. I'm open to abroad
            opportunities and freelance work where the
            bar is high and the problem is real.
          </p>

          {/* CTA — handwritten + arrow + button */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>

            {/* Handwritten label + arrow */}
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
              {/* Hand-drawn arrow SVG */}
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

            {/* Button */}
            <a
              href="#more"
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
                textDecoration: "none",
                borderRadius: "2px",
                transition: "background 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e03a1e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#111")
              }
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
            </a>
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
        <div style={{ width: "28px", height: "1px", background: "#e03a1e" }} />
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "#00000040",
          }}
        >
          BASED IN INDIA — OPEN TO WORLD
        </span>
      </div>
    </section>
  );
}