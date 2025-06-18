import PageHeading from "../../components/ui/PageHeading/PageHeading";
import Plans from "../../components/Plans/Plans";
import { GrCatalog } from "react-icons/gr";

const title = "Plans";
const description =
  "Explore our subscription plans to find the right fit for your needs.";

export const metadata = {
  title,
  description,
};

export default function PlansPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} icon={<GrCatalog />} />
      <Plans />
    </main>
  );
}
