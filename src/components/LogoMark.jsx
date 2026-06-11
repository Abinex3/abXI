import { motion } from "framer-motion";

const ORANGE = "#E8440A";
const CREAM = "#EAE6DF";

// draw-on settings
const DRAW = {
  duration: 1.1,
  ease: [0.65, 0, 0.35, 1],
};

export default function LogoMark({ size = 120 }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 1920 1080"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
      initial="hidden"
      animate="visible"
      exit="out"
    >
      {/* Outer arc — ORANGE */}
      <motion.path
        d="M967.85,116.07c-239.44-4.35-436.13,192.35-431.78,431.78c0.55,30.45,4.35,60.11,11,88.67c7.29-31.44,18.3-62.47,33.27-92.49c69.31-138.93,209.47-228.81,364.04-234.42c134.29-8.83,246.02,97.17,246.55,229.44c0,0.52,0.42,0.94,0.94,0.94h191.18c0.53,0,0.96-0.43,0.96-0.96C1383.49,307.93,1198.08,120.25,967.85,116.07z"
        fill="none"
        stroke={ORANGE}
        strokeWidth={6}
        variants={{
          hidden: { pathLength: 0, fillOpacity: 0 },
          visible: {
            pathLength: 1,
            fillOpacity: 1,
            fill: ORANGE,
            transition: {
              pathLength: { ...DRAW },
              fillOpacity: { delay: DRAW.duration * 0.7, duration: 0.4 },
            },
          },
          out: {
  pathLength: 0,
  fillOpacity: 0,
  transition: {
    fillOpacity: { duration: 0.3 },
    pathLength: { duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.5 },
  },
},
        }}
      />

      {/* Inner crescent — CREAM */}
      <motion.path
        d="M580.34,544.03c-14.98,30.02-25.99,61.05-33.27,92.49C590.69,823.89,758.5,963.56,959.04,964c0.53,0,0.96-0.43,0.96-0.96V771.87c0-0.52-0.42-0.94-0.94-0.94c-142.25-0.57-254.16-129.75-225.47-277.3c16.01-82.34,97.69-164.02,180.03-180.03c10.36-2.01,20.62-3.31,30.75-3.98C789.81,315.22,649.65,405.1,580.34,544.03z"
        fill="none"
        stroke={CREAM}
        strokeWidth={6}
        variants={{
          hidden: { pathLength: 0, fillOpacity: 0 },
          visible: {
            pathLength: 1,
            fillOpacity: 1,
            fill: CREAM,
            transition: {
              pathLength: { ...DRAW, delay: 0.25 },
              fillOpacity: { delay: DRAW.duration * 0.7 + 0.25, duration: 0.4 },
            },
          },
          out: {
  pathLength: 0,
  fillOpacity: 0,
  transition: {
    fillOpacity: { duration: 0.3 },
    pathLength: { duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.25 },
  },
},
        }}
      />

      {/* Corner block — ORANGE */}
      <motion.path
        d="M1033.42,964c0-193.62,156.96-350.58,350.58-350.58V964H1033.42z"
        fill="none"
        stroke={ORANGE}
        strokeWidth={6}
        variants={{
          hidden: { pathLength: 0, fillOpacity: 0 },
          visible: {
            pathLength: 1,
            fillOpacity: 1,
            fill: ORANGE,
            transition: {
              pathLength: { ...DRAW, delay: 0.5 },
              fillOpacity: { delay: DRAW.duration * 0.7 + 0.5, duration: 0.4 },
            },
          },
          out: {
  pathLength: 0,
  fillOpacity: 0,
  transition: {
    fillOpacity: { duration: 0.3 },
    pathLength: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
  },
},
        }}
      />
    </motion.svg>
  );
}