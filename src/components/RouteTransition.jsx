// import { useState, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import LogoMark from "./LogoMark";

// const EASE = [0.65, 0, 0.35, 1];
// const COVER_MS = 1000;  // panel rises to cover (1s)
// const HOLD_MS = 1000;    // logo holds centered
// const REVEAL_MS = 5000; // panel exits to top (1s)

// function Overlay() {
//   return (
//     <motion.div
//       style={panelStyle}
//       initial={{ y: "100%" }}
//       animate={{ y: "0%" }}
//       exit={{ y: "-100%" }}
//       transition={{ duration: COVER_MS / 1000, ease: EASE }}
//     >
//       <LogoMark size={350} />
//     </motion.div>
//   );
// }

// export default function RouteTransition({ children }) {
//   const location = useLocation();
//   const [covering, setCovering] = useState(true);
//   const [displayChildren, setDisplayChildren] = useState(children);
//   const isFirst = useRef(true);

//   useEffect(() => {
//     if (isFirst.current) {
//       isFirst.current = false;
//       // intro: already covered, just swap + reveal
//       setDisplayChildren(children);
//       const done = setTimeout(() => setCovering(false), COVER_MS + HOLD_MS);
//       return () => clearTimeout(done);
//     }

//     // route change: cover first, THEN swap page, THEN reveal
//     setCovering(true);
//     const swap = setTimeout(() => {
//       setDisplayChildren(children);   // swap only once fully covered
//     }, COVER_MS + HOLD_MS);
//     const done = setTimeout(() => {
//       setCovering(false);             // reveal the now-swapped page
//     }, COVER_MS + HOLD_MS);

//     return () => { clearTimeout(swap); clearTimeout(done); };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname]);

//   return (
//     <>
//       {displayChildren}
//       <AnimatePresence>
//         {covering && <Overlay key="overlay" />}
//       </AnimatePresence>
//     </>
//   );
// }

// const panelStyle = {
//   position: "fixed",
//   inset: 0,
//   background: "#000",
//   zIndex: 9998,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   pointerEvents: "none",
// };


// src/transition/RouteTransition.jsx
import { AnimatePresence, motion } from "framer-motion";
import LogoMark from "./LogoMark";
import { useTransition } from "./TransitionProvider";

const EASE = [0.65, 0, 0.35, 1];
const COVER_S = 1; // seconds — match COVER_MS

export default function RouteTransition({ children }) {
  const { covering } = useTransition();

  return (
    <>
      {children}
      <AnimatePresence>
        {covering && (
          <motion.div
            key="overlay"
            style={panelStyle}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: COVER_S, ease: EASE }}
          >
            <LogoMark size={350} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const panelStyle = {
  position: "fixed",
  inset: 0,
  background: "#000",
  zIndex: 9998,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
};
