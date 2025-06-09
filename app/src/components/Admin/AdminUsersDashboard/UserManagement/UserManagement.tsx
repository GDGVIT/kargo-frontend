import React from "react";
import UserTable from "../UserTable/UserTable";
import Card from "../../../ui/Card/Card";
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
    <Card>
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
    </Card>
  );
};

export default UserManagement;
