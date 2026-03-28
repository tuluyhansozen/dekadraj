import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="w-full bg-footer pt-24 pb-8">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-serif text-3xl font-semibold text-action mb-4 block"
            >
              dekadraj
            </Link>
            <p className="font-sans text-sm text-ink leading-relaxed">
              Sinema sadece bir eğlence değil, bir hafıza ve direniş
              biçimidir. Her kare, bir duruştur.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs font-bold text-ink uppercase tracking-wider mb-4">
              Navigasyon
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/yazilar"
                  className="font-serif text-base text-ink hover:text-action transition-colors duration-300"
                >
                  Arşiv
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="font-serif text-base text-ink hover:text-action transition-colors duration-300"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="font-serif text-base text-ink hover:text-action transition-colors duration-300"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-sans text-xs font-bold text-ink uppercase tracking-wider mb-4">
              Sosyal
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-action hover:opacity-70 transition-opacity duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-action hover:opacity-70 transition-opacity duration-300"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a
                href="#"
                className="text-action hover:opacity-70 transition-opacity duration-300"
                aria-label="Letterboxd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="8" cy="12" r="6" opacity="0.5" />
                  <circle cx="16" cy="12" r="6" opacity="0.5" />
                  <path d="M12 18a6 6 0 0 0 4-1.5 6 6 0 0 0-8 0 6 6 0 0 0 4 1.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-sans text-xs font-bold text-ink uppercase tracking-wider mb-4">
              Haftalık Bülten
            </h4>
            <NewsletterForm />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-ink/20 pt-8">
          <p className="font-sans text-xs text-meta text-center">
            © {new Date().getFullYear()} Dekadraj. Tüm hakları saklıdır. Sinema
            bir direniş biçimidir.
          </p>
        </div>
      </div>
    </footer>
  );
}
