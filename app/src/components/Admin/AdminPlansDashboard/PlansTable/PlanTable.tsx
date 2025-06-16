import React from "react";
import Card from "../../../ui/Card/Card";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import Loader from "../../../ui/Loader/Loader";
import type PlanTableProps from "../../../../types/Plan/PlanTableProps";
import { FaEdit, FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { formatCpu, formatMemory } from "../../../../utils/resources";

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
                    {plan.resources ? (
                      <div className="text-xs p-2 rounded flex flex-col gap-1">
                        <div>
                          <span className="font-semibold">Requests:</span>
                          <span className="ml-2">
                            CPU: {formatCpu(plan.resources.requests?.cpu)},
                            Memory:{" "}
                            {formatMemory(plan.resources.requests?.memory)}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold">Limits:</span>
                          <span className="ml-2">
                            CPU: {formatCpu(plan.resources.limits?.cpu)},
                            Memory:{" "}
                            {formatMemory(plan.resources.limits?.memory)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400">
                        No resources
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-center align-middle">
                    <div className="flex items-center justify-center h-full min-h-[28px]">
                      {plan.isDefault ? (
                        <FaCheckCircle
                          className="text-emerald-400 text-lg align-middle"
                          title="Default plan"
                        />
                      ) : (
                        <FaRegCircle
                          className="text-zinc-500 text-lg align-middle"
                          title="Not default"
                        />
                      )}
                    </div>
                  </td>
                  <td className="p-2 text-center align-middle">
                    <div className="flex items-center justify-center h-full min-h-[28px]">
                      {plan.isActive !== false ? (
                        <FaCheckCircle
                          className="text-emerald-400 text-lg align-middle"
                          title="Active"
                        />
                      ) : (
                        <FaRegCircle
                          className="text-zinc-500 text-lg align-middle"
                          title="Inactive"
                        />
                      )}
                    </div>
                  </td>
                  <td className="p-2 flex gap-2">
                    <AnimatedButton
                      className="!px-2 !py-1 !text-xs !rounded !bg-sky-600 hover:!bg-sky-700"
                      onClick={() => onEdit(plan)}
                      icon={<FaEdit className="text-white" />}
                    >
                      Edit
                    </AnimatedButton>
                    <AnimatedButton
                      className="!px-2 !py-1 !text-xs !rounded !bg-rose-600 hover:!bg-rose-700"
                      onClick={() => onDelete(plan._id)}
                      icon={<FaTrash className="text-white" />}
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
