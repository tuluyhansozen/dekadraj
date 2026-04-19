import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Called by Sanity webhook to revalidate ISR cache.
// Sanity sends: { _type: string, slug?: { current: string } }
export async function POST(req: NextRequest) {
  const expected = process.env.SANITY_WEBHOOK_SECRET;
  const provided = req.headers.get("x-webhook-secret");

  // Fail closed: if the secret is not configured, reject all requests.
  // Prevents bypass when both env and header are empty strings.
  if (!expected || !provided || provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { _type, slug } = body as { _type: string; slug?: { current: string } };

  switch (_type) {
    case "article":
      revalidatePath("/yazilar");
      revalidatePath("/");
      if (slug?.current) {
        revalidatePath(`/yazilar/${slug.current}`);
      }
      break;
    case "author":
      if (slug?.current) {
        revalidatePath(`/yazarlar/${slug.current}`);
      }
      break;
    case "siteSettings":
      revalidatePath("/");
      revalidatePath("/hakkimizda");
      break;
    case "category":
    case "topic":
      revalidatePath("/yazilar");
      break;
    default:
      revalidatePath("/", "layout");
      break;
  }

  return NextResponse.json({ revalidated: true, type: _type });
}
