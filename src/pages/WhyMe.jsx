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

const SEGMENTS = [
  [{ x: 360, y: 0 },   { x: 360, y: 100 }, { x: 40,  y: 150 }, { x: 40,  y: 280 }],
  [{ x: 40,  y: 280 }, { x: 40,  y: 400 }, { x: 360, y: 440 }, { x: 360, y: 560 }],
  [{ x: 360, y: 560 }, { x: 360, y: 680 }, { x: 40,  y: 720 }, { x: 40,  y: 874 }],
];

const PATH_VB_W = 400;
const PATH_VB_H = 874;

// ── How far ahead of the curve point the FRONT wheel sits (viewBox units) ──
const FRONT_WHEEL_OFFSET = 0.04; // in progress units (tweak if needed)

// ── Reveal control: bike + trail stay hidden until you scroll into the section ──
const REVEAL_START = 0.02; // progress where the bike starts fading in
const REVEAL_END   = 0.07; // progress where the bike is fully visible

function cubicBezier(p0, cp1, cp2, p1, t) {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * cp1.x + 3 * mt * t ** 2 * cp2.x + t ** 3 * p1.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * cp1.y + 3 * mt * t ** 2 * cp2.y + t ** 3 * p1.y,
  };
}

function getCurvePoint(progress) {
  const clamped = Math.max(0, Math.min(1, progress));
  const total   = SEGMENTS.length;
  const scaled  = clamped * total;
  const segIdx  = Math.min(Math.floor(scaled), total - 1);
  const t       = scaled - segIdx;

  const [p0, cp1, cp2, p1] = SEGMENTS[segIdx];
  const pt    = cubicBezier(p0, cp1, cp2, p1, t);
  const ahead = cubicBezier(p0, cp1, cp2, p1, Math.min(t + 0.01, 1));
  const angle = Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * (180 / Math.PI);

  return { x: pt.x, y: pt.y, angle };
}

function buildCurvePoints(scaleX, scaleY, offsetX, count = 300) {
  const pts = [];
  for (let i = 0; i <= count; i++) {
    const { x, y } = getCurvePoint(i / count);
    pts.push({ x: offsetX + x * scaleX, y: y * scaleY });
  }
  return pts;
}

// ── Draw trail from 0 → frontWheelProgress so the road covers BOTH wheels ──
function drawTrail(canvas, rearProgress, frontProgress, scaleX, scaleY, offsetX) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (rearProgress <= 0) return;

  const count    = 300;
  const pts      = buildCurvePoints(scaleX, scaleY, offsetX, count);

  // Trail starts at 0, ends at front wheel position
  const endIdx   = Math.min(Math.round(frontProgress * count), count);
  const slice    = pts.slice(0, endIdx + 1);
  if (slice.length < 2) return;

  const draw = (strokeStyle, lineWidth, dashed) => {
    ctx.beginPath();
    ctx.moveTo(slice[0].x, slice[0].y);
    for (let i = 1; i < slice.length; i++) ctx.lineTo(slice[i].x, slice[i].y);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth   = lineWidth;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.setLineDash(dashed ? [10, 10] : []);
    ctx.stroke();
  };

  draw("rgba(0,0,0,0.06)", 28, false); // glow
  draw("rgba(0,0,0,0.18)", 2,  true);  // dashed centre
}

