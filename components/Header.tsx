"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-canvas" : "bg-transparent"
      }`}
      style={{
        height: "60px",
        borderBottom: isScrolled ? "1px solid #7D0A0A" : "none",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold text-action hover:opacity-80 transition-opacity"
        >
          dekadraj
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/yazilar"
            className="font-sans text-sm text-ink hover:text-action transition-colors duration-300"
          >
            ARŞİV
          </Link>
          <Link
            href="/hakkimizda"
            className="font-sans text-sm text-ink hover:text-action transition-colors duration-300"
          >
            HAKKIMIZDA
          </Link>
          <Link
            href="/iletisim"
            className="font-sans text-sm text-ink hover:text-action transition-colors duration-300"
          >
            İLETİŞİM
          </Link>
        </nav>
      </div>
    </header>
  );
}
