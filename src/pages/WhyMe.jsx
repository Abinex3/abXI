import { useEffect, useRef } from "react";
import BikeImg from "../assets/bike.png";
import FireGif from "../assets/fire.gif";

const reasons = [
  {
    number: "01",
    title: "FULL STACK, FRONT TO BACK",
    body: `I don't hand off at the API — I own the whole thing. Database schema, server logic, UI interactions, deployment. I've built and shipped complete products solo, which means I understand how every layer talks to the next. No gaps, no blame-shifting between "frontend" and "backend".`,
  },
  {
    number: "02",
    title: "I WRITE CODE THAT SHIPS",
    body: `Clean architecture isn't just something I talk about in interviews. I write code that's readable, maintainable, and won't collapse the moment someone else touches it. I've worked in production codebases where shortcuts cost weeks — I learned that lesson early.`,
  },
  {
    number: "03",
    title: "GSAP & ANIMATION OBSESSED",
    body: `Most devs slap a fade-in and call it animated. I use GSAP the way it was meant to be used — ScrollTrigger, SplitText, MotionPath. Animation isn't decoration for me, it's a communication tool. If a transition can explain something faster than text, I'll build it that way.`,
  },
  {
    number: "04",
    title: "PROBLEM SOLVER BY NATURE",
    body: `"How the hell do I build that?" is my favourite question. I don't freeze when requirements are vague or the problem is genuinely hard — I break it down, prototype fast, and iterate until it works. Debugging at 2am isn't suffering, it's just the job.`,
  },
  {
    number: "05",
    title: "EASY TO WORK WITH",
    body: `I communicate clearly, hit deadlines, and won't ghost you mid-project. I ask the right questions before I build so we're not undoing a week of work. Whether you're a founder, a team lead, or another dev — working with me should feel like less stress, not more.`,
  },
];

export default function WhyMe() {
  const lineRef = useRef(null);
  const bikeRef = useRef(null);
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const bike = bikeRef.current;
      const line = lineRef.current;
      if (!section || !bike || !line) return;

      const rect = section.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (-rect.top + window.innerHeight * 0.2) /
            (rect.height - window.innerHeight * 0.3)
        )
      );

      // Move bike from left (-300px) to right (110vw) as scroll progresses
      const bikeX = -320 + scrollProgress * (window.innerWidth + 400);
      bike.style.transform = `translateX(${bikeX}px)`;

      // Draw the dashed line
      const totalLength = line.getTotalLength();
      line.style.strokeDasharray = totalLength;
      line.style.strokeDashoffset = totalLength * (1 - scrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers = itemsRef.current.map((el) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#e8e0d5",
        padding: "8rem 2rem",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Bike rider — fixed to scroll progress ── */}
      <div
        ref={bikeRef}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: 0,
          width: "320px",
          transform: "translateX(-320px)",
          transition: "transform 0.05s linear",
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Fire — positioned at exhaust pipe */}
        <img
          src={FireGif}
          alt=""
          style={{
            width: "90px",
            position: "absolute",
            left: "-60px",
            bottom: "38px",
            transform: "scaleX(-1)", // flip so flame faces left (backward)
            zIndex: 9,
            pointerEvents: "none",
          }}
        />
        {/* Bike */}
        <img
          src={BikeImg}
          alt="Bike rider"
          style={{
            width: "320px",
            display: "block",
            position: "relative",
            zIndex: 10,
          }}
        />
      </div>

      {/* Heading */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 6rem auto",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "#00000050",
            marginBottom: "1rem",
          }}
        >
          THE REAL ANSWER
        </p>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 10vw, 9rem)",
            fontWeight: 900,
            color: "#111",
            lineHeight: 0.9,
            margin: 0,
          }}
        >
          WHY WORK{" "}
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontStyle: "italic",
              color: "#e03a1e",
              fontWeight: 700,
            }}
          >
            With Me?
          </span>
        </h2>
      </div>

      {/* Thread + content */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "80px 1fr",
          gap: "0 3rem",
          position: "relative",
        }}
      >
        {/* SVG dashed thread */}
        <div style={{ position: "relative" }}>
          <svg
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              overflow: "visible",
              height: "100%",
              width: "2px",
            }}
            preserveAspectRatio="none"
          >
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="9999"
              stroke="#00000025"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Reasons list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {reasons.map((r, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              style={{
                opacity: 0,
                transform: "translateY(32px)",
                transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
                position: "relative",
              }}
            >
              {/* Thread dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-3.85rem",
                  top: "0.35rem",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: i === 0 ? "#e03a1e" : "#e8e0d5",
                  border: `2px solid ${i === 0 ? "#e03a1e" : "#00000030"}`,
                  zIndex: 2,
                }}
              />

              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  color: "#e03a1e",
                  marginBottom: "0.5rem",
                }}
              >
                {r.number}
              </p>

              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  fontWeight: 900,
                  color: "#111",
                  lineHeight: 1,
                  marginBottom: "1.25rem",
                }}
              >
                {r.title}
              </h3>

              <div
                style={{
                  width: "40px",
                  height: "1.5px",
                  background: "#e03a1e",
                  marginBottom: "1.25rem",
                }}
              />

              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.85,
                  color: "#00000070",
                  maxWidth: "600px",
                }}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "8rem auto 0 auto",
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
          STILL NOT CONVINCED? LET'S TALK.
        </span>
      </div>
    </section>
  );
}