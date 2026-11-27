import { HeroSection } from "../components/HeroSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export const Home = () => {
  usePageTitle("Khuliso Thavhiwa | Data Analyst & Full-Stack Developer");

  return (
    <>
      <HeroSection />
    </>
  );
};