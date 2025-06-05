export interface Plan {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  resources?: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
  isDefault?: boolean;
  isActive?: boolean;
}
