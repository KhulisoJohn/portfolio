// Personal projects: shown on the Home page (ProjectsSection).
export const projects = [
  // Software Development
  {
    id: 1,
    category: "software development",
    title: "SkillBridge",
    description:
      "A freelance and skills platform with a Skill Arena, Gig Hub and Portfolio, built during a 2-day hackathon. I built the backend.",
    image: "/projects/skillbridge.png",
    tags: ["HTML", "CSS", "Javascript", "Node.js", "MongoDB"],
    demoUrl: "#", // TODO: add live link if you have one
    githubUrl: "https://github.com/KhulisoJohn/SkillBridge", // TODO: confirm repo name
    highlights: [
      "Node.js backend with MongoDB storage",
      "Skill Arena, Gig Hub and Portfolio features",
      "Built in a 2-day hackathon",
    ],
  },
  {
    id: 2,
    category: "software development",
    title: "CarePush",
    description:
      "A QR-linked digital healthcare record system that gives patients and clinics quick access to health records.",
    image: "/projects/carepush.png",
    tags: ["ASP.NET Core", "C#", "PostgreSQL", "Docker"],
    demoUrl: "#", // TODO: add live link if you have one
    githubUrl: "https://github.com/KhulisoJohn/CarePush", // TODO: confirm repo name
    highlights: [
      "ASP.NET Core MVC with Onion Architecture",
      "PostgreSQL database hosted on Supabase",
      "Dockerised, with email verification",
    ],
  },

  // Data Analyst (GitHub only, no live demo)
  {
    id: 3,
    category: "data analyst",
    title: "Learner Support Prioritisation",
    description:
      "A rule-based analysis that flags at-risk learners early, using the UCI Portuguese-course student performance data.",
    image: "/projects/learner-support.png",
    tags: ["Excel", "Data Analysis", "EDA"],
    demoUrl: null,
    githubUrl: "https://github.com/KhulisoJohn/Learner_Support", // TODO: confirm repo name
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
    image: "/projects/pharmacy-sales.png",
    tags: ["Data Analysis"], // TODO: add your tools (Excel, SQL, Power BI, Python...)
    demoUrl: null,
    githubUrl: "https://github.com/KhulisoJohn/PharmacySales", // TODO: confirm repo name
    highlights: [
      "Sales trends by product and period",
      "Key insights from the data", // TODO: replace with your real findings
    ],
  },
];

// Client work: shown on the Services page (MyWork). Repos are private, so no githubUrl.
export const clientProjects = [
  {
    id: 1,
    category: "software development",
    title: "VAD Enterprise Website",
    description:
      "A website for VAD Enterprise's academic services, built for a real client.",
    image: "/projects/vad-enterprise.png", // TODO: add a screenshot
    tags: ["React", "TypeScript"], // TODO: replace with the stack you actually used
    demoUrl: "https://YOUR-LIVE-URL", // TODO: add live link, or set to null
    highlights: [
      "Built for a real client from their requirements",
      "TODO: add one concrete feature",
    ],
  },
  {
    id: 2,
    category: "software development",
    title: "VAD Enterprise Academy Portal",
    description: "A portal for VAD Academy.", // TODO: say what it does and who uses it
    image: "/projects/vad-academy.png", // TODO: add a screenshot
    tags: ["TODO"], // TODO: add the stack
    demoUrl: null,
    highlights: [
      "TODO: who uses it (learners, tutors, admins?)",
      "TODO: main feature",
    ],
  },
  {
    id: 3,
    category: "software development",
    title: "VAD Enterprise Curriculum Review System",
    description:
      "An AI-assisted system that reviews higher-education programmes against the skills industry needs.",
    image: "/projects/curriculum-review.png", // TODO: add a screenshot
    tags: [".NET 9", "Clean Architecture", "AI"],
    demoUrl: null,
    highlights: [
      "Reviews programmes against industry skill requirements",
      "Built on .NET 9 with Clean Architecture",
      "TODO: add a result or feature, e.g. what the report shows",
    ],
  },
];