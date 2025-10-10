import Applications from '../../components/Applications/Applications';
import PageHeading from '../../components/ui/PageHeading/PageHeading';
import { generatePageMetadata } from '../../lib/metadata';

const title = 'Applications';
const description = 'Manage your applications and settings.';

export const metadata = generatePageMetadata({
  title,
  description,
  path: '/applications',
  imageAlt: 'Kargo - Manage Applications',
});

export default function ApplicationPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <Applications />
    </main>
  );
}
