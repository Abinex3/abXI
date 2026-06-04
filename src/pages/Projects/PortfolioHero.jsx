export default function PortfolioHero() {
  return (
    <section
      style={{
        background: "#e8e0d5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        padding: "40px 20px",
      }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        {/* FEATURED */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(70px, 15vw, 200px)",
            fontWeight: 900,
            lineHeight: 0.88,
            color: "#0f0f0f",
            letterSpacing: "-1px",
            margin: 0,
            display: "block",
          }}
        >
          FEATURED
        </div>

        {/* WORK + (5) */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(70px, 15vw, 200px)",
            fontWeight: 900,
            lineHeight: 0.88,
            color: "#0f0f0f",
            letterSpacing: "-1px",
            margin: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <span>WORK</span>
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(60px, 10vw, 180px)",
              color: "#e03a1e",
              fontWeight: 700,
              marginLeft: "-30px",
              position: "relative",
              top: "-10px",
              lineHeight: 1,
              fontStyle: "italic",
            }}
          >
            (5)
          </span>
        </div>
      </div>

      {/* Bottom labels — left and right */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 48px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            color: "#0f0f0f",
            letterSpacing: "0.5px",
          }}
        >
          Curated work only.
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            color: "#0f0f0f",
            letterSpacing: "0.5px",
          }}
        >
          Recent and past projects.
        </span>
      </div>
    </section>
  );
}