import PageHeading from "../../components/ui/PageHeading/PageHeading";

const title = "Application Logs";
const description = "View the logs for your application.";

export default function LogsPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <section className="p-8">Choose an application to view its logs</section>
    </main>
  );
}
