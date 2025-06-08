import React from "react";
import ExtraResourcesEditor from "../../AdminPlansDashboard/ExtraResourcesEditor/ExtraResourcesEditor";

interface Resource {
  cpu?: string;
  memory?: string;
}

interface ExtraResource {
  requests?: Resource;
  limits?: Resource;
}

interface User {
  _id: string;
  email: string;
  username?: string;
  name?: string;
  role?: string;
  resources?: ExtraResource;
  extraResources?: ExtraResource;
  plan?: string | { _id: string; name: string; isDefault?: boolean };
}

interface Plan {
  _id: string;
  name: string;
  isDefault?: boolean;
}

interface ExtraResourcesEditState {
  [userId: string]: {
    requestsCpu: string;
    requestsMemory: string;
    limitsCpu: string;
    limitsMemory: string;
  };
}

interface UserTableProps {
  users: User[];
  plans: Plan[];
  planAssigning: string | null;
  extraResourcesEdit: ExtraResourcesEditState;
  extraResourcesSaving: string | null;
  onPlanAssign: (userId: string, planId: string) => void;
  onOpenExtraResourcesEdit: (user: User) => void;
  onExtraResourcesChange: (
    userId: string,
    field: string,
    value: string
  ) => void;
  onExtraResourcesSave: (userId: string) => void;
  onExtraResourcesCancel: (userId: string) => void;
  getRoleActions: (user: User) => React.ReactNode;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  plans,
  planAssigning,
  extraResourcesEdit,
  extraResourcesSaving,
  onPlanAssign,
  onOpenExtraResourcesEdit,
  onExtraResourcesChange,
  onExtraResourcesSave,
  onExtraResourcesCancel,
  getRoleActions,
}) => (
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
                typeof user.plan === "string" ? user.plan : user.plan?._id || ""
              }
              onChange={(e) => onPlanAssign(user._id, e.target.value)}
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
              <ExtraResourcesEditor
                userId={user._id}
                data={extraResourcesEdit[user._id]}
                onChange={(field, value) =>
                  onExtraResourcesChange(user._id, field, value)
                }
                onSave={() => onExtraResourcesSave(user._id)}
                onCancel={() => onExtraResourcesCancel(user._id)}
                saving={extraResourcesSaving === user._id}
              />
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
                  onClick={() => onOpenExtraResourcesEdit(user)}
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
);

export default UserTable;
