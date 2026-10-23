// One place for every detail the rubric asks for (WHO, WHAT, WHEN, WHERE, WHY, HOW MUCH).
// Edit the values here and every page and the footer update automatically.

export const siteConfig = {
  // WHO
  name: "Khuliso Thavhiwa",
  fullName: "Khuliso John Thavhiwa", // as per ID
  role: "Data Analyst & Full-Stack Developer",
  tagline: "I turn data into clear decisions and ideas into working software.",
  fieldOfStudy: "Electrical Engineering, now building a career in software development and data analysis",
  institution: "Vhembe TVET College",
  strengths: [
    "SQL and PostgreSQL data analysis",
    "ASP.NET Core and C# back ends",
    "React and TypeScript front ends",
    "Explaining technical work clearly",
  ],

  // Contact
  email: "khulysojohn@gmail.com",
  phoneDisplay: "+27 81 885 4153",
  phoneTel: "+27818854153",
  whatsappNumber: "27818854153", // country code + number, no "+" or spaces
  whatsappMessage:
    "Hi Khuliso, I found your portfolio and would like to talk about a project.",
  location: "Mudimeli Village, Makhado, Limpopo, South Africa",

  // Leave a link as "" to hide its icon.
  socials: {
    github: "https://github.com/KhulisoJohn",
    linkedin: "",
    facebook: "",
    discord: "",
  },

  // WHEN
  availability: {
    days: "Monday to Friday",
    hours: "08:00 to 16:00 (South African time, SAST)",
    weekends: "By arrangement for urgent work",
    holidays: "Available. I confirm dates when we agree a timeline",
    startDate: "Available to start immediately",
  },

  // WHERE
  workLocation: {
    mode: "Remote, with on-site or hybrid work in the Makhado area",
    base: "Mudimeli Village, Makhado, Limpopo",
    preferred: "Remote work for clients anywhere, on-site meetings within Limpopo",
  },

  // HOW MUCH (South African rand)
  rates: {
    hourly: 200,
    packages: [
      { name: "Basic website", price: "R2,500", detail: "A clean, responsive site of up to 3 pages." },
      { name: "Portfolio website", price: "R4,000", detail: "A personal or business portfolio with a contact form." },
      { name: "Data cleaning and dashboard report", price: "R1,800", detail: "Tidy one dataset and deliver a clear report." },
      { name: "Custom application", price: "From R8,000", detail: "A web app with a database, login and API." },
    ],
    payment: [
      "Per project (fixed price) or per hour for ongoing work",
      "A deposit before work starts and the balance on delivery",
      "Payment by EFT, or through Upwork for international clients",
    ],
  },
};