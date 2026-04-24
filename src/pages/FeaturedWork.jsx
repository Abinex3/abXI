import { useEffect, useRef, useState } from "react";
import Project1 from '../assets/projects/project1.jpeg';
import Project2 from '../assets/projects/project2.jpeg';
import Project3 from '../assets/projects/project3.jpeg';

const projects = [
  {
    number: "01",
    tags: "FULL STACK, REACT, NODE.JS",
    title: "Project Name One",
    desc: "A short compelling line about what this project does and the problem it solves for real users.",
    image: Project1,
    bg: "#111",
  },
  {
    number: "02",
    tags: "FRONTEND, GSAP, TAILWIND",
    title: "Project Name Two",
    desc: "Another punchy line here. Keep it under two sentences — let the screenshot do the heavy lifting.",
    image: Project2,
    bg: "#161616",
  },
  {
    number: "03",
    tags: "BACKEND, API, POSTGRES",
    title: "Project Name Three",
    desc: "What was the problem? What did you build? What changed after? Answer all three in two lines.",
    image: Project3,
    bg: "#111",
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cardProgress, setCardProgress] = useState(projects.map(() => 0));

  useEffect(() => {
    const handleScroll = () => {
      const newProgress = projects.map((_, i) => {
        const card = cardsRef.current[i];
        const nextCard = cardsRef.current[i + 1];
        if (!card || !nextCard) return 0;

        const nextTop = nextCard.getBoundingClientRect().top;
        const windowH = window.innerHeight;
        const stickyOffset = 60 + (i + 1) * 24;
        const progress = Math.max(
          0,
          Math.min(1, (windowH - nextTop - stickyOffset) / (windowH * 0.5))
        );
        return progress;
      });
      setCardProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects" data-theme="dark"
      style={{
        background: "#0a0a0a",
        padding: "6rem 2rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: "1400px", margin: "0 auto 4rem auto" }}>
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
          <span style={{ WebkitTextStroke: "1.5px #fff", color: "transparent" }}>
            WORK
          </span>
        </h2>
      </div>

      {/* Stacking Cards */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {projects.map((p, i) => {
          const isHovered = hoveredIndex === i;
          const progress = cardProgress[i];

          const scale = 1 - progress * 0.06;
          const opacity = 1 - progress * 0.6;
          const translateY = -progress * 24;
          const blur = progress * 3;

          return (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: "sticky",
                top: `${60 + i * 24}px`,
                border: "1px solid #ffffff08",
                borderRadius: "6px",
                overflow: "hidden",
                transformOrigin: "top center",
                zIndex: i + 1,
                cursor: "pointer",
                height: "620px",
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
                filter: `blur(${blur}px)`,
                transition: "opacity 0.08s ease, filter 0.08s ease",
                willChange: "transform, opacity, filter",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  background: p.bg,
                }}
              >
                {/* IMAGE — always fully visible */}
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    zIndex: 1,
                  }}
                />

                {/* DARK OVERLAY — fades in on hover */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.25) 100%)",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    zIndex: 2,
                  }}
                />

                {/* CONTENT */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 3,
                    padding: "3.5rem 4rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Top: number + tags — always visible */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.72rem",
                        letterSpacing: "0.2em",
                        color: "#ffffff60",
                      }}
                    >
                      {p.number}
                    </span>
                    <p
                      style={{
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        color: "#ffffff70",
                        margin: 0,
                      }}
                    >
                      {p.tags}
                    </p>
                  </div>

                  {/* Bottom: title always, desc + button on hover */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(3rem, 5vw, 5rem)",
                        fontWeight: 900,
                        color: "#fff",
                        lineHeight: 1.0,
                        margin: "0 0 1.5rem 0",
                        maxWidth: "600px",
                        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                        transition: "transform 0.45s ease",
                      }}
                    >
                      {p.title}
                    </h3>

                    {/* Desc — slides up on hover */}
                    <div
                      style={{
                        overflow: "hidden",
                        maxHeight: isHovered ? "120px" : "0px",
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(14px)",
                        transition:
                          "max-height 0.45s ease, opacity 0.4s ease 0.08s, transform 0.4s ease 0.08s",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1rem",
                          lineHeight: 1.75,
                          color: "#ffffff80",
                          maxWidth: "480px",
                          marginBottom: "2rem",
                        }}
                      >
                        {p.desc}
                      </p>
                    </div>

                    {/* Button — slides up on hover */}
                    <div
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(10px)",
                        transition: "opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s",
                      }}
                    >
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
                          border: "1px solid #ffffff40",
                          padding: "0.75rem 1.75rem",
                          borderRadius: "2px",
                          transition: "border-color 0.25s, color 0.25s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#e03a1e";
                          e.currentTarget.style.color = "#e03a1e";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#ffffff40";
                          e.currentTarget.style.color = "#fff";
                        }}
                      >
                        VIEW PROJECT →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom line */}
      <div
        style={{
          maxWidth: "1400px",
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
        <div style={{ width: "40px", height: "1px", background: "#e03a1e" }} />
      </div>
    </section>
  );
}