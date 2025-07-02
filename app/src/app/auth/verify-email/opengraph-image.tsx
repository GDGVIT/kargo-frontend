import ogImageHandler, {
  defaultSize,
  defaultContentType,
} from "../../_og/ogImageTemplate";

export const alt = "Verify Your Email";
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image() {
  return ogImageHandler({
    title: "Verify Your Email",
    description: "Please verify your email address to continue.",
  });
}
