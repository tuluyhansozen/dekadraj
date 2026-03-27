import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  honeypot: z.string().max(0), // spam protection
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz form verisi." }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || "iletisim@dekadraj.com";

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not configured.");
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Dekadraj İletişim <noreply@dekadraj.com>",
    to: toEmail,
    replyTo: email,
    subject: `Yeni İletişim Mesajı — ${name}`,
    text: `İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`,
    html: `
      <p><strong>İsim:</strong> ${name}</p>
      <p><strong>E-posta:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr />
      <p>${message.replace(/\n/g, "<br />")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "E-posta gönderilemedi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
