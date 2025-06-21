export default interface PlanForm {
  name: string;
  description: string;
  requestsCpu: string;
  requestsMemory: string;
  requestsStorage: string;
  limitsCpu: string;
  limitsMemory: string;
  limitsStorage: string;
  isDefault: boolean;
  isActive: boolean;
  /** Price in paise (integer) */
  price: string;
}
