'use client';

import { useRouter } from 'next/navigation';
import { FaUsers, FaClipboardList } from 'react-icons/fa';
import { Card, AnimatedButton } from '@/components/ui';
import AdminOverallMetrics from './AdminOverallMetrics/AdminOverallMetrics';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <>
      <Card className="max-w-md shadow-xl rounded-2xl p-10 flex flex-col items-center gap-8 border border-[#23283a]">
        <AnimatedButton
          onClick={() => router.push('/admin/users')}
          icon={<FaUsers className="h-5 w-5" />}
        >
          Manage Users
        </AnimatedButton>
        <AnimatedButton
          onClick={() => router.push('/admin/plans')}
          icon={<FaClipboardList className="h-5 w-5" />}
        >
          Manage Plans
        </AnimatedButton>
      </Card>

      <AdminOverallMetrics />
    </>
  );
}
