import { FaGithub, FaFacebook, FaLinkedin, FaDiscord } from "react-icons/fa";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { toast, useToast } from "../hooks/use-toast";
import { useState } from "react";
import { submitContactForm } from "../lib/api";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setSubmitting] = useState(false);
  const [ formData, setFormData] = useState({name: "", email: "", message: ""});

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
};

const handleSublit = async (e.React.FormEvent<HTMLFormElement>) => {
  e.PreventDefault();
  setIsSubmitting(true);

  try {
    await submitContactForm(formData);
    toast({
      title: "Message sent!",
      description: "Thank you for your message, I will get back to you soon.",
    });
    setFormData({name: "", email: "", message: ""});
  } catch (error) {
    toast({
      title: "Something went wrong",
      description: 
        error instanceof Error
        ? error.message
        : "Could not send your message. Please try again or email directly.",
      variant: "destructive",
    })
  } finally {
    setIsSubmitting(false);
  }
};

return (
<section id="contact" className="py-24 px-4 relative bg-secondary/30">
  <div className="container mx-auto max-w-5xl">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
      Get In <span className="text-primary">Touch</span>
    </h2>

    <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
      Have a project in mind or want to collaborate? Feel free to reach out.
      I am always open to discussing new opportunities.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-12">
      {/* Contact infomation */}
      <div className="space-y-6">
        
      </div>
    </div>
  </div>
</section>
);
};
