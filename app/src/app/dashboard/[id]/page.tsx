import ConfigureApp from "../../../components/Dashboard/ConfigureApp/ConfigureApp";

export default async function DashboardAppConfigPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  return <ConfigureApp appId={id} />;
}
