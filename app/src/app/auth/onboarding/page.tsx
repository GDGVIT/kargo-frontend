import Onboarding from '@/components/Auth/Onboarding/Onboarding';
import { PageHeading } from '@/components/ui';

export default function OnboardingPage() {
  return (
    <main>
      <PageHeading title="Onboarding" subtitle="Set up your account and preferences." />
      <Onboarding />
    </main>
  );
}
