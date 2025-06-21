"use client";

import { useEffect, useState } from "react";
import axios from "../../../utils/api";
import type Plan from "../../../types/Plan/Plan";
import type User from "../../../types/User/User";
import UserManagement from "./UserManagement/UserManagement";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";
import useNotification from "../../ui/Notification/Notification";
import Loader from "../../ui/Loader/Loader";

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

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data.users || []);
        const me = await axios.get("/api/auth/me");
        setCurrentUserId(me.data?.user?._id || null);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await axios.get("/api/plans");
        setPlans(res.data.plans || []);
      } catch {
        // ignore
      }
    }
    fetchPlans();
  }, []);

  async function handleRoleChange(
    userId: string,
    newRole: "user" | "admin" | "superadmin"
  ) {
    setRoleUpdating(userId);
    try {
      await axios.put(`/api/users/${userId}/role`, { role: newRole });
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
      await axios.put(`/api/users/${userId}/plan`, { planId });
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
        requestsCpu: user.extraResources?.requests?.cpu || "",
        requestsMemory: user.extraResources?.requests?.memory || "",
        requestsStorage: user.extraResources?.requests?.storage || "",
        limitsCpu: user.extraResources?.limits?.cpu || "",
        limitsMemory: user.extraResources?.limits?.memory || "",
        limitsStorage: user.extraResources?.limits?.storage || "",
      },
    }));
  }

  async function handleExtraResourcesSave(userId: string) {
    setExtraResourcesSaving(userId);
    const data = extraResourcesEdit[userId];
    try {
      await axios.put(`/api/users/${userId}/extra-resources`, {
        extraResources: {
          requests: {
            cpu: data.requestsCpu,
            memory: data.requestsMemory,
            storage: data.requestsStorage,
          },
          limits: {
            cpu: data.limitsCpu,
            memory: data.limitsMemory,
            storage: data.limitsStorage,
          },
        },
      });
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId
            ? {
                ...u,
                extraResources: {
                  requests: {
                    cpu: data.requestsCpu,
                    memory: data.requestsMemory,
                    storage: data.requestsStorage,
                  },
                  limits: {
                    cpu: data.limitsCpu,
                    memory: data.limitsMemory,
                    storage: data.limitsStorage,
                  },
                },
              }
            : u
        )
      );
      setExtraResourcesEdit((prev) => {
        const copy = { ...prev };
        delete copy[userId];
        return copy;
      });
    } catch {
      alert("Failed to update extra resources");
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
        <AnimatedButton
          className={`!px-2 !py-1 !text-xs !rounded !bg-amber-500 hover:!bg-amber-600 mr-2 ${disabledClass}`}
          onClick={() => handleRoleChange(user._id, "admin")}
          icon={null}
        >
          Promote to Admin
        </AnimatedButton>
      );
    }
    if (user.role === "admin") {
      return (
        <>
          <AnimatedButton
            className={`!px-2 !py-1 !text-xs !rounded !bg-zinc-700 hover:!bg-zinc-800 mr-2 ${disabledClass}`}
            onClick={() => handleRoleChange(user._id, "user")}
            icon={null}
          >
            Demote to User
          </AnimatedButton>
          <AnimatedButton
            className={`!px-2 !py-1 !text-xs !rounded !bg-amber-500 hover:!bg-amber-600 ${disabledClass}`}
            onClick={() => handleRoleChange(user._id, "superadmin")}
            icon={null}
          >
            Promote to Superadmin
          </AnimatedButton>
        </>
      );
    }
    if (user.role === "superadmin") {
      return (
        <AnimatedButton
          className={`!px-2 !py-1 !text-xs !rounded !bg-zinc-700 hover:!bg-zinc-800 ${disabledClass}`}
          onClick={() => handleRoleChange(user._id, "admin")}
          icon={null}
        >
          Demote to Admin
        </AnimatedButton>
      );
    }
    return null;
  }

  // Helper to get only plan resources for a user
  function getPlanResources(user: User, plans: Plan[]) {
    let planObj = user.plan;
    if (!planObj) {
      return {
        requests: { cpu: "-", memory: "-" },
        limits: { cpu: "-", memory: "-" },
      };
    }
    if (typeof planObj === "string") {
      planObj = plans.find((p) => p._id === planObj);
    }
    if (!planObj || !planObj.resources) {
      return {
        requests: { cpu: "-", memory: "-" },
        limits: { cpu: "-", memory: "-" },
      };
    }
    const planResources = planObj.resources;
    // Format as string for display (e.g., "500m", "1Gi")
    function format(val?: string) {
      return val || "-";
    }
    return {
      requests: {
        cpu: format(planResources.requests?.cpu),
        memory: format(planResources.requests?.memory),
      },
      limits: {
        cpu: format(planResources.limits?.cpu),
        memory: format(planResources.limits?.memory),
      },
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
          // Pass allowedResources for each user
          allowedResources={users.reduce((acc, user) => {
            const planRes = getPlanResources(user, plans);
            acc[user._id] = planRes;
            return acc;
          }, {} as Record<string, { requests: { cpu: string; memory: string }; limits: { cpu: string; memory: string } }>)}
        />
      )}
    </div>
  );
}
