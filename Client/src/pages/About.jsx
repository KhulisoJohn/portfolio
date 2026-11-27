
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export const About = () => {
  usePageTitle("Khuliso Thavhiwa | Data Analyst & Full-Stack Developer");

  return (
    <>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </>
  );
};
