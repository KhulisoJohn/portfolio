import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
             Junior Software Developer
            </h3>

            <p className="text-muted-foreground">
              I am a passionate and highly motivated junior software developer with a strong
               interest in building scalable and maintainable applications. My journey into
                software development has been driven by a desire to solve real-world problems through
                 clean, efficient, and modular code.
            </p>

            <p className="text-muted-foreground">
            I specialize in backend development using technologies like C# and .NET,
             with experience in designing structured APIs, working with relational databases,
              and following architectural patterns such as MVC and layered architecture.
               I am also familiar with front-end technologies like HTML, CSS, JavaScript, and React,
                which allows me to contribute to full-stack solutions when needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href=""
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Software Development</h4>
                  <p className="text-muted-foreground">
                   build web applications using C# and the .NET framework.
                    I understand the basics of object-oriented programming (OOP),
                    can work with controllers, models, and views (MVC), and write clean
                     code that follows standard best practices
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Version Control</h4>
                  <p className="text-muted-foreground">
                  Using Git for version control and collaborate on code using GitHub.
                    With basic knowledge to push and pull code, resolve basic merge conflicts,
                     and follow branching workflows. 
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Database Integration</h4>
                  <p className="text-muted-foreground">
                   Design simple relational databases and write queries using SQL.
                    Knowlegable in Entity Framework to perform CRUD operations and understand how to create 
                    and manage models that match database tables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
