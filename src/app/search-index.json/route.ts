import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/kb/queries";

/** Static search index built from published nodes only (same loader that routes pages). */
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(buildSearchIndex(), { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
