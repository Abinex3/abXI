import { useEffect } from "react";
import AboutHero from "../../pages/About/AboutHero"
import AboutIntro from "../../pages/About/AboutIntro";
import AboutStory from "../../pages/About/AboutStory";
import AboutSkills from "../../pages/About/AboutSkills";


// Future sections slot in below:
// import AboutStory from "./about/AboutStory";
// import AboutSkills from "./about/AboutSkills";
// import AboutContact from "./about/AboutContact";

export default function AboutMore() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#e05a30" }}>
      {/* Section 1 — polaroid hero */}
      <AboutHero />
      <AboutIntro />
      <AboutStory />
       <AboutSkills />  


      {/* Section 2, 3, 4 … added here as you build them */}
    </div>
  );
}