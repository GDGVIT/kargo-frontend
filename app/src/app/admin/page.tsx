import { PageHeading } from '@/components/ui';
import AdminDashboard from '@/components/Admin/AdminDashboard';

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
