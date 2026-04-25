import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

const noNewlines = (v: string) => !/[\r\n]/.test(v);

const schema = z.object({
  name: z.string().min(2).max(200).refine(noNewlines, "Geçersiz karakter."),
  email: z.string().email().max(320).refine(noNewlines, "Geçersiz karakter."),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0),
  turnstileToken: z.string().optional(),
});

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const limit = rateLimit(req, { key: "contact", limit: 3, windowMs: 60_000 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Çok fazla deneme. Lütfen biraz sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz form verisi." }, { status: 400 });
  }

  const { name, email, message, turnstileToken } = parsed.data;

  const turnstileOk = await verifyTurnstile(turnstileToken);
  if (!turnstileOk) {
    return NextResponse.json({ error: "İnsan doğrulaması başarısız." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || "dekadrajsinema@gmail.com";

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not configured.");
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Dekadraj İletişim <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `Yeni İletişim Mesajı — ${name}`,
    text: `İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`,
    html: `
      <p><strong>İsim:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-posta:</strong> <a href="mailto:${encodeURIComponent(email)}">${escapeHtml(email)}</a></p>
      <hr />
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "E-posta gönderilemedi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
