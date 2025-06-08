import React from "react";

interface Plan {
  _id: string;
  name: string;
  description?: string;
  resources?: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
  isDefault?: boolean;
  isActive?: boolean;
}

interface PlanTableProps {
  plans: Plan[];
  planLoading: boolean;
  planError: string;
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
}

const PlanTable: React.FC<PlanTableProps> = ({
  plans,
  planLoading,
  planError,
  onEdit,
  onDelete,
}) => {
  return (
    <>
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
                <td className="p-2">{plan.description}</td>
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
                    onClick={() => onEdit(plan)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-rose-600 text-xs rounded hover:bg-rose-700"
                    onClick={() => onDelete(plan._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PlanTable;
