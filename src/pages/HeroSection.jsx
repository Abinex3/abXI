import { useEffect, useRef, useState } from "react";
import IMG from "../assets/img.png";
import Logo from "../assets/abxi-01.svg";
import SplitText from "../components/SplitText";

export default function HeroSection() {
  const heroRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const handleMouseMove = (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height } = currentTarget.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 10;
      const img = hero.querySelector(".hero-img");
      if (img) img.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px) scale(1.02)`;
    };
    const reset = () => {
      const img = hero.querySelector(".hero-img");
      if (img) img.style.transform = "translate(0,0) scale(1)";
    };
    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", reset);
    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #e8e0d5 0%, #e8e0d5 40%, #e05a30 100%)",
      }}
    >
      {/* ── NAVBAR — slides down on load ── */}
      <nav
        className="relative z-20 flex items-center justify-between px-8 py-6"
        style={{
          transform: ready ? "translateY(0)" : "translateY(-100%)",
          opacity: ready ? 1 : 0,
          transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
        }}
      >
        <img src={Logo} alt="Logo" className="h-8 w-auto select-none" />

        <ul className="hidden md:flex items-center gap-10">
          {["PROJECTS", "MY STACK", "ABOUT"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-xs font-semibold tracking-widest text-black hover:opacity-60 transition-opacity"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="flex items-center gap-2 bg-black text-white text-xs font-bold tracking-widest px-5 py-3 hover:bg-neutral-800 transition-colors"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
            <img src={IMG} alt="Avatar" className="w-full h-full object-cover" />
          </span>
          HIRE ME
        </button>
      </nav>

      {/* ── HERO BODY ── */}
      <div className="relative flex-1 flex flex-col justify-between">

        {/* ── HEADLINE with SplitText ── */}
       {/* ── HEADLINE with SplitText ── */}
<div className="relative z-10 px-4 pt-2 pointer-events-none select-none">

  {/* Line 1: I TURN IDEAS INTO */}
  <div
  style={{
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "18vw",  // tuned so "FROM ZERO TO" fills full width
    fontWeight: 900,
    lineHeight: 0.88,
  }}
>
    <SplitText
      tag="div"
      text="FROM ZERO TO"
      className="block whitespace-nowrap text-black uppercase"
      splitType="chars"
      delay={30}
      duration={0.7}
      ease="power4.out"
      from={{ opacity: 0, y: 100, skewY: 8 }}
      to={{ opacity: 1, y: 0, skewY: 0 }}
      threshold={0.1}
      rootMargin="0px"
      textAlign="left"
    />
  </div>

  {/* Line 2: PRODUCTS PEOPLE + Actually Use. */}
<div
  className="flex items-baseline"
  style={{
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "18vw",  // same size so both lines match
    fontWeight: 900,
    lineHeight: 0.88,
  }}
>
    <SplitText
      tag="div"
      text="SOMETHING"
      className="whitespace-nowrap text-black uppercase"
      splitType="chars"
      delay={40}
      duration={0.7}
      ease="power4.out"
      from={{ opacity: 0, y: 100, skewY: 8 }}
      to={{ opacity: 1, y: 0, skewY: 0 }}
      threshold={0.1}
      rootMargin="0px"
      textAlign="left"
    />

    <div
      style={{
        fontFamily: "'Caveat', cursive",
        fontSize: "clamp(2.6rem, 9.5vw, 10rem)",
        color: "#e03a1e",
       fontSize: "15vw",  
        fontStyle: "italic",
        lineHeight: 1,
        marginLeft: "0.15em",
      }}
    >
      <SplitText
        tag="div"
        text="Real."
        className="whitespace-nowrap"
        splitType="chars"
        delay={50}
        duration={0.8}
        ease="power4.out"
        from={{ opacity: 0, y: 60, rotate: -10 }}
        to={{ opacity: 1, y: 0, rotate: 0 }}
        threshold={0.1}
        rootMargin="0px"
        textAlign="left"
      />
    </div>
  </div>

</div>

        {/* Portrait — always visible immediately */}
        <div
          className="hero-img absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          style={{
            width: "clamp(260px, 38vw, 560px)",
            transition: "transform 0.15s ease-out",
          }}
        >
          <img
            src={IMG}
            alt="Portrait"
            className="w-full object-contain"
            style={{
              maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
            }}
          />
        </div>

        {/* Bottom bar — fades in last */}
        <div
          className="relative z-30 flex items-end justify-between px-8 pb-7"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 1.2s, transform 0.7s ease 1.2s",
          }}
        >
          <p
  className="max-w-xs text-sm leading-snug text-black/80"
  style={{ fontFamily: "'Inter', sans-serif" }}
>
  Every great product starts with zero.
  <br />I close that gap — fast, clean, and built to last.
</p>
          <span
            className="text-xs font-semibold tracking-widest text-black/70 pb-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            (SCROLL TO SEE THE PROOF)
          </span>
        </div>
      </div>

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-40 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px",
        }}
      />
    </section>
  );
}