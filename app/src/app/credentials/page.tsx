import { MdOutlineVpnKey } from "react-icons/md";
import Credentials from "../../components/Credentials/Credentials";
import PageHeading from "../../components/ui/PageHeading/PageHeading";

const title = "Manage Your Credentials";
const description = "Add, edit, or remove your credentials.";

export const metadata = {
  title,
  description,
};

export default function CredentialsPage() {
  return (
    <main>
      <PageHeading
        title={title}
        subtitle={description}
        icon={<MdOutlineVpnKey />}
      />
      <Credentials />
    </main>
  );
}
