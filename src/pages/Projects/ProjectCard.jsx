export default function ProjectCard({ project }) {
  const isFeatured = project.featured;
  const projectType = project.company === "Personal" ? "PERSONAL" : "WORK";

  return (
    <div
      style={{
        gridColumn: isFeatured ? "span 2" : "span 1",
        gridRow: isFeatured ? "span 2" : "span 1",
        position: "relative",
        overflow: "hidden",
        borderRadius: "6px",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* NEW Badge - Featured Only */}
      {isFeatured && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: "#E8440A",
            border: "2px solid #0f0f0f",
            borderRadius: "3px",
            padding: "4px 10px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "11px",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "1px",
            zIndex: 10,
            textTransform: "uppercase",
          }}
        >
          NEW
        </div>
      )}

      {/* Image Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: isFeatured ? "280px" : "240px",
          overflow: "hidden",
          backgroundColor: "#e0e0e0",
        }}
      >
        <img
          src={project.image}
          alt={project.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Tags - Show on Hover */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            display: "flex",
            gap: "8px",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          className="project-card-tags"
        >
          {/* Category Tag */}
          <span
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              padding: "6px 12px",
              fontSize: "12px",
              borderRadius: "4px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {project.category}
          </span>

          {/* Work/Personal Tag */}
          <span
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              padding: "6px 12px",
              fontSize: "12px",
              borderRadius: "4px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {projectType}
          </span>
        </div>
      </div>

      {/* Content - Name + Description */}
      <div
        style={{
          padding: isFeatured ? "28px" : "20px",
          backgroundColor: "#fff",
        }}
      >
        {/* Title */}
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isFeatured ? "28px" : "22px",
            fontWeight: 900,
            color: "#0f0f0f",
            margin: "0 0 8px 0",
            textTransform: "uppercase",
            letterSpacing: "-0.5px",
          }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: isFeatured ? "14px" : "13px",
            color: "#666",
            lineHeight: "1.5",
            margin: 0,
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Hover Effect */}
      <style>{`
        div:has(.project-card-tags):hover .project-card-tags {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}