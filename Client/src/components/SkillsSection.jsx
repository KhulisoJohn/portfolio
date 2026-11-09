import { useState } from "react";
import { cn } from "@/lib/utils";

// Software Development
import htmlIcon from "../assets/icons/html.webp";
import cssIcon from "../assets/icons/css.webp";
import jsIcon from "../assets/icons/js.webp";
import reactIcon from "../assets/icons/react.webp";
import tailwindIcon from "../assets/icons/tailwind.webp";
import tsIcon from "../assets/icons/typescript.webp";
import csharpIcon from "../assets/icons/Csharp.webp";
import aspnetIcon from "../assets/icons/dotnet.webp";
import nodejsIcon from "../assets/icons/node.webp";
import githubIcon from "../assets/icons/git.webp";
import dockerIcon from "../assets/icons/docker.webp";
import postmanIcon from "../assets/icons/postman-icon.webp";

// Data Analyst (add these icon files to public/icons)
import excelIcon from "../assets/icons/excel.webp";
import sqlIcon from "../assets/icons/sql.webp";
import powerbiIcon from "../assets/icons/powerbi.webp";
import pythonIcon from "../assets/icons/python.webp";
import pandasIcon from "../assets/icons/pandas.webp";
import mongodbIcon from "../assets/icons/nosql.webp";

const skills = [
  // Data Analyst
  { name: "Excel", image: excelIcon, category: "data analyst" },
  { name: "SQL", image: sqlIcon, category: "data analyst" },
  { name: "Power BI", image: powerbiIcon, category: "data analyst" },
  { name: "Python", image: pythonIcon, category: "data analyst" },
  { name: "Pandas", image: pandasIcon, category: "data analyst" },
  { name: "noSQL", image: mongodbIcon, category: "data analyst" },

  // Software Development
  { name: "HTML", image: htmlIcon, category: "software development" },
  { name: "CSS", image: cssIcon, category: "software development" },
  { name: "JavaScript", image: jsIcon, category: "software development" },
  { name: "TypeScript", image: tsIcon, category: "software development" },
  { name: "Tailwind CSS", image: tailwindIcon, category: "software development" },
  { name: "React.js", image: reactIcon, category: "software development" },
  { name: "C#", image: csharpIcon, category: "software development" },
  { name: "ASP.NET", image: aspnetIcon, category: "software development" },
  { name: "Node.js", image: nodejsIcon, category: "software development" },
  { name: "Git", image: githubIcon, category: "software development" },
  { name: "Docker", image: dockerIcon, category: "software development" },
  { name: "Postman", image: postmanIcon, category: "software development" },
];

const categories = ["all", "data analyst", "software development"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-card px-2 py-6 justify-center rounded-lg shadow-xs card-hover flex items-center gap-4"
            >
              <h3 className="font-semibold text-lg">{skill.name}</h3>
              <img
                src={skill.image}
                alt={skill.name}
                width={32}
                height={32}
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
