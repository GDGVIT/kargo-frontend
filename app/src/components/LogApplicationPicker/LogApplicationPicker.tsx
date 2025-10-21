'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select, AnimatedButton } from '@/components/ui';
import api from '@/utils/api';

interface Application {
  _id: string;
  name: string;
}

export default function LogApplicationPicker({ selectedId }: { selectedId?: string }) {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setError('');
    api
      .get('/api/applications')
      .then((res) => {
        setApps(res.data.applications || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load applications');
        setLoading(false);
      });
  }, []);

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center">
      <label htmlFor="log-app-picker" className="font-semibold text-zinc-300">
        Select Application:
      </label>
      <Select
        value={selectedId || ''}
        onChange={(id) => {
          if (id) router.push(`/logs/${id}`);
        }}
        options={apps.map((app) => ({ value: app._id, label: app.name }))}
        placeholder={loading ? 'Loading...' : 'Choose an application'}
        disabled={loading || !apps.length}
        className="min-w-[180px]"
        error={error}
      />
      {error && <span className="text-red-400 ml-2">{error}</span>}
      <AnimatedButton
        onClick={() => router.push('/applications/add')}
        variant="primary"
        icon={null}
        className="ml-2"
      >
        Add Application
      </AnimatedButton>
    </div>
  );
}
