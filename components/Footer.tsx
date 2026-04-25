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
              aria-label="Dekadraj — Anasayfa"
              className="group flex items-center gap-3 mb-4 w-fit transition-opacity hover:opacity-80"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-action"
              >
                <path
                  d="M4 13 V4 H13"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M19 28 H28 V19"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M16 12 V20 M12 16 H20"
                  className="stroke-ink"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              <span className="font-sans text-[22px] font-bold text-action tracking-[-0.5px]">
                dekadraj
              </span>
            </Link>
            <p className="font-sans text-sm text-ink leading-relaxed">
              Konformizmi reddeden, yeni bir bakış, yeni bir anlatım ve yeni
              bir biçim arayışındaki sinemacıların sözünü çoğaltmak için
              buradayız.
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
                href="https://www.instagram.com/dekadrajsinema/"
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
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://x.com/DekadrajSinema"
                className="text-action hover:opacity-70 transition-opacity duration-300"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://letterboxd.com/dekadrajsinema/"
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
                  aria-hidden="true"
                >
                  <circle cx="6.5" cy="12" r="5.5" opacity="0.5" />
                  <circle cx="12" cy="12" r="5.5" opacity="0.5" />
                  <circle cx="17.5" cy="12" r="5.5" opacity="0.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-sans text-xs font-bold text-ink uppercase tracking-wider mb-4">
              Aylık Bülten
            </h4>
            <NewsletterForm />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-ink/20 pt-8">
          <p className="font-sans text-xs text-meta text-center uppercase tracking-wider">
            © {new Date().getFullYear()} Dekadraj. Tüm hakları saklıdır. Sinema
            bir direniştir.
          </p>
        </div>
      </div>
    </footer>
  );
}
