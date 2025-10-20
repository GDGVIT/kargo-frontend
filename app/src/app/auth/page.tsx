import Authenticate from '@/components/Auth/Authenticate/Authenticate';
import { generatePageMetadata } from '@/lib/metadata';

const title = 'Authentication';
const description = 'Log in to your account to continue.';

export const metadata = generatePageMetadata({
  title,
  description,
  path: '/auth',
  imageAlt: 'Kargo - Authentication',
});

export default function AuthPage() {
  return (
    <main style={{ justifyContent: 'end' }}>
      <Authenticate />
    </main>
  );
}
