import AdminDashboard from "../../components/Admin/AdminDashboard";
import AdminOverallMetrics from "../../components/Admin/AdminOverallMetrics/AdminOverallMetrics";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { FiShield } from "react-icons/fi";
const title = "Admin Dashboard";
const description = "Manage your application settings.";

export const metadata = {
  title,
  description,
};

export default function AdminDashboardMenu() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} icon={<FiShield />} />
      <AdminOverallMetrics />
      <AdminDashboard />
    </main>
  );
}
