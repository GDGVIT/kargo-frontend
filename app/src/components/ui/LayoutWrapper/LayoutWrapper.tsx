'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAuth } from '@/components/Auth/AuthProvider/AuthProvider';
import { useIsClient } from '@/utils/hooks/useIsClient';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname, isClient]);

  if (!isClient) return null;

  return (
    <div
      className={clsx('transition-all', {
        'm-0': !isMobile && user,
        'mx-[var(--screen-horizontal-margin)]': isMobile || !user,
        'md:ml-52': !isMobile && user,
      })}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </div>
  );
}
