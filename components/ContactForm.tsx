"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı."),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı."),
  honeypot: z.string().max(0),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", honeypot: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="font-sans text-xs font-bold uppercase tracking-wider text-meta block mb-2">
          İsim
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className="w-full bg-transparent border-b-2 border-ink pb-2 font-sans text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/30 focus:border-action transition-colors"
        />
        {errors.name ? (
          <p className="font-sans text-sm text-action mt-1">{errors.name.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="font-sans text-xs font-bold uppercase tracking-wider text-meta block mb-2">
          E-posta
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          {...register("email")}
          className="w-full bg-transparent border-b-2 border-ink pb-2 font-sans text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/30 focus:border-action transition-colors"
        />
        {errors.email ? (
          <p className="font-sans text-sm text-action mt-1">{errors.email.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="font-sans text-xs font-bold uppercase tracking-wider text-meta block mb-2">
          Mesaj
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className="w-full bg-transparent border-b-2 border-ink pb-2 font-sans text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/30 focus:border-action transition-colors resize-none"
        />
        {errors.message ? (
          <p className="font-sans text-sm text-action mt-1">{errors.message.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="font-sans text-xs font-bold uppercase tracking-wider bg-action text-canvas px-8 py-3 hover:bg-ink transition-colors duration-300 disabled:opacity-50"
      >
        {status === "loading" ? "Gönderiliyor…" : "Gönder"}
      </button>

      <div aria-live="polite" aria-atomic="true">
        {status === "success" ? (
          <p className="font-sans text-sm text-action">
            Mesajınız başarıyla gönderildi. Teşekkürler!
          </p>
        ) : null}
        {status === "error" ? (
          <p className="font-sans text-sm text-action">
            Bir hata oluştu. Lütfen tekrar deneyin.
          </p>
        ) : null}
      </div>
    </form>
  );
}
