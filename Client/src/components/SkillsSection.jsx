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
import gitIcon from "../assets/icons/git.webp";

// Data Analytics
import excelIcon from "../assets/icons/excel.webp";
import sqlIcon from "../assets/icons/sql.webp";
import powerbiIcon from "../assets/icons/powerbi.webp";
import pythonIcon from "../assets/icons/python.webp";
import pandasIcon from "../assets/icons/panda.webp";
import NoSQLIcon from "../assets/icons/nosql.webp";
import matlabIcon from "../assets/icons/Matlab.webp"; 

// Tools
import dockerIcon from "../assets/icons/docker.webp";
import postmanIcon from "../assets/icons/postman-icon.webp";
import vscodeIcon from "../assets/icons/vscode.webp"; 
import jupyterIcon from "../assets/icons/jupyter.webp"; // add this file
import supabaseIcon from "../assets/icons/supabase.webp"; 
import renderIcon from "../assets/icons/render.webp"; // add this file
import gitHubIcon from "../assets/icons/gitHub.webp";
import mongodbIcon from "../assets/icons/mongodb.webp";

const skills = [
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
  { name: "Git", image: gitIcon, category: "software development" },

  // Data Analytics
  { name: "Excel", image: excelIcon, category: "data analytics" },
  { name: "SQL", image: sqlIcon, category: "data analytics" },
  { name: "Power BI", image: powerbiIcon, category: "data analytics" },
  { name: "Python", image: pythonIcon, category: "data analytics" },
  { name: "Pandas", image: pandasIcon, category: "data analytics" },
  { name: "noSQL", image: NoSQLIcon, category: "data analytics" },
  { name: "MATLAB", image: matlabIcon, category: "data analytics" },

  // Tools
  { name: "VS Code", image: vscodeIcon, category: "tools" },
  { name: "Jupyter", image: jupyterIcon, category: "tools" },
  { name: "Docker", image: dockerIcon, category: "tools" },
  { name: "Postman", image: postmanIcon, category: "tools" },
  { name: "Supabase", image: supabaseIcon, category: "tools" },
  { name: "Render", image: renderIcon, category: "tools" },
  {name: "GitHub", image: gitHubIcon, category: "tools"},
  {name: "MongoDB", image: mongodbIcon, category: "tools"}
];

const categories = ["software development", "data analytics", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("software development");

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
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