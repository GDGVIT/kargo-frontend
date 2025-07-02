import ogImageHandler, {
  defaultSize,
  defaultContentType,
} from "../../../_og/ogImageTemplate";

export const alt = "Application Logs";
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image({ params }: { params: { id: string } }) {
  return ogImageHandler({
    title: "Application Logs",
    description: `Logs for application ${params.id}`,
  });
}
