import ConfigureApp from "../../../components/Applications/ConfigureApp/ConfigureApp";
import PageHeading from "../../../components/ui/PageHeading/PageHeading";
import { FiSliders } from "react-icons/fi";

const title = "Application Configuration";
const description = "Configure your application configuration.";

export const metadata = {
  title,
  description,
};

export default async function ApplicationConfigPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  return (
    <main>
      <PageHeading title={title} subtitle={description} icon={<FiSliders />} />
      <ConfigureApp appId={id} />
    </main>
  );
}
