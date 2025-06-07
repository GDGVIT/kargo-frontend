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
    return (
      <div className="w-full mt-4 p-4 bg-gradient-to-br from-neutral-800/80 to-zinc-900/80 rounded-xl border border-sky-700 flex items-center justify-center animate-pulse">
        <span className="text-zinc-400">Loading plan details...</span>
      </div>
    );
  if (error)
    return (
      <div className="w-full mt-4 p-4 bg-gradient-to-br from-rose-900/80 to-zinc-900/80 rounded-xl border border-rose-700 flex items-center justify-center">
        <div className="text-rose-400">{error}</div>
      </div>
    );
  if (!plan) return null;

  return (
    <div className="w-full mt-4 p-4 bg-gradient-to-br from-sky-900/60 via-neutral-900/80 to-zinc-900/80 rounded-2xl border border-sky-700 shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-gradient-to-tr from-sky-400 via-sky-600 to-sky-800 rounded-full p-2 shadow-md">
          <FaCrown className="text-yellow-300 drop-shadow animate-bounce" />
        </span>
        <span className="text-base font-bold text-white select-none tracking-wide">
          {plan.name}
        </span>
        {plan.price !== undefined && (
          <span className="ml-2 text-sm text-sky-300 bg-sky-900/40 px-2 py-0.5 rounded-lg">
            ${plan.price}/mo
          </span>
        )}
      </div>
      {plan.description && (
        <div className="text-zinc-300 text-sm mb-2 italic">
          {plan.description}
        </div>
      )}
      {plan.resources && (
        <div className="flex flex-col gap-1 text-sm text-zinc-300 mt-2">
          {plan.resources.requests && (
            <div>
              <span className="font-medium text-sky-400">Requests:</span>
              <span className="ml-2">
                CPU: {plan.resources.requests.cpu || "-"} | Memory:{" "}
                {plan.resources.requests.memory || "-"}
              </span>
            </div>
          )}
          {plan.resources.limits && (
            <div>
              <span className="font-medium text-sky-400">Limits:</span>
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
