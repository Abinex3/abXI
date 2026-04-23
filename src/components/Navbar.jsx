import { useEffect, useRef, useState } from "react";
import IMG from "../assets/img.png";
import Logo from "../assets/abxi-01.svg";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "HOME",     href: "#home"     },
  { label: "PROJECTS", href: "#projects" },
  { label: "MY STACK", href: "#stack"    },
  { label: "ABOUT",    href: "#about"    },
  { label: "CONTACT",  href: "#contact"  },
];

const HERO_INLINE_LINKS = [
  { label: "PROJECTS", href: "#projects" },
  { label: "MY STACK", href: "#stack"    },
  { label: "ABOUT",    href: "#about"    },
];

const EMAIL = "hello@yourname.com"; // ← update

const SOCIAL = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourprofile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/yourprofile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/yourprofile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
];

// Shared button style — rounded
const btnBase = {
  fontFamily:    "'Inter', sans-serif",
  fontSize:      "11px",
  fontWeight:    700,
  letterSpacing: "0.1em",
  borderRadius:  "999px",
  transition:    "background 0.2s ease, opacity 0.2s ease",
  cursor:        "pointer",
  border:        "none",
  outline:       "none",
};

export default function Navbar() {
  const [open,    setOpen]    = useState(false);
  const [visible, setVisible] = useState(true);
  const [isHero,  setIsHero]  = useState(true);

  const overlayRef    = useRef(null);
  const linksRef      = useRef([]);
  const overlayFooter = useRef(null);
  const lastScrollY   = useRef(0);

  /* ── Scroll ── */
  useEffect(() => {
    const onScroll = () => {
      const y  = window.scrollY;
      const vh = window.innerHeight;
      setIsHero(y < vh * 0.85);
      if (y < 80) {
        setVisible(true);
      } else if (y > lastScrollY.current + 5) {
        setVisible(false);
        setOpen(false);
      } else if (y < lastScrollY.current - 5) {
        setVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP overlay ── */
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const animTargets = [...linksRef.current, overlayFooter.current].filter(Boolean);

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.killTweensOf([overlay, animTargets]);
      gsap.fromTo(overlay,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "power4.inOut" }
      );
      gsap.fromTo(animTargets,
        { y: 40, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.55, ease: "power3.out", stagger: 0.06, delay: 0.28 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.killTweensOf([overlay, animTargets]);
      gsap.to(animTargets,
        { y: -30, opacity: 0, duration: 0.22, ease: "power2.in", stagger: 0.04 }
      );
      gsap.to(overlay,
        { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "power4.inOut", delay: 0.1 }
      );
    }
  }, [open]);

  return (
    <>
      {/* ════════════════════════════
          FIXED NAVBAR
      ════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          transform:  visible ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >

        {/* ── HERO: Logo | inline links | HIRE ME ── */}
        <div
          className="flex items-center justify-between px-8 py-5"
          style={{
            position:      isHero ? "relative" : "absolute",
            top: 0, left: 0, right: 0,
            opacity:       isHero ? 1 : 0,
            pointerEvents: isHero ? "auto" : "none",
            transform:     isHero ? "translateY(0)" : "translateY(-10px)",
            transition:    "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <img src={Logo} alt="Logo" className="h-8 w-auto select-none" />

          <ul className="flex items-center gap-8">
            {HERO_INLINE_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-black hover:opacity-50 transition-opacity"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            style={{ ...btnBase, background: "black", color: "white", padding: "10px 20px", display: "flex", alignItems: "center", gap: "8px" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "black")}
          >
            <span style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
              <img src={IMG} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </span>
            HIRE ME
          </button>
        </div>

        {/* ── COMPACT: Logo | MENU (hidden when open) | HIRE ME ↔ CLOSE ── */}
        <div
          className="flex items-center justify-between px-8 py-5"
          style={{
            position:      isHero ? "absolute" : "relative",
            top: 0, left: 0, right: 0,
            opacity:       isHero ? 0 : 1,
            pointerEvents: isHero ? "none" : "auto",
            transform:     isHero ? "translateY(10px)" : "translateY(0)",
            transition:    "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* Logo */}
          <img src={Logo} alt="Logo" className="h-8 w-auto select-none" />

          {/* Center: MENU — fades out when overlay opens */}
          <button
            onClick={() => setOpen(true)}
            style={{
              ...btnBase,
              background:    "black",
              color:         "white",
              padding:       "10px 24px",
              opacity:       open ? 0 : 1,
              pointerEvents: open ? "none" : "auto",
              transition:    "background 0.2s ease, opacity 0.25s ease",
            }}
            onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "#333"; }}
            onMouseLeave={(e) => (e.currentTarget.style.background = "black")}
            aria-label="Open menu"
          >
            MENU
          </button>

          {/* Right slot: HIRE ME ↔ CLOSE ✕ */}
          <div style={{ position: "relative", height: "44px", minWidth: "130px" }}>
            {/* HIRE ME */}
            <button
              style={{
                ...btnBase,
                position:      "absolute",
                inset:         0,
                background:    "black",
                color:         "white",
                display:       "flex",
                alignItems:    "center",
                gap:           "8px",
                padding:       "0 20px",
                opacity:       open ? 0 : 1,
                pointerEvents: open ? "none" : "auto",
              }}
              onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "#333"; }}
              onMouseLeave={(e) => (e.currentTarget.style.background = "black")}
            >
              <span style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <img src={IMG} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </span>
              HIRE ME
            </button>

            {/* CLOSE ✕ */}
            <button
              onClick={() => setOpen(false)}
              style={{
                ...btnBase,
                position:      "absolute",
                inset:         0,
                background:    "black",
                color:         "white",
                display:       "flex",
                alignItems:    "center",
                justifyContent:"center",
                gap:           "8px",
                padding:       "0 20px",
                opacity:       open ? 1 : 0,
                pointerEvents: open ? "auto" : "none",
              }}
              onMouseEnter={(e) => { if (open) e.currentTarget.style.background = "#333"; }}
              onMouseLeave={(e) => (e.currentTarget.style.background = "black")}
              aria-label="Close menu"
            >
              CLOSE
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="1" y1="1" x2="11" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="11" y1="1" x2="1"  y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════
          FULLSCREEN OVERLAY
      ════════════════════════════ */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] flex flex-col justify-between"
        style={{
          background:    "#e03a1e",
          clipPath:      "inset(0 0 100% 0)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Links */}
        <div className="flex-1 flex items-center justify-center">
          <ul className="flex flex-col items-center" style={{ gap: "0.05em" }}>
            {NAV_LINKS.map((link, i) => (
              <li key={link.label} style={{ overflow: "hidden" }}>
                <a
                  ref={(el) => (linksRef.current[i] = el)}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display:        "block",
                    fontFamily:     "'Bebas Neue', sans-serif",
                    fontSize:       "clamp(2.8rem, 7.5vw, 6.5rem)",
                    fontWeight:     900,
                    color:          "black",
                    lineHeight:     1.05,
                    textDecoration: "none",
                    transition:     "color 0.15s ease",
                    willChange:     "transform, opacity",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer: social icons left · email right */}
        <div
          ref={overlayFooter}
          className="flex items-center justify-between px-8 pb-7 pt-4"
          style={{ borderTop: "1px solid rgba(0,0,0,0.15)" }}
        >
          <div className="flex items-center gap-5">
            {SOCIAL.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-black/80 hover:text-black transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <a
            href={`mailto:${EMAIL}`}
            className="text-black/80 hover:text-black transition-colors"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </>
  );
}