import Applications from "../../components/Applications/Applications";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { GrCloudSoftware } from "react-icons/gr";

export default function ApplicationPage() {
  return (
    <main>
      <PageHeading
        title="Applications"
        subtitle="Manage your applications and settings."
        icon={<GrCloudSoftware />}
      />
      <Applications />
    </main>
  );
}
