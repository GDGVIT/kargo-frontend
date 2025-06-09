import React from "react";
import UserTable from "../UserTable/UserTable";
import type UserManagementProps from "../../../../types/User/UserManagementProps";

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
