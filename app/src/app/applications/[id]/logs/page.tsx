"use client";

import Logs from "../../../../components/Applications/Logs/Logs";
import { useParams } from "next/navigation";
import PageHeading from "../../../../components/ui/PageHeading/PageHeading";
import { MdSettings } from "react-icons/md";

export default function LogsPage() {
  const { id } = useParams() as { id: string };
  return (
    <main>
      <PageHeading
        title="Application Logs"
        subtitle="View the logs for your application."
        icon={<MdSettings />}
      />
      <Logs id={id} />
    </main>
  );
}
