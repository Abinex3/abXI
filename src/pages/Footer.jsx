import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Work",    href: "#work"    },
  { label: "About",   href: "#about"   },
  { label: "Why Me",  href: "#why-me"  },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/abxidev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/abxidev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/abxidev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef  = useRef(null);
  const nameRef    = useRef(null);
  const rafRef     = useRef(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  useEffect(() => {
    const footer = footerRef.current;
    const nameEl = nameRef.current;
    if (!footer || !nameEl) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect      = footer.getBoundingClientRect();
        const winH      = window.innerHeight;
        const footerH   = footer.offsetHeight;

        // progress: 0 when footer top hits viewport bottom, 1 when footer is fully visible
        const progress  = Math.max(0, Math.min(1, (winH - rect.top) / (winH + footerH)));

        // Name font-size: starts small (4vw), grows to 18vw as you scroll into footer
        const minSize   = 4;
        const maxSize   = 18;
        const size      = minSize + (maxSize - minSize) * progress;
        nameEl.style.fontSize = `${size}vw`;

        // Slight vertical compression -> expansion (letter-spacing grows too)
        const minSpacing = -0.02;
        const maxSpacing = 0.04;
        const spacing    = minSpacing + (maxSpacing - minSpacing) * progress;
        nameEl.style.letterSpacing = `${spacing}em`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        background: "#e8e0d5",
        fontFamily: "'Inter', sans-serif",
        padding: "5rem 4rem 3rem",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid #00000010",
      }}
    >
      {/* ── Top row: nav links + social icons ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "4rem",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {/* Nav links */}
        <nav
          style={{
            display: "flex",
            gap: "2.5rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1rem",
                letterSpacing: "0.15em",
                color: hoveredLink === link.label ? "#e03a1e" : "#11111170",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              onMouseEnter={() => setHoveredSocial(s.label)}
              onMouseLeave={() => setHoveredSocial(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid #00000020",
                color: hoveredSocial === s.label ? "#e03a1e" : "#11111170",
                background: hoveredSocial === s.label ? "#11111108" : "transparent",
                textDecoration: "none",
                transition: "color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
                transform: hoveredSocial === s.label ? "translateY(-2px)" : "translateY(0)",
                borderColor: hoveredSocial === s.label ? "#e03a1e40" : "#00000020",
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── Big scroll-driven name ── */}
      <div
        style={{
          overflow: "hidden",
          marginBottom: "3rem",
          lineHeight: 1,
        }}
      >
        <h2
          ref={nameRef}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "4vw", // JS takes over on scroll
            fontWeight: 900,
            color: "#111",
            margin: 0,
            lineHeight: 0.85,
            transition: "font-size 0.05s linear, letter-spacing 0.05s linear",
            willChange: "font-size, letter-spacing",
            whiteSpace: "nowrap",
          }}
        >
          ABXI DEV
        </h2>
      </div>

      {/* ── Bottom row: copyright + tagline ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          borderTop: "1px solid #00000010",
          paddingTop: "1.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            color: "#11111140",
          }}
        >
          © {new Date().getFullYear()} — ALL RIGHTS RESERVED
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "20px", height: "1px", background: "#e03a1e" }} />
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "#11111140",
            }}
          >
            DESIGNED & BUILT BY ABXI
          </span>
        </div>
      </div>
    </footer>
  );
}