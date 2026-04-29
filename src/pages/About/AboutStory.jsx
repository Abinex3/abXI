import { useEffect, useRef } from "react";

// ── Google Fonts (add to your index.html <head> if not already present) ───────
// <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
// ─────────────────────────────────────────────────────────────────────────────

// ── Brand colours ─────────────────────────────────────────────────────────────
const C_BG        = "#F05235";
const C_HEADING   = "#1A0800";
const C_SCRIPT    = "#fff";
const C_UNDERLINE = "#1A0800";
const C_BODY      = "#581A12";
const C_DIVIDER   = "rgba(88,26,18,0.25)";
const C_TAG_BG    = "rgba(26,8,0,0.1)";
const C_TAG_TEXT  = "#1A0800";
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

export default function AboutStory() {
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
      { threshold: 0.1 }
    );
    targets.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = `opacity 0.75s ease ${i * 0.14}s, transform 0.75s ease ${i * 0.14}s`;
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
          The Origin
        </span>
        <div style={{ flex: 1, height: 1, background: C_DIVIDER }} />
      </div>

      {/* ── Big headline ── */}
      <div
        data-reveal
        style={{
          textAlign: "center",
          marginBottom: 90,
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
            It started with
          </span>
        </div>

        <div style={{ lineHeight: 1.05, marginBottom: 4 }}>
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: 600,
              fontSize: "clamp(50px, 8.5vw, 120px)",
              color: C_SCRIPT,
              letterSpacing: "0.01em",
              display: "inline-block",
              position: "relative",
              paddingBottom: 6,
            }}
          >
            a Nokia phone
            <ScriptUnderline />
          </span>
        </div>

        <div style={{ lineHeight: 1.05, marginBottom: 4 }}>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(52px, 9vw, 128px)",
              color: C_HEADING,
              letterSpacing: "0.01em",
            }}
          >
            and one question
          </span>
        </div>

        <div style={{ lineHeight: 1.05 }}>
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: 600,
              fontSize: "clamp(50px, 8.5vw, 120px)",
              color: C_SCRIPT,
              letterSpacing: "0.01em",
              display: "inline-block",
              position: "relative",
              paddingBottom: 6,
            }}
          >
            how does this work?
            <ScriptUnderline />
          </span>
        </div>
      </div>

      {/* ── Story body — asymmetric two-column ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "0 7vw",
          maxWidth: 1020,
          margin: "0 auto 80px",
          position: "relative",
          zIndex: 10,
          alignItems: "start",
        }}
      >
        {/* Left — XI monogram + brand note */}
        <div data-reveal>
          {/* Ghost XI */}
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(120px, 18vw, 220px)",
              lineHeight: 0.85,
              color: "rgba(26,8,0,0.1)",
              letterSpacing: "-0.02em",
              userSelect: "none",
              marginBottom: 24,
            }}
          >
            XI
          </div>

          {/* Age tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: C_TAG_BG,
              border: "1px solid rgba(26,8,0,0.15)",
              borderRadius: 2,
              padding: "8px 14px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C_TAG_TEXT,
              }}
            >
              Age 11 · The spark
            </span>
          </div>

          {/* Brand callout */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(13px, 1vw, 15px)",
              fontWeight: 400,
              lineHeight: 1.75,
              color: C_BODY,
              margin: 0,
              maxWidth: 280,
            }}
          >
            XI is the Roman numeral for 11 — the age everything clicked.
            That's why the brand is called{" "}
            <strong style={{ fontWeight: 700, color: C_HEADING }}>abXI</strong>.
            Every project carries that original question inside it.
          </p>
        </div>

        {/* Right — story paragraphs */}
        <div>
          <p
            data-reveal
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              fontWeight: 300,
              lineHeight: 1.85,
              color: C_BODY,
              margin: "0 0 28px",
            }}
          >
            I was 11 years old. One Nokia phone, a slow mobile connection,
            and a website I'd stumbled on that held over{" "}
            <strong style={{ fontWeight: 600, color: C_HEADING }}>
              a thousand games
            </strong>{" "}
            — all downloadable with a single tap.
          </p>

          <p
            data-reveal
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              fontWeight: 300,
              lineHeight: 1.85,
              color: C_BODY,
              margin: "0 0 28px",
            }}
          >
            I didn't understand it. How could one website hold that much?
            How did a tap on a tiny screen reach somewhere invisible and
            pull something real back to my phone? I couldn't let the
            question go.
          </p>

          <p
            data-reveal
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              fontWeight: 300,
              lineHeight: 1.85,
              color: C_BODY,
              margin: 0,
            }}
          >
            That curiosity is the only reason I chose Computer Science.
            Not a salary. Not a trend. Just{" "}
            <strong style={{ fontWeight: 600, color: C_HEADING }}>
              a kid who needed to understand the magic
            </strong>{" "}
            — and never stopped needing to.
          </p>

          {/* Pull quote */}
          <div
            data-reveal
            style={{
              borderLeft: "3px solid rgba(26,8,0,0.2)",
              paddingLeft: 24,
              marginTop: 48,
            }}
          >
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontWeight: 600,
                fontSize: "clamp(20px, 2.2vw, 30px)",
                color: C_HEADING,
                lineHeight: 1.45,
                margin: 0,
              }}
            >
              "The question at 11 is the same question I ask at every
              project kickoff — how does this actually work?"
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom divider ── */}
      <div
        data-reveal
        style={{
          width: "100%",
          height: 1,
          background: C_DIVIDER,
          position: "relative",
          zIndex: 10,
        }}
      />
    </section>
  );
}