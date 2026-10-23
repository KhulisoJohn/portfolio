import { ShieldCheck, Handshake, Timer } from "lucide-react";

const reasons = [
  {
    icon: Timer,
    title: "Attitude and work ethic",
    points: [
      "I finish what I start and meet agreed deadlines",
      "I keep learning and say so when I need to research something",
      "I only promise skills I can deliver",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Reliable from start to finish",
    points: [
      "A written scope and price before work begins",
      "I track my time and send regular progress updates",
      "I run my own small business, so I understand deadlines and invoices",
    ],
  },
  {
    icon: Handshake,
    title: "Easy to work with",
    points: [
      "As a volunteer Mathematics tutor, I explain things in plain language",
      "I ask questions early so there are no surprises",
      "I reply promptly and keep communication simple",
    ],
  },
];

export const WhyHireMe = () => {
  return (
    <section id="why-me" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Why Hire <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, points }) => (
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
      </div>
    </section>
  );
};