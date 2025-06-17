"use client";

import Logs from "../../../../components/Applications/Logs/Logs";
import { useParams } from "next/navigation";
import PageHeading from "../../../../components/ui/PageHeading/PageHeading";
import { MdSettings } from "react-icons/md";

const title = "Application Logs";
const description = "View the logs for your application.";

export const metadata = {
  title,
  description,
};

export default function LogsPage() {
  const { id } = useParams() as { id: string };
  return (
    <main>
      <PageHeading title={title} subtitle={description} icon={<MdSettings />} />
      <Logs id={id} />
    </main>
  );
}
