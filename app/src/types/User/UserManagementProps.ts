import User from "./User";
import ExtraResourcesEditState from "../ExtraResources/ExtraResourcesEditState";

export default interface UserManagementProps {
  users: User[];
  plans: { _id: string; name: string; isDefault?: boolean }[];
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
