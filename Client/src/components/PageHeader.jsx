/* eslint-disable react/prop-types */
// Title block at the top of the Services, Contact and Blog pages.
export const PageHeader = ({ title, highlight, children }) => {
  return (
    <section className="pt-36 pb-12 px-4 relative">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {title} <span className="text-primary">{highlight}</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{children}</p>
      </div>
    </section>
  );
};