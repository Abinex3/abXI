import { useEffect, useRef } from "react";

const projects = [
  {
    number: "01",
    tags: "FULL STACK, REACT, NODE.JS",
    title: "Project Name One",
    desc: "A short compelling line about what this project does and the problem it solves for real users.",
    image: null, // replace with your screenshot import
    bg: "#111",
  },
  {
    number: "02",
    tags: "FRONTEND, GSAP, TAILWIND",
    title: "Project Name Two",
    desc: "Another punchy line here. Keep it under two sentences — let the screenshot do the heavy lifting.",
    image: null,
    bg: "#161616",
  },
  {
    number: "03",
    tags: "BACKEND, API, POSTGRES",
    title: "Project Name Three",
    desc: "What was the problem? What did you build? What changed after? Answer all three in two lines.",
    image: null,
    bg: "#111",
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, 1 - rect.top / window.innerHeight)
        );
        const scale = 1 - i * 0.03 - (1 - progress) * 0.02;
        card.style.transform = `scale(${Math.max(0.9, scale)})`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0a0a0a",
        padding: "6rem 2rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 4rem auto",
          display: "flex",
          alignItems: "baseline",
          gap: "0.5rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1,
            margin: 0,
          }}
        >
          FEATURED{" "}
          <span
            style={{
              WebkitTextStroke: "1.5px #fff",
              color: "transparent",
            }}
          >
            WORK
          </span>
        </h2>
      </div>

      {/* Stacking Cards */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          position: "relative",
        }}
      >
        {projects.map((p, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{
              position: "sticky",
              top: `${60 + i * 24}px`,
              background: p.bg,
              border: "1px solid #ffffff08",
              borderRadius: "6px",
              overflow: "hidden",
              transformOrigin: "top center",
              transition: "transform 0.1s ease",
              zIndex: i + 1,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                minHeight: "420px",
              }}
            >
              {/* Left — text */}
              <div
                style={{
                  padding: "3rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* Tags */}
                  <p
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      color: "#ffffff40",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {p.tags}
                  </p>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(2rem, 3.5vw, 3rem)",
                      fontWeight: 900,
                      color: "#fff",
                      lineHeight: 1.05,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {p.title}
                  </h3>

                  {/* Desc */}
                  <p
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.75,
                      color: "#ffffff60",
                      maxWidth: "340px",
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                {/* Bottom row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "2.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.2em",
                      color: "#ffffff20",
                    }}
                  >
                    {p.number}
                  </span>

                  <a
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      color: "#fff",
                      textDecoration: "none",
                      border: "1px solid #ffffff20",
                      padding: "0.6rem 1.2rem",
                      borderRadius: "2px",
                      transition: "border-color 0.25s, color 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#e03a1e";
                      e.currentTarget.style.color = "#e03a1e";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#ffffff20";
                      e.currentTarget.style.color = "#fff";
                    }}
                  >
                    VIEW PROJECT →
                  </a>
                </div>
              </div>

              {/* Right — image placeholder */}
              <div
                style={{
                  background: "#1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderLeft: "1px solid #ffffff06",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: "420px",
                }}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top left",
                    }}
                  />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.7rem",
                        letterSpacing: "0.2em",
                        color: "#ffffff15",
                        marginBottom: "0.75rem",
                      }}
                    >
                      SCREENSHOT COMING SOON
                    </div>
                    {/* Fake browser chrome placeholder */}
                    <div
                      style={{
                        width: "320px",
                        border: "1px solid #ffffff10",
                        borderRadius: "6px",
                        overflow: "hidden",
                        margin: "0 auto",
                      }}
                    >
                      <div
                        style={{
                          background: "#222",
                          padding: "8px 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                          <div
                            key={c}
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: c,
                            }}
                          />
                        ))}
                        <div
                          style={{
                            flex: 1,
                            height: "18px",
                            background: "#333",
                            borderRadius: "3px",
                            marginLeft: "8px",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          background: "#161616",
                          height: "180px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "1.2rem",
                            color: "#ffffff10",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {p.title}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom line */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "4rem auto 0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "1.2rem",
            color: "#ffffff30",
          }}
        >
          more coming soon...
        </p>
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "#e03a1e",
          }}
        />
      </div>
    </section>
  );
}