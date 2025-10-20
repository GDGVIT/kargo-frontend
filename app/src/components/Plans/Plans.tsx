'use client';

import React, { useEffect, useState } from 'react';
import api from '@/utils/api';
import type Plan from '@/types/Plan/Plan';
import { useNotification, Loader, Card, AnimatedButton } from '@/components/ui';
import { formatCpuMilli, formatMemory, formatStorage } from '@/utils/resources';

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { notify } = useNotification();

  useEffect(() => {
    async function fetchPlans() {
      setLoading(true);
      try {
        const res = await api.get('/api/plans');
        setPlans(res.data.plans || []);
      } catch {
        setError('Failed to load plans');
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  const handleBuy = () => {
    notify('Plan selection feature coming soon!', 'info');
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {plans
        .filter((p) => p.isActive !== false)
        .map((plan) => (
          <Card key={plan._id} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">{plan.name}</span>
              {plan.isDefault && (
                <span className="bg-sky-700 text-xs px-2 py-1 rounded text-white ml-2">
                  Default
                </span>
              )}
            </div>
            <div className="text-zinc-400 italic">{plan.description}</div>
            <div className="flex flex-col gap-1 text-sm">
              {plan.resources && (
                <>
                  <div>
                    <span className="font-semibold">Requests:</span> CPU:{' '}
                    {formatCpuMilli(plan.resources.requests?.cpu)}, Memory:{' '}
                    {formatMemory(plan.resources.requests?.memory)}, Storage:{' '}
                    {formatStorage(plan.resources.requests?.storage)}
                  </div>
                  <div>
                    <span className="font-semibold">Limits:</span> CPU:{' '}
                    {formatCpuMilli(plan.resources.limits?.cpu)}, Memory:{' '}
                    {formatMemory(plan.resources.limits?.memory)}, Storage:{' '}
                    {formatStorage(plan.resources.limits?.storage)}
                  </div>
                </>
              )}
            </div>
            <AnimatedButton
              className="mt-2 !bg-sky-600 hover:!bg-sky-700"
              onClick={handleBuy}
            >
              Select Plan
            </AnimatedButton>
          </Card>
        ))}
    </div>
  );
};

export default Plans;
