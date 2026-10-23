import { PageHeader } from "../components/PageHeader";
import { ServicesOffered } from "../components/services/ServicesOffered";
import { MyWork } from "../components/services/MyWork";
import { Testimonials } from "../components/services/Testimonials";
import { Availability } from "../components/services/Availability";
import { WhyHireMe } from "../components/services/WhyHireMe";
import { Rates } from "../components/services/Rates";
import { CtaBanner } from "../components/services/CtaBanner";
import { usePageTitle } from "@/hooks/usePageTitle";

const sections = [
  { label: "Services", href: "#services" },
  { label: "My work", href: "#work" },
  { label: "Availability", href: "#availability" },
  { label: "Why hire me", href: "#why-me" },
  { label: "Rates", href: "#rates" },
];

export const ServicesPage = () => {
  usePageTitle("Services and Rates | Khuliso Thavhiwa");

  return (
    <>
      <PageHeader title="My" highlight="Services">
        Data analysis and web development for small businesses, schools and
        community organisations.
      </PageHeader>

      <div className="relative flex flex-wrap justify-center gap-3 px-4">
        {sections.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className="px-4 py-1.5 rounded-full border border-border text-sm text-foreground/80 hover:text-primary hover:border-primary transition-colors"
          >
            {section.label}
          </a>
        ))}
      </div>

      <ServicesOffered />
      <MyWork />
      <Testimonials />
      <Availability />
      <WhyHireMe />
      <Rates />
      <CtaBanner />
    </>
  );
};