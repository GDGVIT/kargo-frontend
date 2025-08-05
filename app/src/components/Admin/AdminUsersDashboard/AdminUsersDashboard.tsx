"use client";

import { useEffect, useState } from "react";
import api from "../../../utils/api";
import UserManagement from "./UserManagement/UserManagement";
import Loader from "../../ui/Loader/Loader";
import type Plan from "../../../types/Plan/Plan";
import type User from "../../../types/User/User";
import type Resource from "../../../types/Application/Resource/Resource";
import useNotification from "../../ui/Notification/Notification";
import { formatPrice } from "../../../utils/resources";

export default function AdminUsersDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [roleUpdating, setRoleUpdating] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planAssigning, setPlanAssigning] = useState<string | null>(null);
  const [extraResourcesEdit, setExtraResourcesEdit] = useState<{
    [userId: string]: {
      requestsCpu: string;
      requestsMemory: string;
      requestsStorage: string;
      limitsCpu: string;
      limitsMemory: string;
      limitsStorage: string;
    };
  }>({});
  const [extraResourcesSaving, setExtraResourcesSaving] = useState<
    string | null
  >(null);
  const { notify } = useNotification();

  async function fetchUsers() {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/users");
      setUsers(res.data.users || []);
      const me = await api.get("/api/auth/me");
      setCurrentUserId(me.data?.user?._id || null);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await api.get("/api/plans");
        setPlans(res.data.plans || []);
      } catch {
        notify("Failed to load plans", "error");
      }
    }
    fetchPlans();
  }, [notify]);

  async function handleRoleChange(
    userId: string,
    newRole: "user" | "admin" | "superadmin"
  ) {
    setRoleUpdating(userId);
    try {
      await api.put(`/api/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      notify(
        `Role updated to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`,
        "success"
      );
    } catch {
      notify("Failed to update role", "error");
    } finally {
      setRoleUpdating(null);
    }
  }

  async function handlePlanAssign(userId: string, planId: string) {
    setPlanAssigning(userId);
    try {
      await api.put(`/api/users/${userId}/plan`, { planId });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, plan: planId } : u))
      );
      notify("Plan assigned successfully", "success");
    } catch {
      notify("Failed to assign plan", "error");
    } finally {
      setPlanAssigning(null);
    }
  }

  function openExtraResourcesEdit(user: User) {
    setExtraResourcesEdit((prev) => ({
      ...prev,
      [user._id]: {
        requestsCpu: user.extraResources?.requests?.cpuMilli?.toString() || "",
        requestsMemory:
          user.extraResources?.requests?.memoryMB?.toString() || "",
        requestsStorage:
          user.extraResources?.requests?.storageGB?.toString() || "",
        limitsCpu: user.extraResources?.limits?.cpuMilli?.toString() || "",
        limitsMemory: user.extraResources?.limits?.memoryMB?.toString() || "",
        limitsStorage: user.extraResources?.limits?.storageGB?.toString() || "",
      },
    }));
  }

  async function handleExtraResourcesSave(userId: string) {
    setExtraResourcesSaving(userId);
    const data = extraResourcesEdit[userId];
    try {
      await api.put(`/api/users/${userId}/extra-resources`, {
        extraResources: {
          requests: {
            cpuMilli: data.requestsCpu,
            memoryMB: data.requestsMemory,
            storageGB: data.requestsStorage,
          },
          limits: {
            cpuMilli: data.limitsCpu,
            memoryMB: data.limitsMemory,
            storageGB: data.limitsStorage,
          },
        },
      });
      setUsers(
        (prev) =>
          prev.map((u) =>
            u._id === userId
              ? {
                  ...u,
                  extraResources: {
                    requests: {
                      cpuMilli: data.requestsCpu,
                      memoryMB: data.requestsMemory,
                      storageGB: data.requestsStorage,
                    },
                    limits: {
                      cpuMilli: data.limitsCpu,
                      memoryMB: data.limitsMemory,
                      storageGB: data.limitsStorage,
                    },
                  },
                }
              : u
          ) as User[]
      );
      setExtraResourcesEdit((prev) => {
        const copy = { ...prev };
        delete copy[userId];
        return copy;
      });
      await fetchUsers();
      notify("Extra resources updated successfully!", "success");
    } catch {
      notify("Failed to update extra resources", "error");
    } finally {
      setExtraResourcesSaving(null);
    }
  }

  function getRoleActions(user: User) {
    if (!currentUserId || user._id === currentUserId) return null;
    const isDisabled = roleUpdating === user._id;
    const disabledClass = isDisabled
      ? "opacity-60 cursor-not-allowed pointer-events-none"
      : "";
    if (user.role === "user") {
      return (
        <button
          className={`!px-2 !py-1 !text-xs !rounded !bg-amber-500 hover:!bg-amber-600 mr-2 ${disabledClass}`}
          onClick={() => handleRoleChange(user._id, "admin")}
          disabled={isDisabled}
        >
          Promote to Admin
        </button>
      );
    }
    if (user.role === "admin") {
      return (
        <>
          <button
            className={`!px-2 !py-1 !text-xs !rounded !bg-zinc-700 hover:!bg-zinc-800 mr-2 ${disabledClass}`}
            onClick={() => handleRoleChange(user._id, "user")}
            disabled={isDisabled}
          >
            Demote to User
          </button>
          <button
            className={`!px-2 !py-1 !text-xs !rounded !bg-amber-500 hover:!bg-amber-600 ${disabledClass}`}
            onClick={() => handleRoleChange(user._id, "superadmin")}
            disabled={isDisabled}
          >
            Promote to Superadmin
          </button>
        </>
      );
    }
    if (user.role === "superadmin") {
      return (
        <button
          className={`!px-2 !py-1 !text-xs !rounded !bg-zinc-700 hover:!bg-zinc-800 ${disabledClass}`}
          onClick={() => handleRoleChange(user._id, "admin")}
          disabled={isDisabled}
        >
          Demote to Admin
        </button>
      );
    }
    return null;
  }

  function getPlanResources(user: User, plans: Plan[]) {
    let planObj = user.plan;
    if (!planObj) return null;
    if (typeof planObj === "string") {
      planObj = plans.find((p) => p._id === planObj);
    }
    if (!planObj || !planObj.resources) return null;
    const planResources = planObj.resources;
    return {
      requests: {
        cpuMilli: planResources.requests?.cpuMilli,
        memoryMB: planResources.requests?.memoryMB,
        storageGB: planResources.requests?.storageGB,
      },
      limits: {
        cpuMilli: planResources.limits?.cpuMilli,
        memoryMB: planResources.limits?.memoryMB,
        storageGB: planResources.limits?.storageGB,
      },
      price: planObj.price,
      formattedPrice: formatPrice(planObj.price),
    } as {
      requests: Resource;
      limits: Resource;
      price?: number;
      formattedPrice?: string;
    };
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <UserManagement
          users={users}
          plans={plans}
          planAssigning={planAssigning}
          extraResourcesEdit={extraResourcesEdit}
          extraResourcesSaving={extraResourcesSaving}
          onPlanAssign={handlePlanAssign}
          onOpenExtraResourcesEdit={openExtraResourcesEdit}
          onExtraResourcesChange={(userId, field, value) =>
            setExtraResourcesEdit((prev) => ({
              ...prev,
              [userId]: {
                ...prev[userId],
                [field]: value,
              },
            }))
          }
          onExtraResourcesSave={handleExtraResourcesSave}
          onExtraResourcesCancel={(userId) =>
            setExtraResourcesEdit((prev) => {
              const copy = { ...prev };
              delete copy[userId];
              return copy;
            })
          }
          getRoleActions={getRoleActions}
          allowedResources={users.reduce((acc, user) => {
            const planRes = getPlanResources(user, plans);
            const extra = user.extraResources || { requests: {}, limits: {} };
            function sumNum(a?: number, b?: number) {
              const av = typeof a === "number" ? a : 0;
              const bv = typeof b === "number" ? b : 0;
              return av + bv;
            }
            if (planRes) {
              acc[user._id] = {
                requests: {
                  cpuMilli: sumNum(
                    planRes.requests.cpuMilli,
                    extra.requests?.cpuMilli
                  ),
                  memoryMB: sumNum(
                    planRes.requests.memoryMB,
                    extra.requests?.memoryMB
                  ),
                  storageGB: sumNum(
                    planRes.requests.storageGB,
                    extra.requests?.storageGB
                  ),
                },
                limits: {
                  cpuMilli: sumNum(
                    planRes.limits.cpuMilli,
                    extra.limits?.cpuMilli
                  ),
                  memoryMB: sumNum(
                    planRes.limits.memoryMB,
                    extra.limits?.memoryMB
                  ),
                  storageGB: sumNum(
                    planRes.limits.storageGB,
                    extra.limits?.storageGB
                  ),
                },
              };
            }
            return acc;
          }, {} as Record<string, { requests: Resource; limits: Resource }>)}
        />
      )}
    </div>
  );
}
