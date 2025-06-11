import { MdOutlineVpnKey } from "react-icons/md";
import Credentials from "../../components/Credentials/Credentials";
import PageHeading from "../../components/ui/PageHeading/PageHeading";

export default function CredentialsPage() {
  return (
    <main>
      <PageHeading
        title="Manage Your Credentials"
        subtitle="Add, edit, or remove your credentials."
        icon={<MdOutlineVpnKey />}
      />
      <Credentials />
    </main>
  );
}
