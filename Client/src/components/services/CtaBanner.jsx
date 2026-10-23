import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/data/siteConfig";

export const CtaBanner = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to start your <span className="text-primary">project?</span>
        </h2>
        <p className="text-muted-foreground mb-8">
          Tell me what you need and I will reply with a short plan and a quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="cosmic-button">
            Contact me
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} /> WhatsApp me
          </a>
        </div>
      </div>
    </section>
  );
};