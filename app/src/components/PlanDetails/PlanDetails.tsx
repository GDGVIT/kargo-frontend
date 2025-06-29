import React, { useEffect, useState } from "react";
import axios from "../../utils/api";
import { FaCrown, FaMicrochip, FaMemory } from "react-icons/fa";
import { FaFloppyDisk } from "react-icons/fa6";
import type Plan from "../../types/Plan/Plan";
import type PlanDetailsProps from "../../types/Plan/PlanDetailsProps";
import Card from "../ui/Card/Card";
import Loader from "../ui/Loader/Loader";
import useNotification from "../ui/Notification/Notification";
import { formatCpu, formatMemory, formatStorage } from "../../utils/resources";

const ResourceItem = ({
  icon,
  label,
  value,
  color = "text-white",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}) => (
  <div className="flex items-center gap-2 min-w-0">
    {icon}
    <span className="text-zinc-400 whitespace-nowrap">{label}:</span>
    <span className={`font-mono ${color} truncate`}>{value}</span>
  </div>
);

const PlanDetails: React.FC<PlanDetailsProps> = ({ planId, planObj }) => {
  const [plan, setPlan] = useState<Plan | null>(planObj || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useNotification();

  useEffect(() => {
    if (planObj || !planId) return;
    setLoading(true);
    setError(null);
    axios
      .get(`/api/plans/${planId}`)
      .then((res) => setPlan(res.data))
      .catch((err) => {
        if (err.response?.status === 404) {
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
  if (error || !plan) return null;

  return (
    <Card className="w-full">
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="bg-sky-900 rounded-full p-2">
          <FaCrown className="text-yellow-300 text-xl" />
        </span>
        <span className="text-lg font-bold text-white tracking-wide">
          {plan.name}
        </span>
        {plan.price !== undefined && (
          <span className="ml-3 text-base font-semibold text-sky-200 bg-sky-900 px-3 py-1 rounded-xl border border-sky-700">
            ₹{(plan.price / 100).toLocaleString("en-IN")}/mo
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
          <div className="h-px w-full bg-zinc-700 my-4" />

          <div className="flex flex-col gap-6 text-sm text-zinc-200">
            {plan.resources.requests && (
              <div className="flex flex-col bg-zinc-900/50 border border-zinc-700 rounded-xl p-4">
                <h3 className="font-semibold text-xs tracking-wide mb-3 flex items-center gap-2 text-sky-300">
                  <span className="bg-sky-800 text-sky-200 px-2 py-0.5 rounded-md">
                    Requests
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <ResourceItem
                    icon={
                      <FaMicrochip className="w-4 h-4 text-sky-300 shrink-0" />
                    }
                    label="CPU"
                    value={formatCpu(plan.resources.requests.cpuMilli)}
                    color="text-sky-200"
                  />
                  <ResourceItem
                    icon={
                      <FaMemory className="w-4 h-4 text-emerald-300 shrink-0" />
                    }
                    label="Memory"
                    value={formatMemory(plan.resources.requests.memoryMB)}
                    color="text-emerald-200"
                  />
                  <ResourceItem
                    icon={
                      <FaFloppyDisk className="w-4 h-4 text-yellow-300 shrink-0" />
                    }
                    label="Storage"
                    value={formatStorage(plan.resources.requests.storageGB)}
                    color="text-yellow-200"
                  />
                </div>
              </div>
            )}

            {plan.resources.limits && (
              <div className="flex flex-col bg-zinc-900/50 border border-zinc-700 rounded-xl p-4">
                <h3 className="font-semibold text-xs tracking-wide mb-3 flex items-center gap-2 text-rose-300">
                  <span className="bg-rose-800 text-rose-200 px-2 py-0.5 rounded-md">
                    Limits
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <ResourceItem
                    icon={
                      <FaMicrochip className="w-4 h-4 text-sky-300 shrink-0" />
                    }
                    label="CPU"
                    value={String(plan.resources.limits.cpuMilli)}
                    color="text-sky-200"
                  />
                  <ResourceItem
                    icon={
                      <FaMemory className="w-4 h-4 text-emerald-300 shrink-0" />
                    }
                    label="Memory"
                    value={String(plan.resources.limits.memoryMB)}
                    color="text-emerald-200"
                  />
                  <ResourceItem
                    icon={
                      <FaFloppyDisk className="w-4 h-4 text-yellow-300 shrink-0" />
                    }
                    label="Storage"
                    value={String(plan.resources.limits.storageGB)}
                    color="text-yellow-200"
                  />
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
