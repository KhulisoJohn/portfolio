import { PageHeader } from "../components/PageHeader";
import { ContactSection } from "../components/ContactSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export const ContactPage = () => {
  usePageTitle("Contact | Khuliso Thavhiwa");

  return (
    <>
      <PageHeader title="Get In" highlight="Touch">
        Have a project in mind or want to collaborate? Send a message, email me
        or chat on WhatsApp.
      </PageHeader>
      <ContactSection />
    </>
  );
};