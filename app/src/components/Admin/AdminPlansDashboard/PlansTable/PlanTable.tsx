import React from "react";
import { Card } from "../../../ui/Card/Card";
import { AnimatedButton } from "../../../ui/AnimatedButton/AnimatedButton";
import Loader from "../../../ui/Loader/Loader";
import type { PlanTableProps } from "../../../../types/Plan";

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
        <div className="flex justify-center py-8">
          <Loader />
        </div>
      ) : planError ? (
        <Card>
          <div className="text-red-500">{planError}</div>
        </Card>
      ) : (
        <Card>
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
                    <AnimatedButton
                      className="!px-2 !py-1 !text-xs !rounded !bg-sky-600 hover:!bg-sky-700"
                      onClick={() => onEdit(plan)}
                      icon={null}
                    >
                      Edit
                    </AnimatedButton>
                    <AnimatedButton
                      className="!px-2 !py-1 !text-xs !rounded !bg-rose-600 hover:!bg-rose-700"
                      onClick={() => onDelete(plan._id)}
                      icon={null}
                    >
                      Delete
                    </AnimatedButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
};

export default PlanTable;
