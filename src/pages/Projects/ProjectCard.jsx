import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTransition } from "../../components/TransitionProvider"; 



export default function ProjectCard({ project }) {
  const { navigateWithTransition } = useTransition();
    const navigate = useNavigate();
  const isFeatured = project.featured;
  const screenshots = project.screenshots || [];
  const hasShots = screenshots.length > 0;

  const [hovered, setHovered] = useState(false);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (hovered && hasShots) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % screenshots.length);
      }, 300);
    } else {
      clearInterval(intervalRef.current);
      setIndex(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered, hasShots, screenshots.length]);

  return (
    <div
  className="project-card"
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  onClick={() => navigateWithTransition(`/work/${project.id}`)}
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
          minHeight: isFeatured ? "360px" : "300px",
          overflow: "hidden",
          backgroundColor: "#0f0f0f",
          borderRadius: "6px",
        }}
      >
        {/* Base image — zooms on hover */}
        <img
          src={project.image}
          alt={project.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 1s ease",
          }}
        />
        {/* Dark frame background on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.85) 100%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            transitionDelay: "0s",
            pointerEvents: "none",
          }}
        />
        
        
        {/* Inset screenshots — scale up from small after 1s, looping */}
        {hasShots && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isFeatured ? "90px 140px" : "70px 80px",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1)" : "scale(0.6)",
              transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: hovered ? "1s" : "0s",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              {screenshots.map((shot, i) => (
                <img
                  key={i}
                  src={shot}
                  alt={`${project.name} screenshot ${i + 1}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: hovered && i === index ? 1 : 0,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {/* Category Tags - bottom right, show on hover */}
        <div
          className="project-card-tags"
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            zIndex: 3,
            display: "flex",
            gap: "8px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: "none",
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
    </div>
  );
}

const tagStyle = {
  background: "transparent",
  color: "#fff",
  padding: "10px 18px",
  fontSize: "14px",
  borderRadius: "8px",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  border: "1px solid rgba(255,255,255,0.7)",
};