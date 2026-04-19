import { NextRequest } from "next/server";

// Basic in-memory rate limiter. On Vercel serverless this resets per cold start
// and doesn't share state across instances — good enough to deter trivial abuse.
// For production-grade limits, swap to Vercel KV / Upstash Redis.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  req: NextRequest,
  opts: { key: string; limit: number; windowMs: number }
): { allowed: boolean; retryAfterSec: number } {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const id = `${opts.key}:${ip}`;
  const now = Date.now();
  const bucket = buckets.get(id);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(id, { count: 1, resetAt: now + opts.windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (bucket.count >= opts.limit) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}
