import ConfigureApp from "../../../components/Applications/ConfigureApp/ConfigureApp";

export default async function ApplicationConfigPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  return (
    <main>
      <ConfigureApp appId={id} />
    </main>
  );
}
