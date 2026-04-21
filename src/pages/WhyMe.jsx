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
<<<<<<< HEAD
  
];

const SEGMENTS = [
  [{ x: 360, y: 0 },   { x: 360, y: 100 }, { x: 40,  y: 150 }, { x: 40,  y: 280 }],
  [{ x: 40,  y: 280 }, { x: 40,  y: 400 }, { x: 360, y: 440 }, { x: 360, y: 560 }],
  [{ x: 360, y: 560 }, { x: 360, y: 680 }, { x: 40,  y: 720 }, { x: 40,  y: 874 }],
=======
>>>>>>> 24a9e748e0160425c8db38e3ffa6bf6b56904b69
];

const PATH_VB_W = 400;
const PATH_VB_H = 874;
<<<<<<< HEAD

// ── How far ahead of the curve point the FRONT wheel sits (viewBox units) ──
// The bike image is 220px wide; front wheel is roughly 160px ahead of rear wheel.
// In viewBox X units (rightColW maps PATH_VB_W → real px), we offset by ~60 vb units.
const FRONT_WHEEL_OFFSET = 0.04; // in progress units (tweak if needed)

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
=======
// Change PATH_D start point
const PATH_D = `
  M 400,0
  C 400,100  40,150  40,280
  C 40,400   400,440 400,560
  C 400,680  40,720  40,874
`;
function getPathPosAngle(pathEl, progress) {
  const len = pathEl.getTotalLength();
  const t = Math.max(0, Math.min(1, progress));
  const pt = pathEl.getPointAtLength(t * len);
  const delta = 3;
  const ptAhead = pathEl.getPointAtLength(Math.min(t * len + delta, len));
  const angle =
    Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * (180 / Math.PI);
  return { x: pt.x, y: pt.y, angle };
}

