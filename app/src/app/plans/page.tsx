import PageHeading from '../../components/ui/PageHeading/PageHeading';
// import Plans from "../../components/Plans/Plans";

const title = 'Plans';
const description =
  // "Explore our subscription plans to find the right fit for your needs.";
  'Please contact support for more information about our plans.';

export const metadata = {
  title,
  description,
};

export default function PlansPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      {/* <Plans /> */}
      <div className="mt-8">
        <p className="text-gray-500">
          Please contact support for more information about our plans.
        </p>
      </div>
    </main>
  );
}
