import { NextRequest, NextResponse } from "next/server";

const channels = new Set(["instagram-bio","instagram-story","tiktok-bio","linkedin-posts","linkedin-proposals","direct-messages","email-signature","newsletter","general"]);

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!channels.has(slug)) return new NextResponse("Not found", { status: 404 });
  const source = slug.startsWith("linkedin") ? "linkedin" : slug.startsWith("instagram") ? "instagram" : slug.startsWith("tiktok") ? "tiktok" : slug;
  const destination = new URL("https://jgohire.com");
  destination.searchParams.set("utm_source", source);
  destination.searchParams.set("utm_medium", "social");
  destination.searchParams.set("utm_campaign", "jgo_hire");
  destination.searchParams.set("utm_content", slug);
  return NextResponse.redirect(destination, 307);
}
