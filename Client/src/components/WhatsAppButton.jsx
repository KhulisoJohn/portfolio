import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/data/siteConfig";

// Fixed on every page (rendered once in Layout). The pop-up shows on hover
// and on keyboard focus.
export const WhatsAppButton = () => {
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-[90] group">
      <div
        role="tooltip"
        className="pointer-events-none absolute bottom-full right-0 mb-3 w-64 rounded-lg border border-border bg-card p-4 text-left text-sm shadow-lg opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
      >
        <p className="font-semibold">Chat on WhatsApp</p>
        <p className="mt-1 text-foreground/70">
          Hi! Have a data or web project in mind? Send me a message and we can
          talk it through.
        </p>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Khuliso on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
};