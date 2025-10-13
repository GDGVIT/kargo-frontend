'use client';

import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import type Plan from '../../types/Plan/Plan';
import AnimatedButton from '../ui/AnimatedButton/AnimatedButton';
import Card from '../ui/Card/Card';
import Loader from '../ui/Loader/Loader';
import loadRazorpayScript from '../../utils/loadRazorpayScript';
import useNotification from '../ui/Notification/Notification';
import { getRuntimeEnv } from '@/utils/getRuntimeEnv';
import { formatCpu, formatMemory, formatStorage } from '../../utils/resources';

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

  const handleBuy = async (plan: Plan) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      notify('Failed to load Razorpay SDK. Please try again.', 'error');
      return;
    }
    try {
      const { data } = await api.post(`/api/plans/${plan._id}/create-order`);
      const order = data.order;

      const options = {
        key: getRuntimeEnv('NEXT_PUBLIC_RAZORPAY_KEY_ID'),
        amount: order.amount,
        currency: order.currency,
        name: plan.name,
        description: plan.description,
        order_id: order.id,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          const verifyRes = await api.post(`/api/plans/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          if (verifyRes.data.success) {
            notify('Payment successful! Plan activated.', 'success');
          } else {
            notify('Payment verification failed.', 'error');
          }
        },
        prefill: {},
        theme: { color: '#0ea5e9' },
      };
      // @ts-expect-error Razorpay is a global injected by the SDK and not typed in TS
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      notify('Failed to initiate payment. Please try again.', 'error');
    }
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
              <div>
                <span className="font-semibold">Price:</span> ₹{(plan.price || 0) / 100}
              </div>
              {plan.resources && (
                <>
                  <div>
                    <span className="font-semibold">Requests:</span> CPU:{' '}
                    {formatCpu(plan.resources.requests?.cpu)}, Memory:{' '}
                    {formatMemory(plan.resources.requests?.memory)}, Storage:{' '}
                    {formatStorage(plan.resources.requests?.storage)}
                  </div>
                  <div>
                    <span className="font-semibold">Limits:</span> CPU:{' '}
                    {formatCpu(plan.resources.limits?.cpu)}, Memory:{' '}
                    {formatMemory(plan.resources.limits?.memory)}, Storage:{' '}
                    {formatStorage(plan.resources.limits?.storage)}
                  </div>
                </>
              )}
            </div>
            <AnimatedButton
              className="mt-2 !bg-sky-600 hover:!bg-sky-700"
              onClick={() => handleBuy(plan)}
            >
              Buy Plan
            </AnimatedButton>
          </Card>
        ))}
    </div>
  );
};

export default Plans;
