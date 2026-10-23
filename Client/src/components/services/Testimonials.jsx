import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Client <span className="text-primary">Testimonials</span>
        </h2>

        {testimonials.length === 0 ? (
          <div className="bg-card p-8 rounded-lg shadow-xs max-w-2xl mx-auto">
            <Quote className="h-8 w-8 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">
              I am building my client list, so there are no reviews here yet.
              Work with me on a first project and your feedback will appear on
              this page.
            </p>
            <Link to="/contact" className="cosmic-button inline-block">
              Start a project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {testimonials.map((item) => (
              <figure key={item.name} className="bg-card p-6 rounded-lg shadow-xs text-left">
                <Quote className="h-6 w-6 text-primary mb-3" />
                <blockquote className="text-muted-foreground mb-4">
                  {item.quote}
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-semibold">{item.name}</span>
                  {item.role && (
                    <span className="text-muted-foreground">, {item.role}</span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};