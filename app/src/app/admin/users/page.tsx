import AdminUsersDashboard from "../../../components/Admin/AdminUsersDashboard/AdminUsersDashboard";
import PageHeading from "../../../components/ui/PageHeading/PageHeading";
import { MdAdminPanelSettings } from "react-icons/md";

export default function AdminUsersPage() {
  return (
    <main>
      <PageHeading
        title="Admin Users"
        subtitle="Manage your application users."
        icon={<MdAdminPanelSettings />}
      />
      <AdminUsersDashboard />
    </main>
  );
}
