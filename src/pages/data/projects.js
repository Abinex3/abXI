import Img1 from "../../assets/projects/project1.jpg";
import Img2 from "../../assets/projects/project2.jpg";
import Img3 from "../../assets/projects/project3.jpg";
// import Img4 from "../../assets/projects/project4.jpg";

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
    name: "EBD Tracking",
    description: "A security tracking system delivered across web and mobile.",
    type: "DESIGN",
    category: "WORK",
    year: "2024",
    featured: true,
    image: Img1,
    screenshots: [Ebd1, Ebd2, Ebd3, Ebd4],
    quote: '"Every patrol, accounted for."',
    info: {
      challenge:
        "Security agencies had no reliable way to confirm whether guards actually patrolled their assigned routes on time, and attendance was logged manually — leaving room for proxy entries and payroll disputes.",
      solution:
        "I built a patrol tracking system that follows each guard's live location within their allocated route and time window, verifies attendance through face recognition, and feeds that verified data straight into payroll.",
      results:
        "Supervisors get real-time visibility over every guard and route, attendance fraud is eliminated through face-based check-ins, and payroll is calculated automatically from verified patrol data.",
    },
    features: [
      {
        title: "Live Route Tracking",
        text: "Track each security guard's location in real time and confirm they stay within their allocated route during their assigned time window.",
      },
      {
        title: "Face Recognition Attendance",
        text: "Guards mark attendance through face recognition, ensuring the right person is present at the right checkpoint with no proxy entries.",
      },
      {
        title: "QR Checkpoint Verification",
        text: "Each checkpoint carries a unique QR code that guards scan during patrol to verify presence and timing along the route.",
      },
      {
        title: "Automated Payroll",
        text: "Verified attendance and patrol data flow directly into payroll, calculating each guard's pay automatically without manual entry.",
      },
    ],
  },
  {
    id: 2,
    name: "Jaya Hospital",
    description: "A responsive hospital website built with React.",
    type: "WEB",
    category: "WORK",
    year: "2023",
    featured: false,
quote: '"Care, made accessible to everyone."',
    image: Img2,
    screenshots: [Jaya1, Jaya2, Jaya3, Jaya4, Jaya5],
    info: {
      overview:
        "A clean, responsive hospital website built for the client on a standard React stack. The site presents the hospital's departments, services, doctors, and contact details in a simple, accessible layout that works smoothly across desktop and mobile.",
    },
  },
  {
    id: 3,
    name: "Infraconsoft v4",
    description: "Construction software for vehicle and inventory management.",
    type: "DEVELOPMENT",
    category: "WORK",
    year: "2024",
    featured: false,
    image: Img3,
    screenshots: [Infra1, Infra2, Infra3, Infra4, Infra5],
    quote: '"Every vehicle, every part, tracked."',
    info: {
      challenge:
        "Construction operations involve a constant flow of vehicles, materials, and stock across sites, and managing all of it on paper made it hard to know what was in stock, which goods came in, and how each vehicle was performing.",
      solution:
        "I developed a construction management platform that tracks vehicles, inventory goods, stock levels, and receipt notes in one place, covering both owned and hired vehicles along with their running kilometres and spare parts.",
      results:
        "Teams now have a single source of truth for inventory and fleet — tracking goods, stock, and receipt notes, and monitoring every owned and hired vehicle's running kilometres and spares without paperwork.",
    },
    features: [
      {
        title: "Inventory & Stock Control",
        text: "Track inventory goods, stock levels, and receipt notes across sites so teams always know what's available and what came in.",
      },
      {
        title: "Vehicle Tracking",
        text: "Manage all owned and hired vehicles in one place, including their assignments and operational status.",
      },
      {
        title: "Running KM & Spares",
        text: "Record each vehicle's running kilometres and spare-part usage to keep maintenance and costs under control.",
      },
      {
        title: "Receipt Notes",
        text: "Log and manage goods receipt notes digitally, keeping a clear record of every item entering the inventory.",
      },
    ],
  },
  {
    id: 4,
    name: "Sea-See",
    description: "An assistive app for fishermen — currently in progress.",
    type: "DESIGN",
    category: "PERSONAL",
    year: "2025",
    featured: false,
    // image,
    screenshots: [],
    info: {
      overview:
        "Sea-See is my personal dream project — an assistive app designed to give fishermen GPS points of fish groups so they no longer return empty-handed. The goal is to guide them toward the right spots at sea and make each trip more productive. The project is still in the concept stage and hasn't started development yet.",
    },
  },
];