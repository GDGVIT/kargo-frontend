import ConfigureApp from "../../../components/Applications/ConfigureApp/ConfigureApp";
import PageHeading from "../../../components/ui/PageHeading/PageHeading";
import { MdSettings } from "react-icons/md";

export default async function ApplicationConfigPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  return (
    <main>
      <PageHeading
        title="Application Configuration"
        subtitle="Configure your application configuration."
        icon={<MdSettings />}
      />
      <ConfigureApp appId={id} />
    </main>
  );
}
