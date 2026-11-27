
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const navItems = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Check active navigation link
  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] h-[80px] transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-background"
      )}
    >
      <div className="container mx-auto h-full flex items-center justify-between">

        {/* Logo and Brand Name */}
        <Link
          className="flex items-center gap-2 text-xl font-bold text-primary"
          to="/"
        >
          <img
            src={Logo}
            alt="Khuliso Thavhiwa Logo"
            className="w-10 h-10 object-contain"
          />

          <span className="text-foreground whitespace-nowrap">
            <span className="text-glow">Khuliso</span> Thavhiwa
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "transition-all duration-300",
                item.name === "Contact"
                  ? "px-5 py-2.5 rounded-full border border-primary text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-md"
                  : "hover:text-primary",
                isActive(item.to) && item.name !== "Contact"
                  ? "text-primary"
                  : ""
              )}
            >
              {item.name === "Contact" ? "Get in Touch" : item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40",
            "flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center space-y-8 text-xl">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "transition-all duration-300",
                  item.name === "Contact"
                    ? "px-6 py-3 rounded-full border border-primary text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-md"
                    : "hover:text-primary",
                  isActive(item.to) && item.name !== "Contact"
                    ? "text-primary"
                    : ""
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name === "Contact" ? "Get in Touch" : item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
