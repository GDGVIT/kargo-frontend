import ogImageHandler, {
  defaultSize,
  defaultContentType,
} from "../_og/ogImageTemplate";
import { metadata } from "./page";

export const alt = metadata.title || "Kargo";
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image() {
  return ogImageHandler({
    title: metadata.title,
    description: metadata.description,
  });
}
