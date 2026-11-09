import { Link } from "react-router-dom";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

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
              <figure
                key={item.name}
                className="bg-card p-6 rounded-lg shadow-xs text-left flex flex-col"
              >
                <Quote className="h-6 w-6 text-primary mb-3" />

                {item.rating ? (
                  <div
                    className="flex gap-1 mb-3"
                    role="img"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < item.rating!
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}

                <blockquote className="text-muted-foreground mb-6 flex-1">
                  {item.quote}
                </blockquote>

                <figcaption className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-12 w-12 rounded-full object-cover border border-primary/30"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold"
                    >
                      {getInitials(item.name)}
                    </div>
                  )}
                  <div className="text-sm">
                    <div className="font-semibold">{item.name}</div>
                    {item.role && (
                      <div className="text-muted-foreground">{item.role}</div>
                    )}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};