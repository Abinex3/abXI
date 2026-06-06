import Img1 from "../../assets/projects/project1.jpeg";
import Img2 from "../../assets/projects/project2.jpeg";
import Img3 from "../../assets/projects/project3.jpeg";
import Img4 from "../../assets/projects/project4.jpeg";

// EBD screenshots
import Ebd1 from "../../assets/projects/edb/screen-1.png";
import Ebd2 from "../../assets/projects/edb/screen-2.png";
import Ebd3 from "../../assets/projects/edb/screen-3.png";
import Ebd4 from "../../assets/projects/edb/screen-4.png";

// Jaya screenshots
import Jaya1 from "../../assets/projects/jaya/jaya-1.png";
import Jaya2 from "../../assets/projects/jaya/jaya-2.png";
import Jaya3 from "../../assets/projects/jaya/jaya-3.png";
import Jaya4 from "../../assets/projects/jaya/jaya-4.png";
import Jaya5 from "../../assets/projects/jaya/jaya-5.png";

// Infra screenshots
import Infra1 from "../../assets/projects/infra/infra-1.png";
import Infra2 from "../../assets/projects/infra/infra-2.png";
import Infra3 from "../../assets/projects/infra/infra-3.png";
import Infra4 from "../../assets/projects/infra/infra-4.png";
import Infra5 from "../../assets/projects/infra/infra-5.png";

export const projects = [
  {
    id: 1,
    name: "EBD Tracking System",
    description: "A security tracking system delivered across web and mobile.",
    type: "DESIGN",
    category: "WORK",
    featured: true,
    image: Img1,
    screenshots: [Ebd1, Ebd2, Ebd3, Ebd4],
  },
  {
    id: 2,
    name: "Jaya Hospital",
    description: "A responsive hospital website built with React.",
    type: "WEB",
    category: "WORK",
    featured: false,
    image: Img2,
    screenshots: [Jaya1, Jaya2, Jaya3, Jaya4, Jaya5],
  },
  {
    id: 3,
    name: "Infraconsoft v4",
    description: "Construction software for vehicle and inventory management.",
    type: "DEVELOPMENT", 
    category: "WORK",
    featured: false,
    image: Img3,
    screenshots: [Infra1, Infra2, Infra3, Infra4, Infra5],
  },
  {
    id: 4,
    name: "Sea-See",
    description: "An assistive app for fishermen — currently in progress.",
    type: "DESIGN",
    category: "PERSONAL",
    featured: false,
    image: Img4,
    screenshots: [],
  },
];