export default function WhyMe() {
  const sectionRef  = useRef(null);
  const bikeWrapRef = useRef(null);
  const pathMathRef = useRef(null);
  const pathGlowRef = useRef(null);
  const pathDashRef = useRef(null);
  const itemsRef    = useRef([]);
  const rafRef      = useRef(null);
  const canvasRef = useRef(null);
>>>>>>> 24a9e748e0160425c8db38e3ffa6bf6b56904b69

  useEffect(() => {
    const section  = sectionRef.current;
    const bikeWrap = bikeWrapRef.current;
<<<<<<< HEAD
    const canvas   = canvasRef.current;
    if (!section || !bikeWrap || !canvas) return;
=======
    const pathMath = pathMathRef.current;
    const pathGlow = pathGlowRef.current;
    const pathDash = pathDashRef.current;
    if (!section || !bikeWrap || !pathMath || !pathGlow || !pathDash) return;

    const totalLen = pathMath.getTotalLength();

    // setAttribute wins over CSS specificity conflicts on SVG elements
    pathGlow.setAttribute("stroke-dasharray",  totalLen);
    pathGlow.setAttribute("stroke-dashoffset", totalLen);

    // Dash pattern baked into dasharray alongside total length
    // "10 10" repeating pattern, revealed via dashoffset
    pathDash.setAttribute("stroke-dasharray",  `10 10`);
    pathDash.setAttribute("stroke-dashoffset", totalLen);
>>>>>>> 24a9e748e0160425c8db38e3ffa6bf6b56904b69

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect     = section.getBoundingClientRect();
        const sectionH = section.offsetHeight;
        const sectionW = section.offsetWidth;
<<<<<<< HEAD
        

        const scrolled  = -rect.top;
        const total     = sectionH - window.innerHeight;
        const progress  = Math.max(0, Math.min(1, scrolled / total));

//         const fadeStart = 0.92;
// const opacity = progress >= 1 ? 0 : progress >= fadeStart
//   ? 1 - (progress - fadeStart) / (1 - fadeStart)
//   : 1;

// bikeWrap.style.opacity = opacity;
// canvas.style.opacity   = opacity;

=======

        const scrolled = -rect.top;
        const total    = sectionH - window.innerHeight;
        const progress = Math.max(0, Math.min(1, scrolled / total));

        // Bike position
>>>>>>> 24a9e748e0160425c8db38e3ffa6bf6b56904b69
        const rightColW       = sectionW * 0.45;
        const rightColOffsetX = sectionW * 0.55;
        const scaleX = rightColW / PATH_VB_W;
        const scaleY = sectionH  / PATH_VB_H;

<<<<<<< HEAD
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

        // Trail draws up to front wheel so road covers both tyres
        drawTrail(canvas, progress, frontProgress, scaleX, scaleY, rightColOffsetX);

        
=======
        const { x, y, angle } = getPathPosAngle(pathMath, progress);

        const realX = rightColOffsetX + x * scaleX;
        const realY = y * scaleY;
bikeWrap.style.transform = `translate(${realX - 110}px, ${realY - 45}px) rotate(${angle + 180}deg)`;

        // Reveal trail — shrinks dashoffset from totalLen → 0
        const remaining = totalLen * (1 - progress);
        pathGlow.setAttribute("stroke-dashoffset", remaining);
        pathDash.setAttribute("stroke-dashoffset", remaining);
>>>>>>> 24a9e748e0160425c8db38e3ffa6bf6b56904b69
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
<<<<<<< HEAD
            el.style.opacity   = "1";
=======
            el.style.opacity = "1";
>>>>>>> 24a9e748e0160425c8db38e3ffa6bf6b56904b69
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

<<<<<<< HEAD
  return (
    // ✅ FIX 2: removed the outer wrapper div that caused the double scrollbar.
    // overflow: "hidden" on section clips the canvas/bike that go outside bounds.
    <section
      ref={sectionRef}
      style={{
        background: "#e8e0d5",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflowX: "hidden", // ✅ clips horizontal overflow (bike/trail) without adding a vertical scrollbar
        display: "grid",
        gridTemplateColumns: "55% 45%",
        alignItems: "start",
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
          overflow: "hidden",
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
          willChange: "transform",
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
=======
  // After section/bikeWrap/pathMath refs check, add:
const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");

// Match canvas pixel size to its display size
const resizeCanvas = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Store all points the bike has visited
const points = [];

const onScroll = () => {
  if (rafRef.current) cancelAnimationFrame(rafRef.current);
  rafRef.current = requestAnimationFrame(() => {
    const rect     = section.getBoundingClientRect();
    const sectionH = section.offsetHeight;
    const sectionW = section.offsetWidth;

    const scrolled = -rect.top;
    const total    = sectionH - window.innerHeight;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    const rightColW       = sectionW * 0.45;
    const rightColOffsetX = sectionW * 0.55;
    const scaleX = rightColW / PATH_VB_W;
    const scaleY = sectionH  / PATH_VB_H;

    const { x, y, angle } = getPathPosAngle(pathMath, progress);

    const realX = rightColOffsetX + x * scaleX;
    const realY = y * scaleY;

    bikeWrap.style.transform = `translate(${realX - 110}px, ${
      realY - 45
    }px) rotate(${angle + 180}deg)`;

    // Record this point — canvas coords are relative to right column
    // so subtract the right column's left offset
    const canvasX = realX - (sectionW * 0.55);
    const canvasY = realY;

    points.push({ x: canvasX, y: canvasY });

    // Redraw all points as a connected line
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  });
};

return () => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", resizeCanvas);
  if (rafRef.current) cancelAnimationFrame(rafRef.current);
};

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <section
        ref={sectionRef}
        style={{
          background: "#e8e0d5",
          fontFamily: "'Inter', sans-serif",
          position: "relative",
          overflow: "visible",
          display: "grid",
          gridTemplateColumns: "55% 45%",
          alignItems: "start",
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div
          style={{
            padding: "8rem 3rem 8rem 4rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Heading */}
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

          {/* Reasons */}
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

          {/* Bottom label */}
          <div
            style={{
              marginTop: "6rem",
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
        </div>

        {/* ── RIGHT COLUMN — sticky lane ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {/* Hidden SVG — math reference only, never rendered */}
          <svg
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              opacity: 0,
              pointerEvents: "none",
            }}
            viewBox={`0 0 ${PATH_VB_W} ${PATH_VB_H}`}
            preserveAspectRatio="none"
          >
            <path
              ref={pathMathRef}
              d={PATH_D}
              fill="none"
              stroke="none"
            />
          </svg>

          <canvas
  ref={canvasRef}
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 1,
  }}
/>

          {/* Visible SVG — trail draws as bike scrolls */}
{/* Visible SVG — trail draws as bike scrolls */}
<svg
  style={{
    position: "absolute",
    top: 0, left: 0,
    width: "100%", height: "100%",
    pointerEvents: "none",
    zIndex: 1,
  }}
  viewBox={`0 0 ${PATH_VB_W} ${PATH_VB_H}`}
  preserveAspectRatio="none"
>
  {/* 1px solid red debug border — shows exact bike route */}
  <path
    d={PATH_D}
    stroke="red"
    strokeWidth="1"
    fill="none"
  />

  {/* Wide soft glow */}
  <path
    ref={pathGlowRef}
    d={PATH_D}
    stroke="#00000012"
    strokeWidth="28"
    strokeLinecap="round"
    fill="none"
  />
  {/* Dashed centre line */}
  <path
    ref={pathDashRef}
    d={PATH_D}
    stroke="#00000040"
    strokeWidth="2"
    strokeLinecap="round"
    fill="none"
  />
</svg>
        </div>

        {/* ── BIKE — absolute to section, travels full height ── */}
        <div
          ref={bikeWrapRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "220px",
            pointerEvents: "none",
            zIndex: 10,
            transformOrigin: "110px 80px",
            willChange: "transform",
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
    </div>
>>>>>>> 24a9e748e0160425c8db38e3ffa6bf6b56904b69
  );
}