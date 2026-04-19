"use client";

import { useState, useEffect } from "react";

export function SubscriptionPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    // Don't show if already dismissed or subscribed
    const dismissed = sessionStorage.getItem("newsletter-popup-dismissed");
    if (dismissed) return;

    const handleScroll = () => {
      // Show when user scrolls up (near top) or after a delay
      if (window.scrollY < 200) {
        setVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Show after 30 seconds or on scroll to top
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("newsletter-popup-dismissed")) {
        setVisible(true);
      }
    }, 30000);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("newsletter-popup-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => {
          handleDismiss();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 backdrop-blur-sm">
      <div className="relative bg-canvas max-w-md w-full mx-4 p-8 shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-meta hover:text-ink transition-colors"
          aria-label="Kapat"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="font-serif text-2xl font-semibold text-ink mb-3">
          Aylık Bülten
        </h2>
        <p className="font-sans text-sm text-meta leading-relaxed mb-6">
          Sinema haberlerinden, güncel gösterimlerden ve gündeme dair film
          tavsiyelerinden haberdar olmak için bültenimize abone olun.
        </p>

        {status === "success" ? (
          <p className="font-sans text-sm text-action font-bold">
            Abone oldunuz!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz..."
              required
              className="w-full bg-transparent border-b-2 border-ink pb-2 font-sans text-sm text-ink placeholder:text-meta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/30 focus:border-action transition-colors"
            />
            {status === "error" && (
              <p className="font-sans text-xs text-action">
                Bir hata oluştu. Tekrar deneyin.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-action text-canvas font-sans text-sm font-bold uppercase tracking-wider py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === "loading" ? "Gönderiliyor..." : "Abone Ol"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
