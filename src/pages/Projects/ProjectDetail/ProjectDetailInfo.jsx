import { useRef, useEffect, useState } from "react";

function Reveal({ children, delay = 0 }) {
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
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function ProjectDetailInfo({ info }) {
  if (!info) return null;

  // Overview-only projects (Jaya, Sea-See) vs full projects (EBD, Infraconsoft)
  const isOverviewOnly = Boolean(info.overview);

  const blocks = isOverviewOnly
    ? [{ title: null, text: info.overview }]
    : [
        { title: "CHALLENGE", text: info.challenge },
        { title: "SOLUTION", text: info.solution },
        { title: "RESULTS", text: info.results },
      ];

  return (
    <section
      style={{
        backgroundColor: "#e8e0d5",
        padding: "200px 48px 100px", // extra top space
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          maxWidth: "1600px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {/* Left — label + title */}
        <div style={{ position: "sticky", top: "120px", alignSelf: "start" }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "1px",
              color: "#0f0f0f",
            }}
          >
            INFO
          </span>

          <h2
            style={{
              fontSize: "clamp(56px, 7vw, 110px)",
              lineHeight: 0.95,
              margin: "60px 0 0",
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
              PROJECT
            </span>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontWeight: 500,
                color: "#ee5230",
                display: "block",
                fontSize: "1em",
                lineHeight: 1,
              }}
            >
              OVERVIEW
            </span>
          </h2>
        </div>

        {/* Right — overview, or challenge / solution / results */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {blocks.map((block, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                style={{
                  borderTop: "1px solid #0f0f0f",
                  paddingTop: "28px",
                  paddingBottom: i === blocks.length - 1 ? "0" : "60px",
                }}
              >
                {block.title && (
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "30px",
                      fontWeight: 900,
                      color: "#0f0f0f",
                      margin: "0 0 20px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {block.title}
                  </h3>
                )}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "18px",
                    lineHeight: 1.6,
                    color: "#1a1a1a",
                    margin: 0,
                    maxWidth: "560px",
                  }}
                >
                  {block.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}