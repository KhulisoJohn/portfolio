
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaFacebook,
  FaLinkedin,
  FaDev,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiUpwork } from "react-icons/si";
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
  "Data cleaning and visualization",
  "Web development",
  "Backend and API development",
];

const socialIcons = [
  { key: "github", label: "GitHub", Icon: FaGithub },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin },
  { key: "dev", label: "DEV Community", Icon: FaDev },
  { key: "facebook", label: "Facebook", Icon: FaFacebook },
  { key: "x", label: "X", Icon: FaXTwitter },
  { key: "datasimhq", label: "DataSimHQ", custom: true },
  { key: "upwork", label: "Upwork", Icon: SiUpwork },
].filter(({ key }) => siteConfig.socials[key]);

export const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full border-t border-border bg-card/30 backdrop-blur-sm mt-24 relative">

      <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">

        {/* Brand and Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-foreground/90">
            {siteConfig.name}
          </h2>

          <p className="text-sm text-primary mt-1">
            {siteConfig.role}
          </p>

          <p className="text-sm text-foreground/60 mt-3 leading-relaxed">
            {siteConfig.tagline}
          </p>

          {/* Social Links */}
          <div className="flex items-center flex-wrap gap-5 mt-5">
            {socialIcons.map(({ key, label, Icon, custom }) => (
              <a
                key={key}
                href={siteConfig.socials[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="text-foreground/60 hover:text-primary transition-all duration-300 hover:-translate-y-1"
              >
                {custom ? (
                  <span className="w-6 h-6 rounded-md border border-current flex items-center justify-center text-[9px] font-bold">
                    DS
                  </span>
                ) : (
                  <Icon size={22} />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground/70">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm text-foreground/60">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Blog Admin */}
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-2 mt-6 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            <PenSquare size={16} />
            Manage Blog
          </Link>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground/70">
            What I Do
          </h3>

          <ul className="space-y-3 text-sm text-foreground/60">
            {serviceLinks.map((service) => (
              <li key={service}>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors duration-300"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground/70">
            Get in Touch
          </h3>

          <ul className="space-y-4 text-sm text-foreground/60">

            <li className="flex items-start gap-3">
              <Mail
                size={16}
                className="mt-0.5 text-primary shrink-0"
              />
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-primary transition break-all"
              >
                {siteConfig.email}
              </a>
            </li>

            <li className="flex items-start gap-3">
              <Phone
                size={16}
                className="mt-0.5 text-primary shrink-0"
              />
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="hover:text-primary transition"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>

            <li className="flex items-start gap-3">
              <MapPin
                size={16}
                className="mt-0.5 text-primary shrink-0"
              />
              <span>{siteConfig.location}</span>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/60 py-5 px-4">
        <div className="container flex flex-col gap-4 sm:flex-row items-center justify-between">

          <p className="text-xs text-foreground/50 text-center">
            &copy; {new Date().getFullYear()} {siteConfig.fullName}.
            All rights reserved.
          </p>

          <p className="text-xs text-foreground/50 text-center">
            Built with React, ASP.NET Core and modern technologies.
          </p>

          <a
            href="#top"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
          >
            <HiArrowUp size={20} />
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
