// ProjectShowcase.jsx
import { useRef, useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768; // below this → single column, no sticky title

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

function Reveal({ children, y = 60, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function FramedShot({ src, alt }) {
  return (
    <div
      style={{
        backgroundColor: "#161616",
        padding: "clamp(24px, 4vw, 60px)",
        borderRadius: "4px",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", display: "block", borderRadius: "2px" }}
      />
    </div>
  );
}

export default function ProjectShowcase({ project, quote, features }) {
  const isMobile = useIsMobile();
  const screenshots = project.screenshots || [];
  const firstTwo = screenshots.slice(0, 2);
  const remaining = screenshots.slice(2);

  return (
    <section
      style={{
        backgroundColor: "#e8e0d5",
        // DESKTOP padding unchanged. MOBILE: tighter sides + less top/bottom.
        padding: isMobile ? "60px 20px" : "100px 48px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* ---- 1. First screenshot — left aligned ---- */}
        {firstTwo[0] && (
          <Reveal>
            <div style={{ maxWidth: "780px", marginRight: "auto" }}>
              <FramedShot
                src={firstTwo[0]}
                alt={`${project.name} screenshot 1`}
              />
            </div>
          </Reveal>
        )}

        {/* ---- 2. Center quote — fills the big space ---- */}
        {quote && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // MOBILE: shorter so it doesn't waste a whole screen.
              minHeight: isMobile ? "40vh" : "70vh",
              padding: isMobile ? "60px 8px" : "0 24px",
            }}
          >
            <Reveal y={40}>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(48px, 8vw, 120px)",
                  lineHeight: 1.05,
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#0f0f0f",
                  margin: 0,
                  maxWidth: "1100px",
                }}
              >
                {quote}
              </h2>
            </Reveal>
          </div>
        )}

        {/* ---- 3. Second screenshot — right aligned ---- */}
        {firstTwo[1] && (
          <Reveal>
            <div style={{ maxWidth: "780px", marginLeft: "auto" }}>
              <FramedShot
                src={firstTwo[1]}
                alt={`${project.name} screenshot 2`}
              />
            </div>
          </Reveal>
        )}

        {/* ---- 4. Key features ---- */}
        {features && features.length > 0 && (
          <div
            style={{
              display: "grid",
              // DESKTOP: two columns (title | list). MOBILE: single column.
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "40px" : "80px",
              alignItems: "start",
              marginTop: isMobile ? "80px" : "clamp(140px, 16vw, 240px)",
            }}
          >
            {/* Left — sticky title (sticky on desktop only) */}
            <div
              style={{
                position: isMobile ? "static" : "sticky",
                top: isMobile ? "auto" : "120px",
                alignSelf: "start",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  letterSpacing: "1px",
                  color: "#0f0f0f",
                }}
              >
                FEATURES
              </span>

              <h2
                style={{
                  fontSize: "clamp(56px, 7vw, 110px)",
                  lineHeight: 0.95,
                  // MOBILE: less gap under the FEATURES label.
                  margin: isMobile ? "24px 0 0" : "60px 0 0",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontWeight: 900,
                    color: "#0f0f0f",
                    display: "block",
                    textTransform: "uppercase",
                  }}
                >
                  KEY
                </span>
                <span
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontWeight: 700,
                    color: "#ee5230",
                    display: "block",
                    fontSize: "1.1em",
                    lineHeight: 1,
                  }}
                >
                  Features
                </span>
              </h2>
            </div>

            {/* Right — numbered feature list */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {features.map((feature, i) => (
                <Reveal key={i} y={40} delay={i * 0.08}>
                  <div
                    style={{
                      borderTop: "1px solid #0f0f0f",
                      paddingTop: "28px",
                      paddingBottom: i === features.length - 1 ? "0" : "48px",
                      display: "flex",
                      gap: "24px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "24px",
                        color: "#ee5230",
                        flexShrink: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "26px",
                          fontWeight: 900,
                          color: "#0f0f0f",
                          margin: "0 0 12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "17px",
                          lineHeight: 1.6,
                          color: "#1a1a1a",
                          margin: 0,
                          maxWidth: "520px",
                        }}
                      >
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ---- 5. Remaining screenshots — staggered left/right ---- */}
        {remaining.map((shot, i) => {
          const overallIndex = i + 2; // continue from the first two
          const isLeft = overallIndex % 2 === 0;
          return (
            <Reveal key={overallIndex}>
              <div
                style={{
                  maxWidth: "780px",
                  marginLeft: isLeft ? "0" : "auto",
                  marginRight: isLeft ? "auto" : "0",
                  marginTop: isMobile ? "80px" : "clamp(140px, 16vw, 240px)",
                }}
              >
                <FramedShot
                  src={shot}
                  alt={`${project.name} screenshot ${overallIndex + 1}`}
                />
              </div>
            </Reveal>
          );
        })}

      </div>
    </section>
  );
}