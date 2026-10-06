import { ArrowDown } from "lucide-react";
import { SiReact, SiTypescript, SiDotnet, SiPostgresql, SiMongodb, SiPython } from "react-icons/si";
//import { DiCsharp } from "react-icons/di";


// Icons placed evenly around the photo. Colours are each brand's own colour.
const techIcons = [
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  //{ Icon: DiCsharp, label: "C#", color: "#9B4F96" },
  { Icon: SiDotnet, label: ".NET", color: "#512BD4" },
  { Icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
  { Icon: SiMongodb, label: "MongoDB", color: "#47A248" },
  { Icon: SiPython, label: "Python", color: "#FFD43B" },
];

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-24"
    >
      <div className="container max-w-6xl mx-auto z-10 grid items-center gap-12 md:grid-cols-2">
        {/* Text */}
        <div className="space-y-6 text-center md:text-left order-2 md:order-1">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I am</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Khuliso
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              Thavhiwa
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-primary opacity-0 animate-fade-in-delay-2">
            Software Developer &amp; Data Analyst
          </p>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 opacity-0 animate-fade-in-delay-3">
            I create stellar web experiences with modern technologies. As a
            full-stack developer, I specialize in building scalable applications
            with beautiful, responsive frontends and robust, high-performance
            backends. I also turn data into clear insights that drive decisions.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>

        {/* Photo with orbiting icons */}
        <div className="order-1 md:order-2 flex justify-center opacity-0 animate-fade-in-delay-2">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem]">
            {/* Soft glow behind the photo */}
            <div className="absolute inset-[14%] rounded-full bg-primary/30 blur-3xl" />

            {/* Photo: put your image in /public/khuliso.jpg */}
            <img
              src="../../public/images/khulyso.jpeg"
              alt="Khuliso Thavhiwa, software developer and data analyst"
              className="absolute inset-[14%] w-[72%] h-[72%] rounded-full object-cover border-4 border-primary/40 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]"
            />

            {/* Icons */}
            {techIcons.map(({ Icon, label, color }, i) => {
              const angle = (i / techIcons.length) * 2 * Math.PI - Math.PI / 2;
              const left = 50 + 46 * Math.cos(angle);
              const top = 50 + 46 * Math.sin(angle);
              return (
                <div
                  key={label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%`, top: `${top}%` }}
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
                      style={{ color, filter: `drop-shadow(0 2px 4px ${color}66)` }}
                      aria-label={label}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
