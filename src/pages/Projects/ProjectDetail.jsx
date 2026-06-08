import { useParams } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectDetailHero from "./ProjectDetail/ProjectDetailHero";
import ProjectDetailInfo from "./ProjectDetail/ProjectDetailInfo";
import ProjectShowcase from "./ProjectDetail/ProjectShowcase";
import ContactSection from "../ContactSection";
import Footer from "../Footer";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) return <div>Project not found.</div>;

  return (
    <div>
      {/* Sticky hero */}
      <div style={{ position: "sticky", top: 0, zIndex: 0 }}>
        <ProjectDetailHero project={project} />
      </div>

      {/* Scrolling content over hero */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <ProjectDetailInfo info={project.info} />
        <ProjectShowcase
          project={project}
          quote={project.quote}
          features={project.features}
        />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}