import { NewsletterForm } from "./NewsletterForm";

interface ManifestoBreakProps {
  quote: string | null;
  attribution: string | null;
}

export function ManifestoBreak({ quote, attribution }: ManifestoBreakProps) {
  return (
    <section className="w-full bg-action py-32 my-24">
      <div className="max-w-[900px] mx-auto px-8 text-center">
        {quote ? (
          <blockquote className="font-serif italic text-4xl lg:text-5xl text-canvas leading-[1.3] mb-6">
            &ldquo;{quote}&rdquo;
          </blockquote>
        ) : null}
        {attribution ? (
          <p className="font-sans text-sm text-canvas opacity-70 uppercase tracking-wider">
            — {attribution}
          </p>
        ) : null}
      </div>

      <NewsletterForm variant="manifesto" />
    </section>
  );
}
