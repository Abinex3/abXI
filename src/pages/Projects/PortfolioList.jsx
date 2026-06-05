import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

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
          gridAutoRows: "auto",
          alignItems: "start",
          columnGap: "48px",
          rowGap: "60px",
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