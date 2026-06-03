// AboutJourney.jsx

import { useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap');

  .journey-item {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .journey-item.visible { opacity: 1; transform: translateY(0); }

  .badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px; border-radius: 999px;
    font-family: 'DM Sans', sans-serif; font-size: 11px;
    font-weight: 500; letter-spacing: 0.06em;
    text-transform: uppercase; margin-bottom: 10px;
  }
  .badge-education { background: #1A0800; color: #e8a87c; }
  .badge-experience { background: #ffd6b8; color: #7a2800; }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: 0.7; }

  .badge-animate { opacity: 0; transform: translateX(-12px); transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s; }
  .journey-item.visible .badge-animate { opacity: 1; transform: translateX(0); }

  .title-reveal { overflow: hidden; display: block; }
  .title-inner { display: block; transform: translateY(110%); transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
  .journey-item.visible .title-inner { transform: translateY(0); }

  .meta-reveal { overflow: hidden; display: block; }
  .meta-inner { display: block; transform: translateY(100%); transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.25s; }
  .journey-item.visible .meta-inner { transform: translateY(0); }

  .journey-divider { width: 0; height: 1px; background: rgba(26,8,0,0.2); margin-bottom: 52px; transition: width 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s; }
  .journey-divider.visible { width: 100%; }
`;

function JourneyItem({ badge, type, title, meta, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add("visible"), delay);
        obs.unobserve(el);
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="journey-item" style={{ marginBottom: 52 }}>
      <span className={`badge badge-${type} badge-animate`}>
        <span className="badge-dot" />
        {badge}
      </span>
      <span className="title-reveal">
        <span className="title-inner" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,7vw,100px)", color: "#1A0800", lineHeight: 0.95 }}>
          {title}
        </span>
      </span>
      <span className="meta-reveal">
        <span className="meta-inner" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px,1.2vw,17px)", color: "#581A12", marginTop: 8, display: "block" }}>
          {meta}
        </span>
      </span>
    </div>
  );
}

function Divider() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="journey-divider" />;
}

export default function AboutJourney() {
  return (
    <>
      <style>{styles}</style>
      <section
        style={{
          position: "relative",
          width: "100%",
          background: "#e05a30",
          padding: "80px 6vw 120px",
          flexShrink: 0,
          borderBottomLeftRadius: "60px",
          borderBottomRightRadius: "60px",
        }}
      >
        <JourneyItem badge="Education" type="education" title="BSc Information Technology" meta="Karpagam Academy of Higher Education · 2020 – 2023" delay={0} />
        <Divider />
        <JourneyItem badge="Experience" type="experience" title="Full Stack Developer" meta="Nissi Infotech · 2023 – 2025" delay={100} />
        <Divider />
        <JourneyItem badge="Education" type="education" title="MCA" meta="Bharathiyar University · 2025 – Present" delay={200} />
      </section>
    </>
  );
}