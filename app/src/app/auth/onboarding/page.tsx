import { BsDoorOpen } from "react-icons/bs";
import SetUsername from "../../../components/Auth/Onboarding/SetUsername/SetUsername";
import PageHeading from "@/components/ui/PageHeading/PageHeading";

export default function OnboardingPage() {
  return (
    <main>
      <PageHeading
        title="Onboarding"
        subtitle="Set up your account and preferences."
        icon={<BsDoorOpen />}
      />
      <SetUsername />
    </main>
  );
}
