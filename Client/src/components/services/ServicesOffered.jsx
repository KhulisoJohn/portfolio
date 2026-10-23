import { Database, Globe, Server, Users, Wrench, Target } from "lucide-react";

const services = [
  {
    icon: Database,
    title: "Data analysis and reporting",
    points: [
      "Cleaning and organising messy data",
      "SQL and PostgreSQL queries",
      "Clear reports and dashboards",
    ],
  },
  {
    icon: Globe,
    title: "Web development",
    points: [
      "Responsive websites and portfolios",
      "React, TypeScript and Tailwind CSS",
      "Landing pages for small businesses",
    ],
  },
  {
    icon: Server,
    title: "Backend and API development",
    points: [
      "ASP.NET Core and C# REST APIs",
      "PostgreSQL and MongoDB databases",
      "Login (JWT), Docker and deployment",
    ],
  },
];

const whoIHelp = [
  "Small businesses that need a website or tidy data",
  "Schools and training centres",
  "Churches and community organisations",
  "Start-ups that need a first working version",
];

const tools = [
  "SQL", "PostgreSQL", "MongoDB", "C#", "ASP.NET Core", "React", "TypeScript",
  "Tailwind CSS", "Git and GitHub", "Docker", "Postman", "Render",
];

const workIWant = [
  "Data cleaning, analysis and reporting projects",
  "Websites and web applications for small organisations",
  "Ongoing support for a client's data or website",
];

export const ServicesOffered = () => {
  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          What I <span className="text-primary">Offer</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I combine data analysis with software development, so one person can
          analyse your data and build the tool that uses it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map(({ icon: Icon, title, points }) => (
            <div key={title} className="gradient-border p-6 card-hover text-left">
              <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{title}</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-card p-6 rounded-lg shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Who I help</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              {whoIHelp.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Tools I use confidently</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Work I want to do</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              {workIWant.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};