import { PageHeading } from '@/components/ui';
import AdminPlansDashboard from '@/components/Admin/AdminPlansDashboard/AdminPlansDashboard';

const title = 'Admin Plans';
const description =
  'Manage all subscription plans, view plan details, and control plan features. Use the actions below to create, edit, or delete plans. Changes are applied instantly.';

export const metadata = {
  title,
  description,
};

export default function AdminPlansPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <AdminPlansDashboard />
    </main>
  );
}
