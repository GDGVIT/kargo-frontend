const title = 'Terms of Service';

export const metadata = {
  title,
  description: title,
};

import { PageHeading } from '@/components/ui';

export default function TermsOfServicePage() {
  return (
    <main>
      <PageHeading title={title} subtitle="Last updated: June 18, 2025" />
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Kargo, you agree to be bound by these Terms of Service. If you do
          not agree, please do not use our platform.
        </p>
        <h2>2. Use of the Service</h2>
        <ul>
          <li>You must be at least 18 years old or have legal capacity to use this service.</li>
          <li>
            You are responsible for maintaining the confidentiality of your account credentials.
          </li>
          <li>
            You agree not to misuse the platform, including attempting unauthorized access or
            interfering with other users.
          </li>
        </ul>
        <h2>3. User Content</h2>
        <ul>
          <li>You retain ownership of your code and repositories.</li>
          <li>
            By using our Dockerization and deployment features, you grant us permission to process
            your code as necessary to provide the service.
          </li>
        </ul>
        <h2>4. Intellectual Property</h2>
        <p>
          All platform content, trademarks, and intellectual property (excluding user content) are
          owned by Kargo or its licensors.
        </p>
        <h2>5. Third-Party Services</h2>
        <p>
          Our platform integrates with third-party services (e.g., GitHub, AI providers). Your use
          of these services is subject to their respective terms and privacy policies.
        </p>
        <h2>6. Disclaimer of Warranties</h2>
        <p>
          The service is provided &quot;as is&quot; and &quot;as available&quot; without warranties
          of any kind. We do not guarantee that the platform will be error-free or uninterrupted.
        </p>
        <h2>7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Kargo shall not be liable for any indirect,
          incidental, or consequential damages arising from your use of the platform.
        </p>
        <h2>8. Changes to Terms</h2>
        <p>
          We may update these Terms of Service at any time. Continued use of the platform
          constitutes acceptance of the revised terms.
        </p>
        <h2>9. Contact</h2>
        <p>For questions about these Terms, contact us at dscvitvellore@gmail.com.</p>
      </section>
    </main>
  );
}
