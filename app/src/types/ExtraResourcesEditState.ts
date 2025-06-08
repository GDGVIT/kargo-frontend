// UserRoleAction type for role actions in the user table
export default interface ExtraResourcesEditState {
  [userId: string]: {
    requestsCpu: string;
    requestsMemory: string;
    limitsCpu: string;
    limitsMemory: string;
  };
}
