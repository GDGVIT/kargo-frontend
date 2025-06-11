import { GiCheckMark } from "react-icons/gi";
import VerifyEmail from "../../../components/Auth/VerifyEmail/VerifyEmail";
import PageHeading from "../../../components/ui/PageHeading/PageHeading";

export default function VerifyEmailPage() {
  return (
    <main>
      <PageHeading
        title="Verify Your Email"
        subtitle="Please verify your email address to continue."
        icon={<GiCheckMark />}
      />
      <VerifyEmail />
    </main>
  );
}
