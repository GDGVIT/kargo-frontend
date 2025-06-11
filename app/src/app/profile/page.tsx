import Profile from "../../components/Profile/Profile";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import { PersonStanding } from "lucide-react";

export default function ProfilePage() {
  return (
    <main>
      <PageHeading
        title="Profile"
        subtitle="Manage your profile settings and preferences."
        icon={<PersonStanding />}
      />
      <Profile />
    </main>
  );
}
