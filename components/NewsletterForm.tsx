"use client";

import { useState } from "react";

interface NewsletterFormProps {
  variant?: "footer" | "manifesto";
}

export function NewsletterForm({ variant = "footer" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (variant === "manifesto") {
    return (
      <div className="flex justify-center mt-16">
        {status === "success" ? (
          <p className="font-sans text-sm text-canvas uppercase tracking-wider">
            Abone oldunuz!
          </p>
        ) : (
          <button
            onClick={() => {
              const footerForm = document.querySelector<HTMLInputElement>(
                'input[type="email"]'
              );
              footerForm?.scrollIntoView({ behavior: "smooth" });
              footerForm?.focus();
            }}
            className="font-sans text-[11px] font-bold text-canvas border border-canvas px-7 py-3.5 uppercase tracking-[1px] hover:bg-canvas hover:text-action transition-colors duration-300"
          >
            Abone Ol
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="newsletter-email" className="sr-only">
        E-posta adresiniz
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-posta adresiniz…"
        autoComplete="email"
        spellCheck={false}
        className="w-full bg-transparent border-b-2 border-ink pb-2 font-sans text-sm text-ink placeholder:text-meta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/30 focus:border-action transition-colors"
        required
      />
      <div aria-live="polite" aria-atomic="true">
        {status === "success" ? (
          <p className="font-sans text-xs text-action">Abone oldunuz!</p>
        ) : status === "error" ? (
          <p className="font-sans text-xs text-action">Bir hata oluştu. Tekrar deneyin.</p>
        ) : null}
      </div>
      {status !== "success" && status !== "error" ? (
        <button
          type="submit"
          disabled={status === "loading"}
          className="font-sans text-xs font-bold text-ink hover:text-action transition-colors duration-300 uppercase tracking-wider disabled:opacity-50"
        >
          {status === "loading" ? "Gönderiliyor…" : "Abone Ol →"}
        </button>
      ) : null}
    </form>
  );
}
