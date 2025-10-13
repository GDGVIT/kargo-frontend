import PageHeading from '../../components/ui/PageHeading/PageHeading';
import Card from '../../components/ui/Card/Card';

const title = 'Offline Mode';
const description = 'You are currently offline. Please check your network connection.';

export const metadata = {
  title,
  description,
};

export default function OfflinePage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <section>
        <Card className=" p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-100">You are offline</h1>
          <p className="text-gray-300 mb-6">
            It looks like you have lost your internet connection.
          </p>
        </Card>
      </section>
    </main>
  );
}
