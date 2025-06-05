"use client";

import { useEffect, useState } from "react";
import axios from "../../../utils/api";
import type { Plan } from "../../../types/Plan";

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

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [roleUpdating, setRoleUpdating] = useState<string | null>(null);
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
        // Get current user id for self-demote protection
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
        {planLoading ? (
          <div>Loading plans...</div>
        ) : planError ? (
          <div className="text-red-500">{planError}</div>
        ) : (
          <table className="w-full border text-sm mb-4">
            <thead>
              <tr className="bg-zinc-800 text-zinc-200">
                <th className="p-2">Name</th>
                <th className="p-2">Description</th>
                <th className="p-2">Resources</th>
                <th className="p-2">Default</th>
                <th className="p-2">Active</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan._id} className="border-b border-zinc-700">
                  <td className="p-2 font-semibold">{plan.name}</td>
                  <td className="p-2">{plan.description || "-"}</td>
                  <td className="p-2">
                    <pre className="whitespace-pre-wrap text-xs bg-zinc-900 p-2 rounded">
                      {JSON.stringify(plan.resources, null, 2)}
                    </pre>
                  </td>
                  <td className="p-2 text-center">
                    {plan.isDefault ? "✔️" : ""}
                  </td>
                  <td className="p-2 text-center">
                    {plan.isActive !== false ? "✔️" : ""}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="px-2 py-1 bg-sky-600 text-xs rounded hover:bg-sky-700"
                      onClick={() => openPlanForm(plan)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-rose-600 text-xs rounded hover:bg-rose-700"
                      onClick={() => handlePlanDelete(plan._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showPlanForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              className="bg-neutral-900 p-8 rounded-xl border border-neutral-700 w-full max-w-lg space-y-4 relative"
              onSubmit={handlePlanFormSubmit}
            >
              <button
                type="button"
                className="absolute top-3 right-3 text-zinc-400 hover:text-white"
                onClick={() => setShowPlanForm(false)}
              >
                ✕
              </button>
              <h3 className="text-lg font-bold mb-2">
                {editingPlan ? "Edit Plan" : "New Plan"}
              </h3>
              <div>
                <label className="block mb-1">Name</label>
                <input
                  className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
                  value={planForm.name}
                  onChange={(e) =>
                    setPlanForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  placeholder="Plan name"
                  title="Plan name"
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
                  value={planForm.description}
                  onChange={(e) =>
                    setPlanForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Description"
                  title="Description"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1">Requests CPU</label>
                  <input
                    className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
                    value={planForm.requestsCpu}
                    onChange={(e) =>
                      setPlanForm((f) => ({
                        ...f,
                        requestsCpu: e.target.value,
                      }))
                    }
                    placeholder="CPU"
                    title="Requests CPU"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Requests Memory</label>
                  <input
                    className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
                    value={planForm.requestsMemory}
                    onChange={(e) =>
                      setPlanForm((f) => ({
                        ...f,
                        requestsMemory: e.target.value,
                      }))
                    }
                    placeholder="Memory"
                    title="Requests Memory"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1">Limits CPU</label>
                  <input
                    className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
                    value={planForm.limitsCpu}
                    onChange={(e) =>
                      setPlanForm((f) => ({ ...f, limitsCpu: e.target.value }))
                    }
                    placeholder="CPU"
                    title="Limits CPU"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Limits Memory</label>
                  <input
                    className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
                    value={planForm.limitsMemory}
                    onChange={(e) =>
                      setPlanForm((f) => ({
                        ...f,
                        limitsMemory: e.target.value,
                      }))
                    }
                    placeholder="Memory"
                    title="Limits Memory"
                  />
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={planForm.isDefault}
                    onChange={(e) =>
                      setPlanForm((f) => ({
                        ...f,
                        isDefault: e.target.checked,
                      }))
                    }
                  />
                  Default (BASE)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={planForm.isActive}
                    onChange={(e) =>
                      setPlanForm((f) => ({ ...f, isActive: e.target.checked }))
                    }
                  />
                  Active
                </label>
              </div>
              {planFormError && (
                <div className="text-red-500">{planFormError}</div>
              )}
              <button
                type="submit"
                className="w-full py-2 rounded bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-50"
                disabled={planFormLoading}
              >
                {planFormLoading
                  ? "Saving..."
                  : editingPlan
                  ? "Update Plan"
                  : "Create Plan"}
              </button>
            </form>
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      {loading ? (
        <div>Loading users...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-zinc-800 text-zinc-200">
              <th className="p-2">Email</th>
              <th className="p-2">Username</th>
              <th className="p-2">Role</th>
              <th className="p-2">Plan</th>
              <th className="p-2">Resources</th>
              <th className="p-2">Extra Resources</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-zinc-700">
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.username || "-"}</td>
                <td className="p-2">
                  {user.role}
                  <div className="mt-1 flex flex-wrap gap-1">
                    {getRoleActions(user)}
                  </div>
                </td>
                <td className="p-2">
                  <select
                    className="bg-neutral-800 border border-neutral-700 rounded p-1 text-white"
                    value={
                      typeof user.plan === "string"
                        ? user.plan
                        : user.plan?._id || ""
                    }
                    onChange={(e) => handlePlanAssign(user._id, e.target.value)}
                    disabled={planAssigning === user._id}
                    title="Select plan for user"
                  >
                    <option value="">-</option>
                    {plans.map((plan) => (
                      <option key={plan._id} value={plan._id}>
                        {plan.name} {plan.isDefault ? "(BASE)" : ""}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  {user.resources ? (
                    <pre className="whitespace-pre-wrap text-xs bg-zinc-900 p-2 rounded">
                      {JSON.stringify(user.resources, null, 2)}
                    </pre>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-2">
                  {extraResourcesEdit[user._id] ? (
                    <div className="space-y-1">
                      <div className="flex gap-2 mb-1">
                        <input
                          className="w-20 p-1 rounded bg-neutral-800 border border-neutral-700 text-xs text-white"
                          placeholder="Req CPU"
                          value={extraResourcesEdit[user._id].requestsCpu}
                          onChange={(e) =>
                            setExtraResourcesEdit((prev) => ({
                              ...prev,
                              [user._id]: {
                                ...prev[user._id],
                                requestsCpu: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          className="w-24 p-1 rounded bg-neutral-800 border border-neutral-700 text-xs text-white"
                          placeholder="Req Mem"
                          value={extraResourcesEdit[user._id].requestsMemory}
                          onChange={(e) =>
                            setExtraResourcesEdit((prev) => ({
                              ...prev,
                              [user._id]: {
                                ...prev[user._id],
                                requestsMemory: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-2 mb-1">
                        <input
                          className="w-20 p-1 rounded bg-neutral-800 border border-neutral-700 text-xs text-white"
                          placeholder="Lim CPU"
                          value={extraResourcesEdit[user._id].limitsCpu}
                          onChange={(e) =>
                            setExtraResourcesEdit((prev) => ({
                              ...prev,
                              [user._id]: {
                                ...prev[user._id],
                                limitsCpu: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          className="w-24 p-1 rounded bg-neutral-800 border border-neutral-700 text-xs text-white"
                          placeholder="Lim Mem"
                          value={extraResourcesEdit[user._id].limitsMemory}
                          onChange={(e) =>
                            setExtraResourcesEdit((prev) => ({
                              ...prev,
                              [user._id]: {
                                ...prev[user._id],
                                limitsMemory: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 bg-sky-600 text-xs rounded hover:bg-sky-700"
                          disabled={extraResourcesSaving === user._id}
                          onClick={() => handleExtraResourcesSave(user._id)}
                        >
                          Save
                        </button>
                        <button
                          className="px-2 py-1 bg-zinc-700 text-xs rounded hover:bg-zinc-800"
                          onClick={() =>
                            setExtraResourcesEdit((prev) => {
                              const copy = { ...prev };
                              delete copy[user._id];
                              return copy;
                            })
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {user.extraResources ? (
                        <pre className="whitespace-pre-wrap text-xs bg-zinc-900 p-2 rounded mb-1">
                          {JSON.stringify(user.extraResources, null, 2)}
                        </pre>
                      ) : (
                        <span>-</span>
                      )}
                      <button
                        className="px-2 py-1 bg-amber-500 text-xs rounded hover:bg-amber-600 mt-1"
                        onClick={() => openExtraResourcesEdit(user)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
