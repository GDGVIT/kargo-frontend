import AdminUsersDashboard from "../../../components/Admin/AdminUsersDashboard/AdminUsersDashboard";
import PageHeading from "../../../components/ui/PageHeading/PageHeading";
import { MdAdminPanelSettings } from "react-icons/md";

export default function AdminUsersPage() {
  return (
    <main>
      <PageHeading
        title="Admin Users"
        subtitle="Manage all users, assign plans, edit extra resources, and control user roles. Use the actions below to promote, demote, or update user resources. Changes are applied instantly."
        icon={<MdAdminPanelSettings />}
      />
      <AdminUsersDashboard />
    </main>
  );
}
