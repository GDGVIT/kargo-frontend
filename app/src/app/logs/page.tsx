import PageHeading from "../../components/ui/PageHeading/PageHeading";
import LogApplicationPicker from "../../components/LogApplicationPicker/LogApplicationPicker";

const title = "Application Logs";
const description = "View the logs for your application.";

export default function LogsPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <LogApplicationPicker />
      <section className="mb-6">
        <p className="text-gray-400">Select an application to view its logs.</p>
      </section>
    </main>
  );
}
