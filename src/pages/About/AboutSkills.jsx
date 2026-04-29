import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

// ── Install cobe first: npm install cobe ──────────────────────────────────────

// ── Brand colours ─────────────────────────────────────────────────────────────
const C_BG       = "#F05235";
const C_HEADING  = "#1A0800";
const C_SCRIPT   = "#fff";
const C_UNDERLINE= "#1A0800";
const C_BODY     = "#581A12";
const C_DIVIDER  = "rgba(88,26,18,0.25)";
const C_CARD_BG  = "rgba(26,8,0,0.07)";
const C_CARD_BDR = "rgba(26,8,0,0.12)";
const C_TAG_BG   = "rgba(26,8,0,0.1)";
const C_TAG_TEXT = "#1A0800";
// ─────────────────────────────────────────────────────────────────────────────

// ── Icon slugs for the floating cloud ────────────────────────────────────────
const SLUGS = [
  "typescript","javascript","dart","java",
  "react","flutter","android","html5","css3",
  "nodedotjs","express","nextdotjs","prisma",
  "amazonaws","postgresql","firebase","nginx","vercel",
  "testinglibrary","jest","cypress","docker",
  "git","jira","github","gitlab",
  "visualstudiocode","androidstudio","sonarqube","figma",
];

// ── Skill categories ──────────────────────────────────────────────────────────
const SKILLS = [
  {
    category: "Frontend",
    icon: "▲",
    items: ["React", "Next.js", "TypeScript", "HTML5", "CSS3", "Flutter"],
  },
  {
    category: "Backend",
    icon: "◈",
    items: ["Node.js", "Express", "Prisma", "PostgreSQL", "Firebase", "Nginx"],
  },
  {
    category: "AI & Integrations",
    icon: "⬡",
    items: ["LLM APIs", "OpenAI", "RAG Pipelines", "LangChain", "Prompt Eng."],
  },
  {
    category: "DevOps & Tools",
    icon: "◎",
    items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Jira", "Figma"],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function Grain() {
  return (
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
  );
}

function ScriptUnderline() {
  return (
    <span
      style={{
        position: "absolute",
        bottom: -4,
        left: 0,
        right: 0,
        height: 3,
        background: C_UNDERLINE,
        borderRadius: 1,
        display: "block",
      }}
    />
  );
}

// ── Floating icon cloud — pure CSS/JS, no external component ─────────────────
function IconCloud() {
  const containerRef = useRef(null);
  const [icons, setIcons] = useState([]);
  const animRef = useRef(null);
  const angleRef = useRef(0);

  // Build 3D sphere positions for each icon
  useEffect(() => {
    const total = SLUGS.length;
    const positions = SLUGS.map((slug, i) => {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        slug,
        phi,
        theta,
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      };
    });
    setIcons(positions);
  }, []);

  // Rotate animation
  useEffect(() => {
    if (!icons.length) return;
    const container = containerRef.current;
    if (!container) return;

    let raf;
    const tick = () => {
      angleRef.current += 0.003;
      const angle = angleRef.current;
      const items = container.querySelectorAll(".cloud-icon");
      items.forEach((el, i) => {
        const icon = icons[i];
        if (!icon) return;
        // Rotate around Y axis
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const rx = icon.x * cosA - icon.z * sinA;
        const rz = icon.x * sinA + icon.z * cosA;
        const ry = icon.y;

        const scale = (rz + 1.6) / 2.6; // depth scale 0.23 → 1
        const size = 420; // sphere radius in px
        const cx = rx * size;
        const cy = ry * size;

        el.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px)) scale(${scale})`;
        el.style.opacity = Math.max(0.15, (rz + 1) / 2);
        el.style.zIndex = Math.round(rz * 10 + 10);
        el.style.filter = rz < 0 ? "blur(0.8px)" : "none";
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [icons]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1/1",
        maxWidth: 460,
        margin: "0 auto",
      }}
    >
      {/* Circle backdrop */}
      <div
        style={{
          position: "absolute",
          inset: "12%",
          borderRadius: "50%",
          background: "rgba(26,8,0,0.05)",
        }}
      />
      {icons.map((icon, i) => (
        <img
          key={icon.slug}
          className="cloud-icon"
          src={`https://cdn.simpleicons.org/${icon.slug}/${icon.slug}`}
          alt={icon.slug}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 32,
            height: 32,
            objectFit: "contain",
            transition: "none",
            willChange: "transform, opacity",
          }}
          onError={(e) => {
            // fallback — hide broken icons
            e.target.style.display = "none";
          }}
        />
      ))}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutSkills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const targets = section.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = `opacity 0.75s ease ${i * 0.12}s, transform 0.75s ease ${i * 0.12}s`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        background: C_BG,
        overflow: "hidden",
        padding: "100px 6vw 120px",
      }}
    >
      <Grain />

      {/* ── Section label ── */}
      <div
        data-reveal
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 72,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ flex: 1, height: 1, background: C_DIVIDER }} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C_BODY,
          }}
        >
          Skills & Stack
        </span>
        <div style={{ flex: 1, height: 1, background: C_DIVIDER }} />
      </div>

      {/* ── Headline ── */}
      <div
        data-reveal
        style={{
          textAlign: "center",
          marginBottom: 80,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ lineHeight: 1.05, marginBottom: 4 }}>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(52px, 9vw, 128px)",
              color: C_HEADING,
              letterSpacing: "0.01em",
            }}
          >
            tools I reach for
          </span>
        </div>
        <div style={{ lineHeight: 1.05 }}>
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: 600,
              fontSize: "clamp(48px, 8.2vw, 116px)",
              color: C_SCRIPT,
              letterSpacing: "0.01em",
              display: "inline-block",
              position: "relative",
              paddingBottom: 6,
            }}
          >
            without thinking twice
            <ScriptUnderline />
          </span>
        </div>
      </div>

      {/* ── Two-column: skill cards + icon cloud ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "0 4vw",
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          alignItems: "center",
        }}
      >
        {/* Left — skill cards */}
        <div
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {SKILLS.map((skill, i) => (
            <div
              key={i}
              style={{
                background: C_CARD_BG,
                border: `1px solid ${C_CARD_BDR}`,
                borderRadius: 4,
                padding: "24px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    color: C_HEADING,
                    opacity: 0.45,
                    lineHeight: 1,
                  }}
                >
                  {skill.icon}
                </span>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(15px, 1.5vw, 20px)",
                    color: C_HEADING,
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                  }}
                >
                  {skill.category}
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {skill.items.map((item, j) => (
                  <span
                    key={j}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.07em",
                      color: C_TAG_TEXT,
                      background: C_TAG_BG,
                      border: "1px solid rgba(26,8,0,0.12)",
                      borderRadius: 2,
                      padding: "4px 10px",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right — self-contained icon cloud */}
        <div data-reveal>
          <IconCloud />
        </div>
      </div>

      {/* ── Bottom note ── */}
      <p
        data-reveal
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(12px, 1vw, 14px)",
          fontWeight: 400,
          lineHeight: 1.7,
          color: C_BODY,
          textAlign: "center",
          maxWidth: 520,
          margin: "60px auto 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        The stack is always the servant, never the master — I pick what
        solves the problem fastest, not what's trending.
      </p>

      {/* ── Bottom divider ── */}
      <div
        data-reveal
        style={{
          width: "100%",
          height: 1,
          background: C_DIVIDER,
          marginTop: 60,
          position: "relative",
          zIndex: 10,
        }}
      />
    </section>
  );
}