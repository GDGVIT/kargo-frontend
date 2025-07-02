import ogImageHandler, {
  defaultSize,
  defaultContentType,
} from "./_og/ogImageTemplate";
import { metadata as pageMetadata } from "./page";

const fallbackTitle = "Kargo";
const fallbackDescription =
  "Kargo lets you deploy containerized applications with full flexibility — AI-powered setup, secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.";

export const alt = (pageMetadata?.title as string) || fallbackTitle;
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image() {
  return ogImageHandler({
    title: (pageMetadata?.title as string) || fallbackTitle,
    description: (pageMetadata?.description as string) || fallbackDescription,
  });
}
