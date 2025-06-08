"use client";

import { useEffect, useState } from "react";
import axios from "../../../utils/api";
import type { Plan } from "../../../types/Plan";
import PlanTable from "./PlansTable/PlanTable";
import PlanFormModal from "./PlanFormModal/PlanFormModal";

export default function AdminPlansDashboard() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planLoading, setPlanLoading] = useState(true);
  const [planError, setPlanError] = useState("");
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [planForm, setPlanForm] = useState({
    name: "",
    description: "",
    requestsCpu: "",
    requestsMemory: "",
    limitsCpu: "",
    limitsMemory: "",
    isDefault: false,
    isActive: true,
  });
  const [planFormLoading, setPlanFormLoading] = useState(false);
  const [planFormError, setPlanFormError] = useState("");

  useEffect(() => {
    async function fetchPlans() {
      setPlanLoading(true);
      try {
        const res = await axios.get("/api/plans");
        setPlans(res.data.plans || []);
      } catch {
        setPlanError("Failed to load plans");
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
        description: plan.description || "",
        requestsCpu: plan.resources?.requests?.cpu || "",
        requestsMemory: plan.resources?.requests?.memory || "",
        limitsCpu: plan.resources?.limits?.cpu || "",
        limitsMemory: plan.resources?.limits?.memory || "",
        isDefault: !!plan.isDefault,
        isActive: plan.isActive !== false,
      });
    } else {
      setEditingPlan(null);
      setPlanForm({
        name: "",
        description: "",
        requestsCpu: "",
        requestsMemory: "",
        limitsCpu: "",
        limitsMemory: "",
        isDefault: false,
        isActive: true,
      });
    }
    setShowPlanForm(true);
  }

  async function handlePlanFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlanFormLoading(true);
    setPlanFormError("");
    const planData = {
      name: planForm.name,
      description: planForm.description,
      resources: {
        requests: {
          cpu: planForm.requestsCpu,
          memory: planForm.requestsMemory,
        },
        limits: {
          cpu: planForm.limitsCpu,
          memory: planForm.limitsMemory,
        },
      },
      isDefault: planForm.isDefault,
      isActive: planForm.isActive,
    };
    try {
      if (editingPlan) {
        const res = await axios.put(`/api/plans/${editingPlan._id}`, planData);
        setPlans((prev) =>
          prev.map((p) => (p._id === editingPlan._id ? res.data.plan : p))
        );
      } else {
        const res = await axios.post("/api/plans", planData);
        setPlans((prev) => [...prev, res.data.plan]);
      }
      setShowPlanForm(false);
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
      ) {
        setPlanFormError(
          (err.response as { message?: string }).message ||
            "Failed to save plan"
        );
      } else {
        setPlanFormError("Failed to save plan");
      }
    } finally {
      setPlanFormLoading(false);
    }
  }

  async function handlePlanDelete(planId: string) {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await axios.delete(`/api/plans/${planId}`);
      setPlans((prev) => prev.filter((p) => p._id !== planId));
    } catch {
      alert("Failed to delete plan");
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Plans</h2>
          <button
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
            onClick={() => openPlanForm()}
          >
            + New Plan
          </button>
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
