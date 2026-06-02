// AboutJourney.jsx

export default function AboutJourney() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        background: "#e05a30",
        padding: "80px 6vw 100px",
        flexShrink: 0,
      }}
    >
      {/* BSc IT */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 100px)", color: "#1A0800", lineHeight: 1 }}>
          BSc Information Technology
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.2vw, 17px)", fontWeight: 400, color: "#581A12", marginTop: 8 }}>
          Karpagam Academy of Higher Education · 2020 – 2023
        </div>
      </div>

      {/* Work */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 100px)", color: "#1A0800", lineHeight: 1 }}>
          Full Stack Developer
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.2vw, 17px)", fontWeight: 400, color: "#581A12", marginTop: 8 }}>
          Nissi Infotech · 2023 – 2025
        </div>
      </div>

      {/* MCA */}
      <div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 100px)", color: "#1A0800", lineHeight: 1 }}>
          MCA
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.2vw, 17px)", fontWeight: 400, color: "#581A12", marginTop: 8 }}>
          Bharathiyar University · 2025 – 2027
        </div>
      </div>
    </section>
  );
}