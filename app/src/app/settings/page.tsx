import Settings from '../../components/Settings/Settings';
import PageHeading from '../../components/ui/PageHeading/PageHeading';

const title = 'Settings';
const description = 'Manage your profile and plans';

export const metadata = {
  title,
  description,
};

export default function SettingsPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} />
      <Settings />
    </main>
  );
}
