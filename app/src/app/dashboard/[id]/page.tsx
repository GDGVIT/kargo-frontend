"use client";

import ConfigureApp from "../../../components/Dashboard/ConfigureApp";

export default function DashboardAppConfigPage({
  params,
}: {
  params: { id: string };
}) {
  return <ConfigureApp appId={params.id} />;
}
