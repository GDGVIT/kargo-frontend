"use client";

import Logs from "../../../../components/Applications/Logs/Logs";
import { useParams } from "next/navigation";
import PageHeading from "../../../../components/ui/PageHeading/PageHeading";
import { FiFileText } from "react-icons/fi";

const title = "Application Logs";
const description = "View the logs for your application.";

export default function LogsPage() {
  const { id } = useParams() as { id: string };
  return (
    <main>
      <PageHeading title={title} subtitle={description} icon={<FiFileText />} />
      <Logs id={id} />
    </main>
  );
}
