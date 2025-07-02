import { NextRequest } from "next/server";
import { createOgImage } from "../../og-image-util";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "Kargo";
  const image = createOgImage({ text });
  return image;
}
