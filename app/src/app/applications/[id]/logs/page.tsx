"use client";

import Logs from "../../../../components/Applications/Logs/Logs";
import { useParams } from "next/navigation";

export default function LogsPage() {
  const { id } = useParams() as { id: string };
  return (
    <main>
      <Logs id={id} />
    </main>
  );
}
