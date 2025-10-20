'use client';

import React, { useEffect, useState } from 'react';
import api from '@/utils/api';
import { AnimatedButton, useNotification } from '@/components/ui';
import type Plan from '../../../types/Plan/Plan';
import PlanTable from './PlansTable/PlanTable';
import PlanFormModal from './PlanFormModal/PlanFormModal';

export default function AdminPlansDashboard() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planLoading, setPlanLoading] = useState(true);
  const [planError, setPlanError] = useState('');
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [planForm, setPlanForm] = useState<{
    name: string;
    description: string;
    requestsCpu: string;
    requestsMemory: string;
    requestsStorage: string;
    limitsCpu: string;
    limitsMemory: string;
    limitsStorage: string;
    isDefault: boolean;
    isActive: boolean;
    price: string;
  }>({
    name: '',
    description: '',
    requestsCpu: '',
    requestsMemory: '',
    requestsStorage: '',
    limitsCpu: '',
    limitsMemory: '',
    limitsStorage: '',
    isDefault: false,
    isActive: true,
    price: '',
  });
  const [planFormLoading, setPlanFormLoading] = useState(false);
  const [planFormError, setPlanFormError] = useState('');
  const { notify } = useNotification();

  useEffect(() => {
    async function fetchPlans() {
      setPlanLoading(true);
      try {
        const res = await api.get('/api/plans');
        setPlans(res.data.plans || []);
      } catch {
        setPlanError('Failed to load plans');
      } finally {
        setPlanLoading(false);
      }
    }
    fetchPlans();
  }, []);

  function openPlanForm(plan?: Plan) {
    if (plan) {
      setEditingPlan(plan);
      setPlanForm({
        name: plan.name,
        description: plan.description || '',
        // Backend/base units are already: cpu in m, memory in MB, storage in GB
        requestsCpu: plan.resources?.requests?.cpu != null ? String(plan.resources.requests.cpu) : '',
        requestsMemory:
          plan.resources?.requests?.memory != null ? String(plan.resources.requests.memory) : '',
        requestsStorage:
          plan.resources?.requests?.storage != null ? String(plan.resources.requests.storage) : '',
        limitsCpu: plan.resources?.limits?.cpu != null ? String(plan.resources.limits.cpu) : '',
        limitsMemory:
          plan.resources?.limits?.memory != null ? String(plan.resources.limits.memory) : '',
        limitsStorage:
          plan.resources?.limits?.storage != null ? String(plan.resources.limits.storage) : '',
        isDefault: !!plan.isDefault,
        isActive: plan.isActive !== false,
        price: plan.price != null ? String(plan.price) : '',
      });
    } else {
      setEditingPlan(null);
      setPlanForm({
        name: '',
        description: '',
        requestsCpu: '',
        requestsMemory: '',
        requestsStorage: '',
        limitsCpu: '',
        limitsMemory: '',
        limitsStorage: '',
        isDefault: false,
        isActive: true,
        price: '',
      });
    }
    setShowPlanForm(true);
  }

  async function handlePlanFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlanFormLoading(true);
    setPlanFormError('');
    const planData = {
      name: planForm.name,
      description: planForm.description,
      resources: {
        requests: {
          // Send numeric values in base units expected by backend schema
          cpu: planForm.requestsCpu ? Number(planForm.requestsCpu) : undefined,
          memory: planForm.requestsMemory ? Number(planForm.requestsMemory) : undefined,
          storage: planForm.requestsStorage ? Number(planForm.requestsStorage) : undefined,
        },
        limits: {
          cpu: planForm.limitsCpu ? Number(planForm.limitsCpu) : undefined,
          memory: planForm.limitsMemory ? Number(planForm.limitsMemory) : undefined,
          storage: planForm.limitsStorage ? Number(planForm.limitsStorage) : undefined,
        },
      },
      isDefault: planForm.isDefault,
      isActive: planForm.isActive,
      price: planForm.price ? Number(planForm.price) : undefined,
    };
    try {
      if (editingPlan) {
        const res = await api.put(`/api/plans/${editingPlan._id}`, planData);
        setPlans((prev) => prev.map((p) => (p._id === editingPlan._id ? res.data.plan : p)));
        notify('Plan updated successfully', 'success');
      } else {
        const res = await api.post('/api/plans', planData);
        setPlans((prev) => [...prev, res.data.plan]);
        notify('Plan created successfully', 'success');
      }
      setShowPlanForm(false);
    } catch (err) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'message' in err.response.data
      ) {
        setPlanFormError((err.response as { message?: string }).message || 'Failed to save plan');
      } else {
        setPlanFormError('Failed to save plan');
      }
      notify('Failed to save plan', 'error');
    } finally {
      setPlanFormLoading(false);
    }
  }

  async function handlePlanDelete(planId: string) {
    try {
      await api.delete(`/api/plans/${planId}`);
      setPlans((prev) => prev.filter((p) => p._id !== planId));
      notify('Plan deleted successfully', 'success');
    } catch {
      notify('Failed to delete plan', 'error');
    }
  }

  return (
    <div className="max-w-6xl mx-auto ">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <AnimatedButton
            className="px-4 py-2 !rounded !bg-sky-600 hover:!bg-sky-700"
            onClick={() => openPlanForm()}
            icon={null}
          >
            + New Plan
          </AnimatedButton>
        </div>
        <PlanTable
          plans={plans}
          planLoading={planLoading}
          planError={planError}
          onEdit={openPlanForm}
          onDelete={handlePlanDelete}
        />
        <PlanFormModal
          show={showPlanForm}
          onClose={() => setShowPlanForm(false)}
          onSubmit={handlePlanFormSubmit}
          planForm={planForm}
          setPlanForm={setPlanForm}
          planFormLoading={planFormLoading}
          planFormError={planFormError}
          editingPlan={editingPlan}
        />
      </div>
    </div>
  );
}
