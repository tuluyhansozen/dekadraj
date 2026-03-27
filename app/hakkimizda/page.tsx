import { getSiteSettings } from "@/sanity/client";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

export const metadata = {
  title: "Hakkımızda — Dekadraj",
  description: "Dekadraj Sinema Kolektifi hakkında.",
};

export default async function HakkimizdaPage() {
  const settings = await getSiteSettings();

  return (
    <section className="max-w-[1400px] mx-auto px-8 py-24">
      <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-ink mb-12">
        Hakkımızda
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          {settings?.aboutContent ? (
            <PortableTextRenderer value={settings.aboutContent} />
          ) : (
            <p className="font-sans text-meta">İçerik yakında eklenecek.</p>
          )}
        </div>
      </div>
    </section>
  );
}
