import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects"; // Update path to your projects.js location

export default function PortfolioList() {
  return (
    <section
      style={{
        padding: "60px 48px",
        backgroundColor: "#e8e0d5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: "320px",
          gap: "24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}