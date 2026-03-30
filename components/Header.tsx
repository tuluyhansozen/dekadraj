"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/yazilar", label: "ARŞİV" },
  { href: "/hakkimizda", label: "HAKKIMIZDA" },
  { href: "/iletisim", label: "İLETİŞİM" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isMobileMenuOpen, handleKeyDown]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 h-[60px] transition-colors duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-canvas border-b border-action"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
          <Link
            href="/"
            className={`font-sans text-[20px] font-bold tracking-[-0.5px] transition-opacity ${
              isActive("/") ? "text-action" : "text-action hover:opacity-80"
            }`}
          >
            dekadraj
          </Link>

          {/* Desktop Navigation + Social Icons (grouped right) */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8" aria-label="Ana menü">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-[14px] font-medium tracking-[0.28px] transition-colors duration-300 ${
                    isActive(link.href)
                      ? "text-action"
                      : "text-ink hover:text-action"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <span className="w-px h-5 bg-ink/20" aria-hidden="true" />

            <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/dekadrajsinema/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-action transition-colors duration-300"
            >
              <svg
                width="18"
                height="18"
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
              href="https://letterboxd.com/dekadrajsinema/"
              aria-label="Letterboxd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-action transition-colors duration-300"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="8" cy="12" r="6" opacity="0.5" />
                <circle cx="16" cy="12" r="6" opacity="0.5" />
                <path d="M12 18a6 6 0 0 0 4-1.5 6 6 0 0 0-8 0 6 6 0 0 0 4 1.5z" />
              </svg>
            </a>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-[6px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            <span
              className={`block w-6 h-[2px] bg-ink transition-transform duration-300 ${
                isMobileMenuOpen ? "translate-y-[8px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-ink transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-ink transition-transform duration-300 ${
                isMobileMenuOpen ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen ? (
        <div className="fixed inset-0 top-[60px] z-50 bg-canvas lg:hidden">
          <nav
            className="flex flex-col items-center justify-center h-full gap-12"
            aria-label="Mobil menü"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-2xl uppercase tracking-wider transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-action font-semibold"
                    : "text-ink hover:text-action"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
