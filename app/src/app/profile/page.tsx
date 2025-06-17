import Profile from "../../components/Profile/Profile";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { PersonStanding } from "lucide-react";

const title = "Profile";
const description = "Manage your profile settings and preferences.";

export const metadata = {
  title,
  description,
};

export default function ProfilePage() {
  return (
    <main>
      <PageHeading
        title={title}
        subtitle={description}
        icon={<PersonStanding />}
      />
      <Profile />
    </main>
  );
}
