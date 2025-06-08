import React from "react";
import UserTable from "../UserTable/UserTable";
import type { Plan } from "../../../../types/Plan";

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

interface UserManagementProps {
  users: User[];
  plans: Plan[];
  planAssigning: string | null;
  extraResourcesEdit: {
    [userId: string]: {
      requestsCpu: string;
      requestsMemory: string;
      limitsCpu: string;
      limitsMemory: string;
    };
  };
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

const UserManagement: React.FC<UserManagementProps> = ({
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
}) => {
  return (
    <UserTable
      users={users}
      plans={plans}
      planAssigning={planAssigning}
      extraResourcesEdit={extraResourcesEdit}
      extraResourcesSaving={extraResourcesSaving}
      onPlanAssign={onPlanAssign}
      onOpenExtraResourcesEdit={onOpenExtraResourcesEdit}
      onExtraResourcesChange={onExtraResourcesChange}
      onExtraResourcesSave={onExtraResourcesSave}
      onExtraResourcesCancel={onExtraResourcesCancel}
      getRoleActions={getRoleActions}
    />
  );
};

export default UserManagement;
