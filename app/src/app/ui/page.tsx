import UIShowcase from "../../components/UIShowcase/UIShowcase";
import PageHeading from "../../components/ui/PageHeading/PageHeading";

const title = "UI Components Demo";
const description = "Showcase of all reusable UI components.";

export const metadata = {
  title,
  description,
};

export default function UIShowcasePage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <UIShowcase />
    </main>
  );
}
