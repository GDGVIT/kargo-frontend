import { PageHeading } from '@/components/ui';
import { generatePageMetadata } from '@/lib/metadata';
import Applications from '@/components/Applications/Applications';

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
