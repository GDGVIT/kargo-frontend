import ogImageHandler, {
  defaultSize,
  defaultContentType,
} from "../../_og/ogImageTemplate";

export const alt = "Onboarding";
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image() {
  return ogImageHandler({
    title: "Onboarding",
    description: "Set up your account and preferences.",
  });
}
