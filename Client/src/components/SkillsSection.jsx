import { useState } from "react";
import { cn } from "@/lib/utils";

// Frontend
import htmlIcon from "../../public/icons/html.webp";
import cssIcon from "../../public/icons/css.webp";
import jsIcon from "../../public/icons/js.webp";
import reactIcon from "../../public/icons/react.webp";
import tailwindIcon from "../../public/icons/tailwind.webp";
import tsIcon from "../../public/icons/typescript.webp";

// Backend
import csharpIcon from "../../public/icons/Csharp.webp";
import expressIcon from "../../public/icons/express.webp";
import nodejsIcon from "../../public/icons/node.webp";
import mysqlIcon from "../../public/icons/sql.webp";
import mongodbIcon from "../../public/icons/nosql.webp";
import aspnetIcon from "../../public/icons/dotnet.webp";

// Tools
import githubIcon from "../../public/icons/git.webp";
import dockerIcon from "../../public/icons/docker.webp";
import slackIcon from "../../public/icons/postman-icon.webp";
import vscodeIcon from "../../public/icons/vs code.webp";
import sqlserverIcon from "../../public/icons/Linux.webp";
import azureIcon from "../../public/icons/Azure.webp";

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
  { name: "Postman", image: slackIcon, category: "tools" },
  { name: "VS Code", image: vscodeIcon, category: "tools" },
  { name: "Linux", image: sqlserverIcon, category: "tools" },
  { name: "Azure", image: azureIcon, category: "tools" },
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
