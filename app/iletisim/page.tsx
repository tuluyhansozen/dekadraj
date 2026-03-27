import dynamic from "next/dynamic";

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
      <div className="max-w-[600px]">
        <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-ink mb-6">
          İletişim
        </h1>
        <p className="font-serif italic text-lg text-ink opacity-80 leading-relaxed mb-12">
          Sorularınız, önerileriniz veya işbirliği talepleriniz için bize
          yazabilirsiniz.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
