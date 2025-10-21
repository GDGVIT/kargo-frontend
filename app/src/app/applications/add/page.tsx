import { PageHeading } from '@/components/ui';
import AddAppForm from '@/components/Applications/AddAppForm/AddAppForm';

const title = 'Add Application';
const description = 'Fill in the details to add a new application.';

export const metadata = {
  title,
  description,
};

export default function AddAppPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <AddAppForm />
    </main>
  );
}
