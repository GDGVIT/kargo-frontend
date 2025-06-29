import VerifyEmail from "../../../components/Auth/VerifyEmail/VerifyEmail";
import PageHeading from "../../../components/ui/PageHeading/PageHeading";
import { FiMail } from "react-icons/fi";

const title = "Verify Your Email";
const description = "Please verify your email address to continue.";

export const metadata = {
  title,
  description,
};

export default function VerifyEmailPage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} icon={<FiMail />} />
      <VerifyEmail />
    </main>
  );
}
