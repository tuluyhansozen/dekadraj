import dynamic from "next/dynamic";
import { NewsletterForm } from "@/components/NewsletterForm";

const ContactForm = dynamic(
  () =>
    import("@/components/ContactForm").then((mod) => ({
      default: mod.ContactForm,
    })),
  { ssr: true }
);

export const metadata = {
  title: "İletişim — Dekadraj",
  description: "Dekadraj Sinema Kolektifi ile iletişime geçin.",
};

export default function IletisimPage() {
  return (
    <section className="max-w-[1400px] mx-auto px-8 py-24">
      <div className="max-w-[600px] mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-6">
          İletişim
        </h1>
        <p className="font-serif italic text-lg text-ink opacity-80 leading-relaxed mb-8">
          Sorularınız, önerileriniz veya işbirliği talepleriniz için bize
          yazabilirsiniz.
        </p>

        {/* Email */}
        <div className="mb-12">
          <p className="font-sans text-sm text-meta mb-1">E-posta</p>
          <a
            href="mailto:iletisim@dekadraj.com"
            className="font-sans text-lg text-ink hover:text-action transition-colors duration-300"
          >
            iletisim@dekadraj.com
          </a>
        </div>

        <ContactForm />

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-meta/20">
          <h2 className="font-serif text-2xl font-semibold text-ink mb-3">
            Haftalık Bülten
          </h2>
          <p className="font-sans text-sm text-meta leading-relaxed mb-6">
            Yeni yazılardan ve etkinliklerden haberdar olmak için bültenimize
            abone olun.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
