export default interface Plan {
  _id: string;
  name: string;
  description?: string;
  resources: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
  isDefault?: boolean;
  price?: number;
  isActive?: boolean;
}
