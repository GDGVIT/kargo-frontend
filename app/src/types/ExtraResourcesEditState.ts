export default interface ExtraResourcesEditState {
  [userId: string]: {
    requestsCpu: string;
    requestsMemory: string;
    limitsCpu: string;
    limitsMemory: string;
  };
}
