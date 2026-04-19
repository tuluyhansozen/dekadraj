import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().email().max(320),
});

export async function POST(req: NextRequest) {
  const limit = rateLimit(req, { key: "newsletter", limit: 5, windowMs: 60_000 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Çok fazla deneme. Lütfen biraz sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz e-posta." }, { status: 400 });
  }

  const { email } = parsed.data;

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const datacenter = apiKey?.split("-").pop();

  if (!apiKey || !listId || !datacenter) {
    // Graceful degradation if Mailchimp is not configured
    console.warn("Mailchimp environment variables not configured.");
    return NextResponse.json({ ok: true });
  }

  const response = await fetch(
    `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, status: "subscribed" }),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    // 400 "Member Exists" is not a real error
    if (data.title === "Member Exists") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Abone olma işlemi başarısız." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
