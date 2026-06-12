//TransitionProvider.jsx
import { createContext, useContext, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

const COVER_MS = 1000; // panel rises to cover
const HOLD_MS  = 1000;  // logo holds while covered

const TransitionContext = createContext(null);
export const useTransition = () => useContext(TransitionContext);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const [covering, setCovering] = useState(false);
  const busy = useRef(false);

  // Call this instead of navigate() / <a href>
  const navigateWithTransition = useCallback((to) => {
    if (busy.current || !to) return;
    busy.current = true;

    setCovering(true); // 1. start covering — still on current page

    // 2. once fully covered + held, swap the route (page still hidden)
    setTimeout(() => {
      navigate(to);

      // 3. give the new page a tick to mount, then reveal
      setTimeout(() => {
        setCovering(false);
        busy.current = false;
      }, HOLD_MS);
    }, COVER_MS);
  }, [navigate]);

  return (
    <TransitionContext.Provider value={{ covering, navigateWithTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}


export default TransitionProvider;
