import { PageHeading } from '@/components/ui';

const title = 'Plans';
const description = 'Please contact support for more information about our plans.';

export const metadata = {
  title,
  description,
};

export default function PlansPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <div className="mt-8">
        <p className="text-gray-500">
          Please contact support for more information about our plans.
        </p>
      </div>
    </main>
  );
}
