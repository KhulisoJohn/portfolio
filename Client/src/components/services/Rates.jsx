import { siteConfig } from "@/data/siteConfig";

export const Rates = () => {
  const { rates } = siteConfig;

  return (
    <section id="rates" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Rates and <span className="text-primary">Pricing</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          All prices are in South African rand. I confirm a final quote after a
          short conversation about your project.
        </p>

        <div className="bg-card p-8 rounded-lg shadow-xs mb-8 text-center">
          <p className="text-muted-foreground mb-1">Hourly rate</p>
          <p className="text-4xl font-bold text-primary">R{rates.hourly}</p>
          <p className="text-sm text-muted-foreground mt-1">
            per hour, for data analysis or development
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {rates.packages.map((pkg) => (
            <div key={pkg.name} className="gradient-border p-6 card-hover text-left">
              <h3 className="font-semibold mb-2">{pkg.name}</h3>
              <p className="text-2xl font-bold text-primary mb-2">{pkg.price}</p>
              <p className="text-sm text-muted-foreground">{pkg.detail}</p>
            </div>
          ))}
        </div>

        <div className="bg-card p-8 rounded-lg shadow-xs text-left max-w-2xl mx-auto">
          <h3 className="font-semibold text-lg mb-4">How I get paid</h3>
          <ul className="space-y-2 text-muted-foreground text-sm">
            {rates.payment.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};