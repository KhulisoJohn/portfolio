import { Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

// eslint-disable-next-line react/prop-types
const Row = ({ label, value }) => (
  <div>
    <dt className="text-sm font-medium">{label}</dt>
    <dd className="text-muted-foreground text-sm">{value}</dd>
  </div>
);

export const Availability = () => {
  const { availability, workLocation } = siteConfig;

  return (
    <section id="availability" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Availability and <span className="text-primary">Location</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">When I can work</h3>
            </div>
            <dl className="space-y-4">
              <Row label="Days" value={availability.days} />
              <Row label="Hours" value={availability.hours} />
              <Row label="Weekends" value={availability.weekends} />
              <Row label="Holidays" value={availability.holidays} />
              <Row label="Start date" value={availability.startDate} />
            </dl>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Where I can work</h3>
            </div>
            <dl className="space-y-4">
              <Row label="Work mode" value={workLocation.mode} />
              <Row label="Based in" value={workLocation.base} />
              <Row label="Preferred" value={workLocation.preferred} />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};