import { FaKey } from "react-icons/fa";
import Credentials from "../../components/Credentials/Credentials";
import PageHeading from "../../components/ui/PageHeading/PageHeading";

export default function CredentialsPage() {
  return (
    <main>
      <PageHeading
        title="Manage Your Credentials"
        subtitle="Add, edit, or remove your credentials."
        icon={<FaKey />}
      />
      <Credentials />
    </main>
  );
}
