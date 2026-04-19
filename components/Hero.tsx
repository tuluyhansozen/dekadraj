export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-32 pb-24">
      <div className="max-w-[1100px] mx-auto text-center space-y-8">
        {/* Main Logo */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold text-action mb-6 tracking-tight">
          dekadraj
        </h1>

        {/* Subtitle */}
        <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-ink leading-relaxed max-w-[800px] mx-auto">
          Kadrajın dışına bakan sinema topluluğu.
        </p>

        {/* Manifesto Text */}
        <div className="pt-12 max-w-[700px] mx-auto">
          <p className="font-sans text-base text-ink leading-loose">
            Konformizmi reddeden, yeni bir bakış, yeni bir anlatım ve yeni bir
            biçim arayışındaki sinemacıların sözünü çoğaltmak için buradayız.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-16">
          <a
            href="#content"
            aria-label="Yazılara geç"
            className="inline-block animate-bounce rounded-full p-2 text-action hover:opacity-70 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/50"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
