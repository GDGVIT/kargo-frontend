export default interface ExtraResourcesEditState {
  [userId: string]: {
    requestsCpu: string;
    requestsMemory: string;
    requestsStorage: string;
    limitsCpu: string;
    limitsMemory: string;
    limitsStorage: string;
  };
}
