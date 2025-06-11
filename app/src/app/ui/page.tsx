import UIShowcase from "../../components/UIShowcase/UIShowcase";
import { MdDesignServices } from "react-icons/md";
import PageHeading from "../../components/ui/PageHeading/PageHeading";

export default function UIShowcasePage() {
  return (
    <main>
      <PageHeading
        title="UI Components Demo"
        subtitle="Showcase of all reusable UI components."
        icon={<MdDesignServices />}
      />
      <UIShowcase />
    </main>
  );
}
