// User resource types
export interface Resource {
  cpu?: string;
  memory?: string;
}

// ExtraResource type for additional user resources
export interface ExtraResource {
  requests?: Resource;
  limits?: Resource;
}

// User type representing a user in the system
export interface User {
  _id: string;
  email: string;
  username?: string;
  name?: string;
  role?: string;
  resources?: ExtraResource;
  extraResources?: ExtraResource;
  plan?: string | { _id: string; name: string; isDefault?: boolean };
}

// UserRoleAction type for role actions in the user table
export interface ExtraResourcesEditState {
  [userId: string]: {
    requestsCpu: string;
    requestsMemory: string;
    limitsCpu: string;
    limitsMemory: string;
  };
}

// UserTableProps for UserTable component
export interface UserTableProps {
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

// UserManagementProps for UserManagement component
export interface UserManagementProps {
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
