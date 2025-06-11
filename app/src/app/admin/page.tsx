import AdminDashboard from "../../components/Admin/AdminDashboard";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { MdAdminPanelSettings } from "react-icons/md";

export default function AdminDashboardMenu() {
  return (
    <main>
      <PageHeading
        title="Admin Dashboard"
        subtitle="Manage your application settings."
        icon={<MdAdminPanelSettings />}
      />
      <AdminDashboard />
    </main>
  );
}
