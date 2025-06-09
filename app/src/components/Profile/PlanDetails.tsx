import React, { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import axios from "../../utils/api";
import type Plan from "../../types/Plan/Plan";
import type PlanDetailsProps from "../../types/Plan/PlanDetailsProps";

const PlanDetails: React.FC<PlanDetailsProps> = ({ planId, planObj }) => {
  const [plan, setPlan] = useState<Plan | null>(planObj || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (planObj) return;
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
    <div className="w-full mt-4 p-6 bg-gradient-to-br from-sky-900/70 via-neutral-900/90 to-zinc-900/90 rounded-2xl border border-sky-700 shadow-2xl backdrop-blur-md transition-transform hover:scale-[1.015] hover:shadow-blue-900/40 duration-200">
      <div className="flex items-center gap-3 mb-3">
        <span className="bg-gradient-to-tr from-sky-400 via-sky-600 to-sky-800 rounded-full p-3 shadow-lg">
          <FaCrown className="text-yellow-300 drop-shadow animate-bounce text-xl" />
        </span>
        <span className="text-lg font-extrabold text-white select-none tracking-wide drop-shadow-sm">
          {plan.name}
        </span>
        {plan.price !== undefined && (
          <span className="ml-3 text-base font-semibold text-sky-200 bg-sky-900/60 px-3 py-1 rounded-xl shadow-inner border border-sky-700">
            ${plan.price}/mo
          </span>
        )}
      </div>
      {plan.description && (
        <div className="text-zinc-300 text-base mb-4 italic border-l-4 border-sky-700 pl-4 bg-zinc-900/40 py-2 rounded-md">
          {plan.description}
        </div>
      )}
      {plan.resources && (
        <>
          <div className="h-px w-full bg-gradient-to-r from-sky-700/60 via-zinc-700/30 to-sky-700/60 my-3" />
          <div className="flex flex-col gap-2 text-sm text-zinc-200 mt-2">
            {plan.resources.requests && (
              <div className="flex items-center gap-3 min-h-[2.5rem]">
                <span className="font-semibold text-sky-400 bg-sky-900/40 px-2 py-0.5 rounded-md text-xs tracking-wide shadow border border-sky-700 flex items-center h-7">
                  Requests
                </span>
                <div className="flex items-center gap-5 ml-2">
                  <div className="flex items-center gap-1 min-w-[90px]">
                    <svg
                      className="w-4 h-4 text-sky-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-zinc-400">CPU:</span>
                    <span className="font-mono text-sky-200 ml-1">
                      {plan.resources.requests.cpu || "-"}m
                    </span>
                  </div>
                  <div className="flex items-center gap-1 min-w-[110px]">
                    <svg
                      className="w-4 h-4 text-emerald-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="4" />
                    </svg>
                    <span className="text-zinc-400">Memory:</span>
                    <span className="font-mono text-emerald-200 ml-1">
                      {plan.resources.requests.memory || "-"}Mi
                    </span>
                  </div>
                </div>
              </div>
            )}
            {plan.resources.limits && (
              <div className="flex items-center gap-3 min-h-[2.5rem]">
                <span className="font-semibold text-pink-400 bg-pink-900/40 px-2 py-0.5 rounded-md text-xs tracking-wide shadow border border-pink-700 flex items-center h-7">
                  Limits
                </span>
                <div className="flex items-center gap-5 ml-2">
                  <div className="flex items-center gap-1 min-w-[90px]">
                    <svg
                      className="w-4 h-4 text-sky-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-zinc-400">CPU:</span>
                    <span className="font-mono text-sky-200 ml-1">
                      {plan.resources.limits.cpu || "-"}m
                    </span>
                  </div>
                  <div className="flex items-center gap-1 min-w-[110px]">
                    <svg
                      className="w-4 h-4 text-emerald-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="4" />
                    </svg>
                    <span className="text-zinc-400">Memory:</span>
                    <span className="font-mono text-emerald-200 ml-1">
                      {plan.resources.limits.memory || "-"}Mi
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlanDetails;
