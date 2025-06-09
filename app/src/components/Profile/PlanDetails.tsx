import React, { useEffect, useState } from "react";
import { FaCrown, FaMicrochip, FaMemory } from "react-icons/fa";
import axios from "../../utils/api";
import type Plan from "../../types/Plan/Plan";
import type PlanDetailsProps from "../../types/Plan/PlanDetailsProps";
import Card from "../ui/Card/Card";
import Loader from "../ui/Loader/Loader";
import useNotification from "../ui/Notification/Notification";

const PlanDetails: React.FC<PlanDetailsProps> = ({ planId, planObj }) => {
  const [plan, setPlan] = useState<Plan | null>(planObj || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useNotification();

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
          notify("Plan not found.", "error");
        } else {
          setError("Could not load plan details.");
          notify("Could not load plan details.", "error");
        }
      })
      .finally(() => setLoading(false));
  }, [planId, planObj, notify]);

  if (!planId && !planObj) return null;
  if (loading) return <Loader />;
  if (error) return null;
  if (!plan) return null;

  return (
    <Card className="w-full">
      <div className="flex items-center gap-3 mb-3">
        <span className="bg-sky-900 rounded-full p-2">
          <FaCrown className="text-yellow-300 text-xl" />
        </span>
        <span className="text-lg font-bold text-white select-none tracking-wide">
          {plan.name}
        </span>
        {plan.price !== undefined && (
          <span className="ml-3 text-base font-semibold text-sky-200 bg-sky-900 px-3 py-1 rounded-xl border border-sky-700">
            ${plan.price}/mo
          </span>
        )}
      </div>
      {plan.description && (
        <div className="text-zinc-300 text-base mb-4 italic border-l-4 border-sky-700 pl-4 bg-zinc-900 py-2 rounded-md">
          {plan.description}
        </div>
      )}
      {plan.resources && (
        <>
          <div className="h-px w-full bg-zinc-700 my-3" />
          <div className="flex flex-row gap-8 text-sm text-zinc-200 mt-2 flex-wrap">
            {plan.resources.requests && (
              <div className="flex flex-col min-w-[220px]">
                <span className="font-semibold px-2 py-0.5 rounded-md text-xs tracking-wide flex items-center h-7 mb-2">
                  Requests
                </span>
                <div className="flex items-center gap-5 ml-2">
                  <div className="flex items-center gap-1 min-w-[90px]">
                    <FaMicrochip className="w-4 h-4 text-sky-300" />
                    <span className="text-zinc-400">CPU:</span>
                    <span className="font-mono text-sky-200 ml-1">
                      {plan.resources.requests.cpu || "-"}m
                    </span>
                  </div>
                  <div className="flex items-center gap-1 min-w-[110px]">
                    <FaMemory className="w-4 h-4 text-emerald-300" />
                    <span className="text-zinc-400">Memory:</span>
                    <span className="font-mono text-emerald-200 ml-1">
                      {plan.resources.requests.memory || "-"}Mi
                    </span>
                  </div>
                </div>
              </div>
            )}
            {plan.resources.limits && (
              <div className="flex flex-col min-w-[220px]">
                <span className="font-semibold px-2 py-0.5 rounded-md text-xs tracking-wide flex items-center h-7 mb-2">
                  Limits
                </span>
                <div className="flex items-center gap-5 ml-2">
                  <div className="flex items-center gap-1 min-w-[90px]">
                    <FaMicrochip className="w-4 h-4 text-sky-300" />
                    <span className="text-zinc-400">CPU:</span>
                    <span className="font-mono text-sky-200 ml-1">
                      {plan.resources.limits.cpu || "-"}m
                    </span>
                  </div>
                  <div className="flex items-center gap-1 min-w-[110px]">
                    <FaMemory className="w-4 h-4 text-emerald-300" />
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
    </Card>
  );
};

export default PlanDetails;
