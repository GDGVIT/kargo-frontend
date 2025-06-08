"use client";

import { useEffect, useState } from "react";
import axios from "../../../utils/api";
import type { Plan } from "../../../types/Plan";
import UserManagement from "./UserManagement/UserManagement";

interface User {
  _id: string;
  email: string;
  username?: string;
  name?: string;
  role?: string;
  resources?: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
  extraResources?: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
  plan?: string | Plan;
}

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
      limitsCpu: string;
      limitsMemory: string;
    };
  }>({});
  const [extraResourcesSaving, setExtraResourcesSaving] = useState<
    string | null
  >(null);

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

  async function handleRoleChange(userId: string, newRole: string) {
    setRoleUpdating(userId);
    try {
      await axios.put(`/api/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch {
      alert("Failed to update role");
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
    } catch {
      alert("Failed to assign plan");
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
        limitsCpu: user.extraResources?.limits?.cpu || "",
        limitsMemory: user.extraResources?.limits?.memory || "",
      },
    }));
  }

  async function handleExtraResourcesSave(userId: string) {
    setExtraResourcesSaving(userId);
    const data = extraResourcesEdit[userId];
    try {
      await axios.put(`/api/users/${userId}/extra-resources`, {
        extraResources: {
          requests: { cpu: data.requestsCpu, memory: data.requestsMemory },
          limits: { cpu: data.limitsCpu, memory: data.limitsMemory },
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
                  },
                  limits: { cpu: data.limitsCpu, memory: data.limitsMemory },
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
    if (user.role === "user") {
      return (
        <button
          className="px-2 py-1 bg-amber-500 text-xs rounded hover:bg-amber-600 mr-2"
          disabled={roleUpdating === user._id}
          onClick={() => handleRoleChange(user._id, "admin")}
        >
          Promote to Admin
        </button>
      );
    }
    if (user.role === "admin") {
      return (
        <>
          <button
            className="px-2 py-1 bg-zinc-700 text-xs rounded hover:bg-zinc-800 mr-2"
            disabled={roleUpdating === user._id}
            onClick={() => handleRoleChange(user._id, "user")}
          >
            Demote to User
          </button>
          <button
            className="px-2 py-1 bg-amber-500 text-xs rounded hover:bg-amber-600"
            disabled={roleUpdating === user._id}
            onClick={() => handleRoleChange(user._id, "superadmin")}
          >
            Promote to Superadmin
          </button>
        </>
      );
    }
    if (user.role === "superadmin") {
      return (
        <button
          className="px-2 py-1 bg-zinc-700 text-xs rounded hover:bg-zinc-800"
          disabled={roleUpdating === user._id}
          onClick={() => handleRoleChange(user._id, "admin")}
        >
          Demote to Admin
        </button>
      );
    }
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      {loading ? (
        <div>Loading users...</div>
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
        />
      )}
    </div>
  );
}
