import { useState } from "react";
import { cn } from "@/lib/utils";

// Frontend
import htmlIcon from "../assets/icons/html.webp";
import cssIcon from "../assets/icons/css.webp";
import jsIcon from "../assets/icons/js.webp";
import reactIcon from "../assets/icons/react.webp";
import tailwindIcon from "../assets/icons/tailwind.webp";
import tsIcon from "../assets/icons/typescript.webp";

// Backend
import csharpIcon from "../assets/icons/Csharp.webp";
import expressIcon from "../assets/icons/express.webp";
import nodejsIcon from "../assets/icons/node.webp";
import mysqlIcon from "../assets/icons/sql.webp";
import mongodbIcon from "../assets/icons/nosql.webp";
import aspnetIcon from "../assets/icons/dotnet.webp";

// Tools
import githubIcon from "../assets/icons/git.webp";
import dockerIcon from "../assets/icons/docker.webp";
import slackIcon from "../assets/icons/slack.webp";
import vscodeIcon from "../assets/icons/vs code.webp";
import sqlserverIcon from "../assets/icons/mssql.webp";
import azureIcon from "../assets/icons/cloud.webp";

const skills = [
  { name: "HTML", image: htmlIcon, category: "frontend" },
  { name: "CSS", image: cssIcon, category: "frontend" },
  { name: "Javascript", image: jsIcon, category: "frontend" },
  { name: "TypeScript", image: tsIcon, category: "frontend" },
  { name: "Tailwind CSS", image: tailwindIcon, category: "frontend" },
  { name: "React.js", image: reactIcon, category: "frontend" },

  { name: "C#", image: csharpIcon, category: "backend" },
  { name: "Express.js", image: expressIcon, category: "backend" },
  { name: "Node.js", image: nodejsIcon, category: "backend" },
  { name: "SQL", image: mysqlIcon, category: "backend" },
  { name: "noSQL", image: mongodbIcon, category: "backend" },
  { name: "ASP.NET", image: aspnetIcon, category: "backend" },

  { name: "Git", image: githubIcon, category: "tools" },
  { name: "Docker", image: dockerIcon, category: "tools" },
  { name: "Slack", image: slackIcon, category: "tools" },
  { name: "VS Code", image: vscodeIcon, category: "tools" },
  { name: "MSSQL Server", image: sqlserverIcon, category: "tools" },
  { name: "Azure Cloud", image: azureIcon, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

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
          {categories.map((category, key) => (
            <button
              key={key}
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
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
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
