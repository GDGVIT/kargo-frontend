import { createOgImage } from "./og-image-util";
import {
  defaultSize,
  defaultContentType,
  getTitleFromParams,
} from "../utils/og";

export const alt = "Kargo";
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image({ params }: { params?: Record<string, string> }) {
  const text = getTitleFromParams(params);
  return createOgImage({
    text,
    size,
  });
}
