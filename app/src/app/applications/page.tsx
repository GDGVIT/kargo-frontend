import Applications from "../../components/Applications/Applications";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { FiBarChart2 } from "react-icons/fi";
const title = "Applications";
const description = "Manage your applications and settings.";

export const metadata = {
  title,
  description,
};

export default function ApplicationPage() {
  return (
    <main>
      <PageHeading
        title={title}
        subtitle={description}
        icon={<FiBarChart2 />}
      />
      <Applications />
    </main>
  );
}
