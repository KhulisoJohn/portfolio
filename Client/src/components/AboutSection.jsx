
import { Link } from "react-router-dom";
import {
  BarChart3,
  Code,
  Database,
  GraduationCap,
  GitBranch,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

function DownloadPDF() {
  return (
    <a
      className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center"
      href="/document/my_resume.pdf"
      download
    >
      Download CV
    </a>
  );
}

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Junior Data Analyst | Software Development Background
            </h3>

            <p className="text-muted-foreground">
              I am an aspiring Junior Data Analyst with a background in
              software development and a qualification in Electrical
              Engineering. I am passionate about using data to solve
              real-world problems, uncover meaningful insights, and support
              informed decision-making.
            </p>

            <p className="text-muted-foreground">
              My analytical toolkit includes SQL, Python, Excel, and
              data analysis with Pandas. I am developing my skills in
              data cleaning, exploratory data analysis, data visualization,
              and reporting. I enjoy transforming raw data into meaningful
              information that helps businesses understand trends,
              identify opportunities, and make better decisions.
            </p>

            <p className="text-muted-foreground">
              My software development background gives me an additional
              technical advantage. I have experience working with C#,
              .NET, JavaScript, React, Node.js, and databases. This allows
              me to understand both the technical side of data systems
              and how applications can be built around data-driven solutions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
              <div>
                <dt className="text-sm font-medium">Full name</dt>
                <dd className="text-muted-foreground text-sm">
                  {siteConfig.fullName}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium">Career focus</dt>
                <dd className="text-muted-foreground text-sm">
                  Data Analytics
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium">Qualification</dt>
                <dd className="text-muted-foreground text-sm">
                  Electrical Engineering Graduate
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium">Technical background</dt>
                <dd className="text-muted-foreground text-sm">
                  Software Development
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium">Core skills</dt>
                <dd className="text-muted-foreground text-sm">
                  SQL, Python, Excel, Pandas, Data Analysis, C#, .NET, React
                </dd>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link to="#contact" className="cosmic-button">
                Get In Touch
              </Link>
              <DownloadPDF />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Data Analytics
                  </h4>
                  <p className="text-muted-foreground">
                    Analyse datasets using SQL, Python, Pandas, and Excel.
                    Focused on data cleaning, exploratory analysis,
                    identifying trends, and generating actionable insights.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Data Management & SQL
                  </h4>
                  <p className="text-muted-foreground">
                    Work with relational and NoSQL databases, write SQL
                    queries, retrieve information, and understand database
                    structures and data relationships.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Software Development
                  </h4>
                  <p className="text-muted-foreground">
                    Background in full-stack development using C#, .NET,
                    JavaScript, React, Node.js, and database integration.
                    Able to build applications and understand the systems
                    behind data.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Version Control & Collaboration
                  </h4>
                  <p className="text-muted-foreground">
                    Use Git and GitHub to manage projects, track changes,
                    collaborate with developers, and maintain organised
                    project repositories.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Electrical Engineering
                  </h4>
                  <p className="text-muted-foreground">
                    Electrical Engineering graduate with a technical
                    foundation in engineering principles, analytical
                    thinking, troubleshooting, and problem-solving.
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
