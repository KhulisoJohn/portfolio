
import {
  SiPython,
  SiPostgresql,
  //SiMicrosoftpowerbi,
  SiReact,
  SiDotnet,
  SiMongodb,
} from "react-icons/si";

import Image from "../assets/images/khulyso.jpeg";

const techIcons = [
  { Icon: SiPython, label: "Python", color: "#3776AB" },
  { Icon: SiPostgresql, label: "SQL / PostgreSQL", color: "#4169E1" },
  //{ Icon: SiMicrosoftpowerbi, label: "Power BI", color: "#F2C811" },
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiDotnet, label: ".NET", color: "#512BD4" },
  { Icon: SiMongodb, label: "MongoDB", color: "#47A248" },
];

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-24"
    >
      <div className="container max-w-6xl mx-auto z-10 grid items-center gap-12 md:grid-cols-2">

        {/* Professional Introduction */}
        <div className="space-y-6 text-center md:text-left order-2 md:order-1">

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in">
              Hi, Im
            </span>

            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}Khuliso
            </span>

            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              Thavhiwa
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-primary opacity-0 animate-fade-in-delay-2">
            Junior Data Analyst | Software Development
          </p>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 opacity-0 animate-fade-in-delay-3">
            I am an aspiring Data Analyst passionate about transforming
            raw data into meaningful insights that support informed
            business decisions. I work with Python, SQL, Excel, and
            data analysis techniques to explore datasets, identify
            trends, and communicate findings.

            <br /><br />

            With a background in software development and a qualification
            in Electrical Engineering, I bring a strong technical
            foundation, analytical thinking, and problem-solving skills
            to every project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start opacity-0 animate-fade-in-delay-4">
            <a href="../pages/About.jsx/#projects" className="cosmic-button">
              Explore My Projects
            </a>

            <a
              href="#contact"
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Professional Photo with Technology Icons */}
        <div className="order-1 md:order-2 flex justify-center opacity-0 animate-fade-in-delay-2">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem]">

            {/* Background Glow */}
            <div className="absolute inset-[14%] rounded-full bg-primary/30 blur-3xl" />

            {/* Profile Image */}
            <img
              src={Image}
              alt="Khuliso Thavhiwa - Junior Data Analyst and Software Developer"
              className="absolute inset-[14%] w-[72%] h-[72%] rounded-full object-cover border-4 border-primary/40 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]"
            />

            {/* Technology Icons */}
            {techIcons.map(({ Icon, label, color }, i) => {
              const angle =
                (i / techIcons.length) * 2 * Math.PI - Math.PI / 2;

              const left = 50 + 46 * Math.cos(angle);
              const top = 50 + 46 * Math.sin(angle);

              return (
                <div
                  key={label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                  }}
                >
                  <div
                    className="animate-float flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-card border border-border shadow-lg"
                    style={{
                      animationDelay: `${i * 0.35}s`,
                      boxShadow: `0 8px 24px -6px ${color}99`,
                    }}
                    title={label}
                  >
                    <Icon
                      className="w-5 h-5 md:w-7 md:h-7"
                      style={{
                        color,
                        filter: `drop-shadow(0 2px 4px ${color}66)`,
                      }}
                      aria-label={label}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
