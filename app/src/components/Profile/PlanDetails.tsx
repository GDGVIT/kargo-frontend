import React, { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import axios from "../../utils/api";
import type { Plan } from "../../types/Plan";

interface PlanDetailsProps {
  planId?: string;
  planObj?: Plan;
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ planId, planObj }) => {
  const [plan, setPlan] = useState<Plan | null>(planObj || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (planObj) return; // If planObj is provided, skip fetch
    if (!planId) return;
    setLoading(true);
    setError(null);
    axios
      .get(`/api/plans/${planId}`)
      .then((res) => setPlan(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("Plan not found.");
        } else {
          setError("Could not load plan details.");
        }
      })
      .finally(() => setLoading(false));
  }, [planId, planObj]);

  if (!planId && !planObj) return null;
  if (loading)
    return <div className="text-zinc-400">Loading plan details...</div>;
  if (error) return <div className="text-rose-400">{error}</div>;
  if (!plan) return null;

  return (
    <div className="w-full mt-4 p-4 bg-neutral-800 rounded-xl border border-sky-700">
      <div className="flex items-center gap-2 mb-2">
        <FaCrown className="text-sky-400" />
        <span className="text-base font-semibold text-white select-none">
          {plan.name}
        </span>
        {plan.price !== undefined && (
          <span className="ml-2 text-sm text-sky-300">${plan.price}/mo</span>
        )}
      </div>
      {plan.description && (
        <div className="text-zinc-300 text-sm mb-2">{plan.description}</div>
      )}
      {plan.resources && (
        <div className="flex flex-col gap-1 text-sm text-zinc-300">
          {plan.resources.requests && (
            <div>
              <span className="font-medium text-zinc-400">Requests:</span>
              <span className="ml-2">
                CPU: {plan.resources.requests.cpu || "-"} | Memory:{" "}
                {plan.resources.requests.memory || "-"}
              </span>
            </div>
          )}
          {plan.resources.limits && (
            <div>
              <span className="font-medium text-zinc-400">Limits:</span>
              <span className="ml-2">
                CPU: {plan.resources.limits.cpu || "-"} | Memory:{" "}
                {plan.resources.limits.memory || "-"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlanDetails;
