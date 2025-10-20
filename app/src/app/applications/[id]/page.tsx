import ConfigureApp from '@/components/Applications/ConfigureApp/ConfigureApp';
import { PageHeading } from '@/components/ui';
import { generatePageMetadata } from '@/lib/metadata';

const title = 'Application Configuration';
const description = 'Configure your application configuration.';

export const metadata = generatePageMetadata({
  title,
  description,
  path: '/applications',
  imageAlt: 'Kargo - Application Configuration',
});

export default async function ApplicationConfigPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <ConfigureApp appId={id} />
    </main>
  );
}
