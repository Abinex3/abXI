import { useEffect } from "react";
import AboutHero from "../../pages/About/AboutHero"
import AboutIntro from "../../pages/About/AboutIntro";
import AboutStory from "../../pages/About/AboutStory";
import AboutGallery from "../../pages/About/AboutGallery";
import AboutWall from "../../pages/About/AboutWall";
import DayInLife from "../../pages/About/DayInLife";

import AboutSkills from "../../pages/About/AboutSkills";
import ContactSection from "../ContactSection";
import Footer from "../Footer";
import usePageTitle from "../../hooks/usePageTitle";


export default function AboutMore() {
    usePageTitle("About");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* Section 1 — polaroid hero */}
      <AboutHero />
      <AboutIntro />
      <AboutStory />
      <AboutGallery />
      {/* <AboutSkills /> */}
      
      <AboutWall />
      {/* <DayInLife />  */}
      <ContactSection />
              <Footer />
      


    </div>
  );
}