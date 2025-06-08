// Plan form state shape for admin plan creation/editing
export default interface PlanForm {
  name: string;
  description: string;
  requestsCpu: string;
  requestsMemory: string;
  limitsCpu: string;
  limitsMemory: string;
  isDefault: boolean;
  isActive: boolean;
}
