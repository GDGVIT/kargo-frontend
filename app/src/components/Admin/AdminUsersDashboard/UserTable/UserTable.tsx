import React from "react";
import ExtraResourcesEditor from "../../AdminPlansDashboard/ExtraResourcesEditor/ExtraResourcesEditor";
import Card from "../../../ui/Card/Card";
import { Select } from "../../../ui/Select/Select";
import { AnimatedButton } from "../../../ui/AnimatedButton/AnimatedButton";
import type UserTableProps from "../../../../types/User/UserTableProps";

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
  currentUserId, // <-- add this prop
}) => (
  <Card>
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
              {user.role || ""}
              <div className="mt-1 flex flex-wrap gap-1">
                {getRoleActions(user) &&
                  React.Children.map(getRoleActions(user), (action, idx) => {
                    if (!action) return null;
                    if (!React.isValidElement(action)) return action;

                    const typeName =
                      typeof action.type === "function"
                        ? action.type.name
                        : null;
                    if (typeName === "AnimatedButton") {
                      return action;
                    }

                    if (
                      typeof action.type === "string" &&
                      action.type === "button"
                    ) {
                      const { className, onClick, disabled, children } =
                        action.props as React.ButtonHTMLAttributes<HTMLButtonElement>;
                      const disabledClass = disabled
                        ? "opacity-60 cursor-not-allowed pointer-events-none"
                        : "";
                      return (
                        <AnimatedButton
                          key={idx}
                          className={
                            (className?.replace("px-2 py-1", "!px-2 !py-1") ||
                              "!px-2 !py-1 !text-xs !rounded") +
                            " " +
                            disabledClass
                          }
                          onClick={onClick}
                          icon={null}
                        >
                          {children}
                        </AnimatedButton>
                      );
                    }
                    return action;
                  })}
              </div>
            </td>
            <td className="p-2">
              <Select
                options={plans.map((plan) => ({
                  value: plan._id,
                  label: plan.name + (plan.isDefault ? " (BASE)" : ""),
                }))}
                value={
                  typeof user.plan === "string"
                    ? user.plan
                    : user.plan?._id || ""
                }
                onChange={(e) => onPlanAssign(user._id, e.target.value)}
                // Allow self-assignment only if current user is superadmin
                disabled={
                  planAssigning === user._id ||
                  (currentUserId === user._id && user.role !== "superadmin")
                }
                aria-label="Select plan for user"
                className="min-w-[120px]"
              />
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
                  <AnimatedButton
                    className="!px-2 !py-1 !text-xs !rounded !bg-amber-500 hover:!bg-amber-600 mt-1"
                    onClick={() => onOpenExtraResourcesEdit(user)}
                    icon={null}
                  >
                    Edit
                  </AnimatedButton>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);

export default UserTable;
