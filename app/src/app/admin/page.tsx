import AdminDashboard from '@/components/Admin/AdminDashboard';
import { PageHeading } from '@/components/ui';

const title = 'Admin Dashboard';
const description = 'Manage your application settings.';

export const metadata = {
  title,
  description,
};

export default function AdminDashboardMenu() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <AdminDashboard />
    </main>
  );
}
