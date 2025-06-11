import Applications from "../../components/Applications/Applications";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { MdApps } from "react-icons/md";

export default function ApplicationPage() {
  return (
    <main>
      <PageHeading
        title="Applications"
        subtitle="Manage your applications and settings."
        icon={<MdApps />}
      />
      <Applications />
    </main>
  );
}
