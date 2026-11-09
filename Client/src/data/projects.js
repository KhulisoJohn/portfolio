
import skillBridgeImg from "../assets/images/SkillBrdge.png";
//import carePushImg from "../assets/images/carepush.png";
import learnerSupportImg from "../assets/images/learnersupport.png";
import pharmacySalesImg from "../assets/images/drugsales.png";
import vadEnterpriseImg from "../assets/images/VADENterprise.png";
import curriculumImg from "../assets/images/Curriculum.png";

export const projects = [
  // Software Development
  {
    id: 1,
    category: "software development",
    title: "SkillBridge",
    description:
      "A freelance and skills platform with a Skill Arena, Gig Hub and Portfolio, built during a 3-day hackathon.",
    image: skillBridgeImg,
    tags: ["HTML", "CSS", "Javascript", "Node.js", "MongoDB"],
    demoUrl: "#",
    githubUrl: "https://github.com/KhulisoJohn/SkillBridge",
    highlights: [
      "Node.js backend with MongoDB storage",
      "Skill Arena, Gig Hub and Portfolio features",
      "Built in a 3-day hackathon",
    ],
  },
  {
    id: 2,
    category: "software development",
    title: "CarePush",
    description:
      "A QR-linked digital healthcare record system that gives patients and clinics quick access to health records.",
    image: "#",
    tags: ["ASP.NET Core", "C#", "PostgreSQL", "Docker"],
    demoUrl: "#",
    githubUrl: "https://github.com/KhulisoJohn/CarePush",
    highlights: [
      "ASP.NET Core MVC with Onion Architecture",
      "PostgreSQL database hosted on Supabase",
      "Dockerised, with email verification",
    ],
  },

  // Data Analyst
  {
    id: 3,
    category: "data analyst",
    title: "Learner Support Prioritisation",
    description:
      "A rule-based analysis that flags at-risk learners early, using the UCI Portuguese-course student performance data.",
    image: learnerSupportImg,
    tags: ["Excel", "Data Analysis", "EDA"],
    demoUrl: null,
    githubUrl: "https://github.com/KhulisoJohn/Learner_Support",
    highlights: [
      "Exploratory analysis workbook in Excel",
      "Points-based tier rule using grades, failures, study time and absences",
      "Documented end to end on GitHub",
    ],
  },
  {
    id: 4,
    category: "data analyst",
    title: "Pharmacy Sales Analysis",
    description:
      "An analysis of pharmacy sales data to uncover trends in products, revenue and performance over time.",
    image: pharmacySalesImg,
    tags: ["Data Analysis"],
    demoUrl: null,
    githubUrl: "https://github.com/KhulisoJohn/PharmacySales",
    highlights: [
      "Sales trends by product and period",
      "Key insights from the data",
    ],
  },
];

// Client work: shown on the Services page (MyWork).
// Repositories are private, so no githubUrl.
export const clientProjects = [
  {
    id: 1,
    category: "software development",
    title: "VAD Enterprise Website",
    description:
      "A website for VAD Enterprise's academic services, built for a real client.",
    image: vadEnterpriseImg,
    tags: ["React", "TypeScript"],
    demoUrl: "https://YOUR-LIVE-URL",
    highlights: [
      "Built for a real client from their requirements",
      "TODO: add one concrete feature",
    ],
  },
  {
    id: 3,
    category: "software development",
    title: "VAD Enterprise Curriculum Review System",
    description:
      "An AI-assisted system that reviews higher-education programmes against the skills industry needs.",
    image: curriculumImg,
    tags: [".NET 9", "Clean Architecture", "AI"],
    demoUrl: null,
    highlights: [
      "Reviews programmes against industry skill requirements",
      "Built on .NET 9 with Clean Architecture",
      "TODO: add a result or feature, e.g. what the report shows",
    ],
  },
];
