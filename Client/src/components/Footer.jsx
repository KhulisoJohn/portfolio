
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaFacebook,
  FaLinkedin,
  FaDiscord,
  FaWhatsapp,
} from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";
import { Mail, MapPin, Phone, PenSquare } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const quickLinks = [
  { name: "Home", to: "/" },
  { name: "Services", to: "/services" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact" },
];

const serviceLinks = [
  "Data analysis and reporting",
  "Web development",
  "Backend and API development",
];

const socialIcons = [
  { key: "github", label: "GitHub", Icon: FaGithub },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin },
  { key: "facebook", label: "Facebook", Icon: FaFacebook },
  { key: "discord", label: "Discord", Icon: FaDiscord },
].filter(({ key }) => siteConfig.socials[key]);

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card/30 backdrop-blur-sm mt-24 relative">
      <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-foreground/90">
            {siteConfig.name}
          </h2>

          <p className="text-sm text-primary mt-1">
            {siteConfig.role}
          </p>

          <p className="text-sm text-foreground/60 mt-3">
            {siteConfig.tagline}
          </p>

          <div className="flex items-center gap-5 mt-5">
            {socialIcons.map(({ key, label, Icon }) => (
              <a
                key={key}
                href={siteConfig.socials[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-foreground/60 hover:text-primary transition"
              >
                <Icon size={22} />
              </a>
            ))}

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-foreground/60 hover:text-primary transition"
            >
              <FaWhatsapp size={22} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground/70">
            Quick links
          </h3>

          <ul className="space-y-2 text-sm text-foreground/60">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-primary transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Blog Admin button */}
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-2 mt-5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            <PenSquare size={16} />
            Manage Blog
          </Link>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground/70">
            What I do
          </h3>

          <ul className="space-y-2 text-sm text-foreground/60">
            {serviceLinks.map((service) => (
              <li key={service}>
                <Link
                  to="/services"
                  className="hover:text-primary transition"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground/70">
            Get in touch
          </h3>

          <ul className="space-y-3 text-sm text-foreground/60">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 text-primary shrink-0" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-primary transition break-all"
              >
                {siteConfig.email}
              </a>
            </li>

            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 text-primary shrink-0" />
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="hover:text-primary transition"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>

            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
              <span>{siteConfig.location}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60 py-4 px-4 flex flex-col gap-3 sm:flex-row items-center justify-between">
        <p className="text-xs text-foreground/50">
          &copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
        </p>

        <p className="text-xs text-foreground/50">
          Built with React and ASP.NET Core
        </p>

        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Back to top"
          className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition flex items-center justify-center"
        >
          <HiArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
