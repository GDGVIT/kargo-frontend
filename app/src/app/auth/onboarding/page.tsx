import { PageHeading } from '@/components/ui';
import Onboarding from '@/components/Auth/Onboarding/Onboarding';

export default function OnboardingPage() {
  return (
    <main>
      <PageHeading title="Onboarding" subtitle="Set up your account and preferences." />
      <Onboarding />
    </main>
  );
}
