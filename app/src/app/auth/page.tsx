import Authenticate from "../../components/Auth/Authenticate/Authenticate";

const title = "Authentication";
const description = "Log in to your account to continue.";

export const metadata = {
  title,
  description,
};

export default function AuthPage() {
  return (
    <main style={{ justifyContent: "end" }}>
      <Authenticate />
    </main>
  );
}