export default function WhyMe() {
  const sectionRef  = useRef(null);
  const bikeWrapRef = useRef(null);
  const canvasRef   = useRef(null);
  const itemsRef    = useRef([]);
  const rafRef      = useRef(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const bikeWrap = bikeWrapRef.current;
    const canvas   = canvasRef.current;
    if (!section || !bikeWrap || !canvas) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect     = section.getBoundingClientRect();
        const sectionH = section.offsetHeight;
        const sectionW = section.offsetWidth;

        const scrolled  = -rect.top;
        const total     = sectionH - window.innerHeight;
        const progress  = Math.max(0, Math.min(1, scrolled / total));

        // ── Reveal logic: hidden before REVEAL_START, fades in by REVEAL_END.
        //    NO fade-out at the end — the bike simply rides off the bottom and
        //    gets covered by the next (black) container via z-index/clipping. ──
        let opacity;
        if (progress < REVEAL_START) {
          opacity = 0; // invisible at the very top so it doesn't sit parked
        } else if (progress < REVEAL_END) {
          opacity = (progress - REVEAL_START) / (REVEAL_END - REVEAL_START);
        } else {
          opacity = 1; // stays fully visible right through to the end
        }

        bikeWrap.style.opacity = opacity;
        canvas.style.opacity   = opacity;

        const rightColW       = sectionW * 0.45;
        const rightColOffsetX = sectionW * 0.55;
        const scaleX = rightColW / PATH_VB_W;
        const scaleY = sectionH  / PATH_VB_H;

        // Rear wheel sits exactly on the curve point
        const { x, y, angle } = getCurvePoint(progress);
        const realX = rightColOffsetX + x * scaleX;
        const realY = y * scaleY;

        // Front wheel is slightly ahead on the curve
        const frontProgress = Math.min(progress + FRONT_WHEEL_OFFSET, 1);

        // Bike translate: rear wheel (bottom of image ~200px) lands on realX/realY
        bikeWrap.style.transform = `translate(${realX - 110}px, ${
          realY - 200
        }px) rotate(${angle + 180}deg)`;

        // Canvas sized to section
        if (canvas.width !== sectionW)  canvas.width  = sectionW;
        if (canvas.height !== sectionH) canvas.height = sectionH;

        // Only draw the trail once the bike has begun revealing
        if (opacity > 0) {
          drawTrail(canvas, progress, frontProgress, scaleX, scaleY, rightColOffsetX);
        } else {
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const observers = itemsRef.current.map((el) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity   = "1";
            el.style.transform = "translateY(0)";
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    // ✅ The section itself is a normal page-flow block. We do NOT put overflow
    //    on it (that was creating a nested scroll container → second scrollbar).
    //    Instead, an inner .clip wrapper clips the absolutely-positioned bike +
    //    canvas so nothing spills past the section bounds.
    <section
      ref={sectionRef}
      style={{
        background: "#e8e0d5",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "55% 45%",
        alignItems: "start",
        // ✅ FIX: clip overflow on the section block itself. `clip` does NOT
        //    create a scroll container (unlike `hidden`/`auto`), so it removes
        //    the stray second scrollbar while still hiding the bike/trail that
        //    extend beyond the edges.
        overflow: "clip",
      }}
    >
      {/* ════════════ LEFT COLUMN ════════════ */}
      <div
        style={{
          padding: "8rem 3rem 8rem 4rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ marginBottom: "6rem" }}>
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
              fontSize: "clamp(2.5rem, 5.5vw, 7rem)",
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

        <div style={{ display: "flex", flexDirection: "column", gap: "5.5rem" }}>
          {reasons.map((r, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: `opacity 0.65s ease ${i * 0.08}s, transform 0.65s ease ${i * 0.08}s`,
              }}
            >
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
                  fontSize: "clamp(1.4rem, 2.2vw, 2.4rem)",
                  fontWeight: 900,
                  color: "#111",
                  lineHeight: 1,
                  marginBottom: "1.1rem",
                }}
              >
                {r.title}
              </h3>
              <div
                style={{
                  width: "40px",
                  height: "1.5px",
                  background: "#e03a1e",
                  marginBottom: "1.1rem",
                }}
              />
              <p
                style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.85,
                  color: "#00000068",
                  maxWidth: "460px",
                }}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ RIGHT COLUMN — sticky lane ════════════ */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          pointerEvents: "none",
        }}
      />

      {/* ════════════ CANVAS TRAIL ════════════ */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0,                      // start hidden; scroll handler reveals it
          transition: "opacity 0.3s ease", // smooth fade for the surprise reveal
        }}
      />

      {/* ════════════ BIKE ════════════ */}
      <div
        ref={bikeWrapRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "220px",
          pointerEvents: "none",
          zIndex: 10,
          transformOrigin: "110px 200px",
          willChange: "transform, opacity",
          opacity: 0,                      // start hidden so it doesn't sit parked at top
          transition: "opacity 0.35s ease",// smooth pop-in once scrolled into view
        }}
      >
        <img
          src={FireGif}
          alt=""
          style={{
            width: "70px",
            position: "absolute",
            right: "-10px",
            left: "auto",
            bottom: "10px",
            transform: "scaleX(-2)",
            zIndex: 9,
            pointerEvents: "none",
          }}
        />
        <img
          src={BikeImg}
          alt="Bike rider"
          style={{
            width: "220px",
            display: "block",
            position: "relative",
            zIndex: 10,
            transform: "scaleX(-1)",
          }}
        />
      </div>
    </section>
  );
}