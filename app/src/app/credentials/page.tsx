import Credentials from '@/components/Credentials/Credentials';
import { PageHeading } from '@/components/ui';

const title = 'Manage Your Credentials';
const description = 'Add, edit, or remove your credentials.';

export const metadata = {
  title,
  description,
};

export default function CredentialsPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <Credentials />
    </main>
  );
}
