'use client';

import React, { useEffect, useState } from 'react';
import { FaCrown, FaMicrochip, FaMemory } from 'react-icons/fa';
import { FaFloppyDisk } from 'react-icons/fa6';
import { useNotification, Loader } from '@/components/ui';
import api from '@/utils/api';
import { formatCpuMilli, formatMemory, formatStorage } from '@/utils/resources';
import type Plan from '@/types/Plan/Plan';
import type PlanDetailsProps from '@/types/Plan/PlanDetailsProps';

const ResourceItem = ({
  icon,
  label,
  usage,
  max,
  color = 'text-white',
}: {
  icon: React.ReactNode;
  label: string;
  usage?: string;
  max: string;
  color?: string;
}) => (
  <div className="flex items-center gap-2 min-w-0 text-sm text-zinc-200">
    <div className="text-base">{icon}</div>
    <span className="text-zinc-400">{label}:</span>
    <span className={`font-mono ${color} truncate`}>
      {usage} / {max}
    </span>
  </div>
);

const PlanDetails: React.FC<PlanDetailsProps> = ({ planId, planObj }) => {
  const [plan, setPlan] = useState<Plan | null>(planObj || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<{
    requests?: {
      cpu?: number;
      memory?: number;
      storage?: number;
    };
    limits?: {
      cpu?: number;
      memory?: number;
      storage?: number;
    };
  } | null>(null);
  const { notify } = useNotification();

  useEffect(() => {
    if (planObj || !planId) return;
    setLoading(true);
    setError(null);
    api
      .get(`/api/plans/${planId}`)
      .then((res) => setPlan(res.data))
      .catch((err) => {
        const msg =
          err.response?.status === 404 ? 'Plan not found.' : 'Could not load plan details.';
        setError(msg);
        notify(msg, 'error');
      })
      .finally(() => setLoading(false));
  }, [planId, planObj, notify]);

  useEffect(() => {
    if (!planId && !planObj) return;
    api
      .get('/api/users/me/resource-usage')
      .then((res) => setUsage(res.data.usage))
      .catch(() => setUsage(null));
  }, [planId, planObj]);

  if (!planId && !planObj) return null;
  if (loading) return <Loader />;
  if (error || !plan) return null;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="bg-sky-900 rounded-full p-1.5">
          <FaCrown className="text-yellow-300 text-xl" />
        </span>
        <span className="text-xl font-semibold text-white">{plan.name}</span>
      </div>

      {plan.description && <div className="text-zinc-400 italic">{plan.description}</div>}

      {plan.resources && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.resources.requests && (
            <section>
              <h5 className="text-xs font-semibold text-sky-300 mb-1">
                <span className="bg-sky-800 text-sky-100 px-2 py-0.5 rounded-md">
                  Resource Requests
                </span>
              </h5>
              <div className="space-y-2 bg-zinc-900/50 p-2 rounded-xl border border-zinc-700">
                <ResourceItem
                  icon={<FaMicrochip className="text-sky-300" />}
                  label="CPU"
                  usage={usage ? formatCpuMilli(usage.requests?.cpu) : undefined}
                  max={formatCpuMilli(plan.resources.requests.cpu)}
                  color="text-sky-200"
                />
                <ResourceItem
                  icon={<FaMemory className="text-emerald-300" />}
                  label="Memory"
                  usage={usage ? formatMemory(usage.requests?.memory) : undefined}
                  max={formatMemory(plan.resources.requests.memory)}
                  color="text-emerald-200"
                />
                <ResourceItem
                  icon={<FaFloppyDisk className="text-yellow-300" />}
                  label="Storage"
                  usage={usage ? formatStorage(usage.requests?.storage) : undefined}
                  max={formatStorage(plan.resources.requests.storage)}
                  color="text-yellow-200"
                />
              </div>
            </section>
          )}

          {plan.resources.limits && (
            <section>
              <h5 className="text-xs font-semibold text-rose-300 mb-1">
                <span className="bg-rose-800 text-rose-100 px-2 py-0.5 rounded-md">
                  Resource Limits
                </span>
              </h5>
              <div className="space-y-2 bg-zinc-900/50 p-2 rounded-xl border border-zinc-700">
                <ResourceItem
                  icon={<FaMicrochip className="text-sky-300" />}
                  label="CPU"
                  max={formatCpuMilli(plan.resources.limits.cpu)}
                  usage={usage ? formatCpuMilli(usage.limits?.cpu) : undefined}
                  color="text-sky-200"
                />
                <ResourceItem
                  icon={<FaMemory className="text-emerald-300" />}
                  label="Memory"
                  max={formatMemory(plan.resources.limits.memory)}
                  usage={usage ? formatMemory(usage.limits?.memory) : undefined}
                  color="text-emerald-200"
                />
                <ResourceItem
                  icon={<FaFloppyDisk className="text-yellow-300" />}
                  label="Storage"
                  max={formatStorage(plan.resources.limits.storage)}
                  usage={usage ? formatStorage(usage.limits?.storage) : undefined}
                  color="text-yellow-200"
                />
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
};

export default PlanDetails;
export { ResourceItem };
