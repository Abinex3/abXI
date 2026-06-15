import { useEffect, useRef, useState } from "react";

// Full-screen intro loader.
// Black screen. Orange border draws ONE SIDE PER QUARTER, forming a full square,
// perfectly linear pacing:
//   0-25% left (bottom->top), 25-50% top (left->right),
//   50-75% right (top->bottom), 75-100% bottom (right->left).
// Bebas Neue counter ticks 0->100 in the center.
//
// EXIT (two stages):
//   1) contents (square + number) fade out slowly
//   2) the black panel itself slides UP and off the top, revealing the site
// Shows once per browser session.

const ORANGE = "#e03a1e";
const DURATION = 5000; // ms for the count — raise for slower
const CONTENT_FADE = 900; // ms for the square + number to fade
const PANEL_SLIDE = 1100; // ms for the black panel to slide up
const HOLD_AT_FULL = 400; // ms pause at 100% before exit begins

// Maps overall progress (0..100) to fill (0..1) within one quarter.
function segmentFill(progress, startPct, endPct) {
  if (progress <= startPct) return 0;
  if (progress >= endPct) return 1;
  return (progress - startPct) / (endPct - startPct);
}

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  // exit stages: "loading" -> "fading" (content fades) -> "sliding" (panel up)
  const [stage, setStage] = useState("loading");
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    function tick(now) {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / DURATION, 1); // linear
      setProgress(t * 100);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // hold briefly at 100%, then start the content fade
        setTimeout(() => setStage("fading"), HOLD_AT_FULL);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // After the content finishes fading, start sliding the panel up.
  useEffect(() => {
    if (stage !== "fading") return;
    const id = setTimeout(() => setStage("sliding"), CONTENT_FADE);
    return () => clearTimeout(id);
  }, [stage]);

  // When the panel finishes sliding up, reveal the site.
  function handlePanelTransitionEnd(e) {
    if (e.propertyName === "transform" && stage === "sliding") {
      onComplete && onComplete();
    }
  }

  const left = segmentFill(progress, 0, 25);
  const top = segmentFill(progress, 25, 50);
  const right = segmentFill(progress, 50, 75);
  const bottom = segmentFill(progress, 75, 100);
  const shown = Math.round(progress);

  const contentVisible = stage === "loading";

  return (
    <div
      onTransitionEnd={handlePanelTransitionEnd}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: stage === "sliding" ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${PANEL_SLIDE}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        pointerEvents: stage === "loading" ? "auto" : "none",
      }}
    >
      {/* Inner wrapper fades as one unit (square + number together) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: contentVisible ? 1 : 0,
          transition: `opacity ${CONTENT_FADE}ms ease`,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0 }}
        >
          {/* LEFT: bottom -> top */}
          <line
            x1="1" y1="99" x2="1" y2={99 - 98 * left}
            stroke={ORANGE} strokeWidth="2"
            vectorEffect="non-scaling-stroke" strokeLinecap="square"
          />
          {/* TOP: left -> right */}
          <line
            x1="1" y1="1" x2={1 + 98 * top} y2="1"
            stroke={ORANGE} strokeWidth="2"
            vectorEffect="non-scaling-stroke" strokeLinecap="square"
          />
          {/* RIGHT: top -> bottom */}
          <line
            x1="99" y1="1" x2="99" y2={1 + 98 * right}
            stroke={ORANGE} strokeWidth="2"
            vectorEffect="non-scaling-stroke" strokeLinecap="square"
          />
          {/* BOTTOM: right -> left */}
          <line
            x1="99" y1="99" x2={99 - 98 * bottom} y2="99"
            stroke={ORANGE} strokeWidth="2"
            vectorEffect="non-scaling-stroke" strokeLinecap="square"
          />
        </svg>

        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(80px, 18vw, 240px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#ffffff",
            letterSpacing: "-2px",
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {shown}
          <span
            style={{
              fontSize: "clamp(24px, 4vw, 56px)",
              color: ORANGE,
              marginLeft: "6px",
              marginTop: "0.4em",
            }}
          >
            %
          </span>
        </div>
      </div>
    </div>
  );
}