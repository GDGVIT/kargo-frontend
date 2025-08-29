"use client";

import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import useNotification from "../../ui/Notification/Notification";
import type Plan from "../../../types/Plan/Plan";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";
import PlanTable from "./PlansTable/PlanTable";
import PlanFormModal from "./PlanFormModal/PlanFormModal";

export default function AdminPlansDashboard() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planLoading, setPlanLoading] = useState(true);
  const [planError, setPlanError] = useState("");
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
    name: "",
    description: "",
    requestsCpu: "",
    requestsMemory: "",
    requestsStorage: "",
    limitsCpu: "",
    limitsMemory: "",
    limitsStorage: "",
    isDefault: false,
    isActive: true,
    price: "",
  });
  const [planFormLoading, setPlanFormLoading] = useState(false);
  const [planFormError, setPlanFormError] = useState("");
  const { notify } = useNotification();

  useEffect(() => {
    async function fetchPlans() {
      setPlanLoading(true);
      try {
        const res = await api.get("/api/plans");
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
        requestsCpu: plan.resources?.requests?.cpuMilli?.toString() || "",
        requestsMemory: plan.resources?.requests?.memoryMB?.toString() || "",
        requestsStorage: plan.resources?.requests?.storageGB?.toString() || "",
        limitsCpu: plan.resources?.limits?.cpuMilli?.toString() || "",
        limitsMemory: plan.resources?.limits?.memoryMB?.toString() || "",
        limitsStorage: plan.resources?.limits?.storageGB?.toString() || "",
        isDefault: !!plan.isDefault,
        isActive: plan.isActive !== false,
        price: plan.price ? String(plan.price) : "",
      });
    } else {
      setEditingPlan(null);
      setPlanForm({
        name: "",
        description: "",
        requestsCpu: "",
        requestsMemory: "",
        requestsStorage: "",
        limitsCpu: "",
        limitsMemory: "",
        limitsStorage: "",
        isDefault: false,
        isActive: true,
        price: "",
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
          cpuMilli: planForm.requestsCpu,
          memoryMB: planForm.requestsMemory,
          storageGB: planForm.requestsStorage,
        },
        limits: {
          cpuMilli: planForm.limitsCpu,
          memoryMB: planForm.limitsMemory,
          storageGB: planForm.limitsStorage,
        },
      },
      isDefault: planForm.isDefault,
      isActive: planForm.isActive,
      price: planForm.price ? planForm.price : undefined,
    };
    try {
      if (editingPlan) {
        const res = await api.put(`/api/plans/${editingPlan._id}`, planData);
        setPlans((prev) =>
          prev.map((p) => (p._id === editingPlan._id ? res.data.plan : p))
        );
        notify("Plan updated successfully", "success");
      } else {
        const res = await api.post("/api/plans", planData);
        setPlans((prev) => [...prev, res.data.plan]);
        notify("Plan created successfully", "success");
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
      notify("Failed to save plan", "error");
    } finally {
      setPlanFormLoading(false);
    }
  }

  async function handlePlanDelete(planId: string) {
    try {
      await api.delete(`/api/plans/${planId}`);
      setPlans((prev) => prev.filter((p) => p._id !== planId));
      notify("Plan deleted successfully", "success");
    } catch {
      notify("Failed to delete plan", "error");
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
