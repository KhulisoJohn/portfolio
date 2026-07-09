import { FaGithub, FaFacebook, FaLinkedin, FaDiscord } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card/30 backdrop-blur-sm mt-24">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT — Branding */}
        <div>
          <h2 className="text-xl font-semibold text-foreground/90">KhulysoJohn</h2>
          <p className="text-sm text-foreground/60 mt-2">
            Crafting clean, impactful digital experiences.
          </p>
        </div>

        {/* MIDDLE — Navigation */}
        <div className="flex flex-col md:items-center">
          <h3 className="text-sm font-semibold mb-3 text-foreground/70">Navigation</h3>
          <ul className="space-y-2 text-sm text-foreground/60">
            <li><a href="#hero" className="hover:text-primary transition">Home</a></li>
            <li><a href="#about" className="hover:text-primary transition">About</a></li>
            <li><a href="#projects" className="hover:text-primary transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-primary transition">Contact</a></li>
          </ul>
        </div>

        {/* RIGHT — Social Icons */}
        <div className="flex flex-col md:items-end">
          <h3 className="text-sm font-semibold mb-3 text-foreground/70">Connect</h3>
          <div className="flex items-center gap-5">
            <a href="https://github.com/" target="_blank" className="text-foreground/60 hover:text-primary transition">
              <FaGithub size={22} />
            </a>
            <a href="https://facebook.com/" target="_blank" className="text-foreground/60 hover:text-primary transition">
              <FaFacebook size={22} />
            </a>
            <a href="https://linkedin.com/" target="_blank" className="text-foreground/60 hover:text-primary transition">
              <FaLinkedin size={22} />
            </a>
            <a href="https://discord.com/" target="_blank" className="text-foreground/60 hover:text-primary transition">
              <FaDiscord size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60 py-4 px-4 flex items-center justify-between">
        <p className="text-xs text-foreground/50">
          &copy; {new Date().getFullYear()} KhulysoJohn — All rights reserved.
        </p>

        <a href="#hero" className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition flex items-center justify-center">
          <HiArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
};

