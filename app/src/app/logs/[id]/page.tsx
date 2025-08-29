"use client";

import Logs from "../../../components/Logs/Logs";
import { useParams } from "next/navigation";
import PageHeading from "../../../components/ui/PageHeading/PageHeading";

const title = "Application Logs";
const description = "View the logs for your application.";

export default function LogsPage() {
  const { id } = useParams() as { id: string };
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <Logs id={id} />
    </main>
  );
}
