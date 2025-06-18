export default interface PlanForm {
  name: string;
  description: string;
  requestsCpu: string;
  requestsMemory: string;
  limitsCpu: string;
  limitsMemory: string;
  isDefault: boolean;
  isActive: boolean;
  /** Price in paise (integer) */
  price: string;
}
