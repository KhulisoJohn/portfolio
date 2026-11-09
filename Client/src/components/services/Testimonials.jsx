
import { Link } from "react-router-dom";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const getInitials = (name) =>
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

        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Client <span className="text-primary">Testimonials</span>
        </h2>

        {testimonials.length === 0 ? (
          <div className="bg-card p-8 rounded-lg shadow-xs max-w-2xl mx-auto mt-12 text-center">
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
          <div className="mt-12 space-y-6">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row"
              >
                {/* Client Image */}
                <div className="w-full md:w-2/5 min-h-[280px] md:min-h-[350px] bg-primary/5">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-[280px] md:h-full md:min-h-[350px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-[280px] md:h-[350px] flex items-center justify-center">
                      <span className="text-6xl font-bold text-primary">
                        {getInitials(item.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 p-6 md:p-10 flex flex-col items-start justify-start">
                  <Quote className="h-10 w-10 text-primary mb-6" />

                  {/* Star Rating */}
                  {item.rating && (
                    <div
                      className="flex gap-1 mb-5"
                      role="img"
                      aria-label={`${item.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < item.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Testimonial Quote */}
                  <blockquote className="text-md md:text-xl leading-relaxed text-muted-foreground mb-8">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Client Information */}
                  <figcaption className="mt-auto border-t border-border pt-5 w-full">
                    <div className="font-bold text-lg">
                      {item.name}
                    </div>

                    {item.role && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.role}
                      </div>
                    )}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
