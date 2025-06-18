export default interface Plan {
  _id: string;
  name: string;
  description?: string;
  resources: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
  isDefault?: boolean;
  /** Price in paise (integer) */
  price?: number;
  isActive?: boolean;
}
