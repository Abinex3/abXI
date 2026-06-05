export default function ProjectCard({ project }) {
  const isFeatured = project.featured;

  return (
    <div
      className="project-card"
      style={{
        gridColumn: isFeatured ? "span 2" : "span 1",
        gridRow: "span 1",
        position: "relative",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",

      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          flex: 1,
           minHeight: isFeatured ? "480px" : "300px",
          overflow: "hidden",
          backgroundColor: "#0f0f0f",
          borderRadius: "6px",
        }}
      >
        <img
          src={project.image}
          alt={project.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Category Tags - show on hover */}
        <div
          className="project-card-tags"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            opacity: 0,
            transition: "opacity 0.3s ease",
            background: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <span style={tagStyle}>{project.type}</span>
          <span style={tagStyle}>{project.category}</span>
        </div>
      </div>

      {/* Name (left) + Description (right) - always visible */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "24px",
          padding: "20px 4px 0",
        }}
      >
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isFeatured ? "34px" : "28px",
            fontWeight: 900,
            color: "#0f0f0f",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0px",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {project.name}
        </h3>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            color: "#444",
            lineHeight: 1.4,
            margin: 0,
            textAlign: "right",
            maxWidth: "55%",
          }}
        >
          {project.description}
        </p>
      </div>

      <style>{`
        .project-card:hover .project-card-tags {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

const tagStyle = {
  background: "#fff",
  color: "#0f0f0f",
  padding: "10px 20px",
  fontSize: "14px",
  borderRadius: "6px",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  border: "1px solid #0f0f0f",
};