import { motion } from "framer-motion";

export default function PageTransition() {
  return (
    <>
      {/* Black panel: slides up (out), then back down (in) */}
      <motion.div
        className="transition-panel"
        initial={{ y: "100%" }}      // start covering from bottom
        animate={{ y: "-100%" }}     // exit upward
        exit={{ y: ["−100%", "0%"] }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={panelStyle}
      />

      {/* Logo centered, fades/scales in during cover */}
      <motion.div
        className="transition-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 1] }}
        transition={{ duration: 0.8, times: [0, 0.5, 1] }}
        style={logoStyle}
      >
        <img src="/logo.svg" alt="logo" style={{ width: 120 }} />
      </motion.div>
    </>
  );
}

const panelStyle = {
  position: "fixed",
  inset: 0,
  background: "#000",
  zIndex: 9998,
  pointerEvents: "none",
};

const logoStyle = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  pointerEvents: "none",
};