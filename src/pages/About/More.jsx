import { useEffect } from "react";
import AboutHero from "../../pages/About/AboutHero"
import AboutIntro from "../../pages/About/AboutIntro";
import AboutStory from "../../pages/About/AboutStory";
import AboutGallery from "../../pages/About/AboutGallery";
import AboutWall from "../../pages/About/AboutWall";

import AboutSkills from "../../pages/About/AboutSkills";


export default function AboutMore() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#e05a30", display: "flex", flexDirection: "column" }}>

      {/* Section 1 — polaroid hero */}
      <AboutHero />
      <AboutIntro />
      <AboutStory />
      <AboutGallery />
      {/* <AboutSkills /> */}
      <AboutWall />


    </div>
  );
}