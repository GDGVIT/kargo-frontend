export default interface AppPort {
  name?: string;
  containerPort: number;
  protocol?: string;
  ingressEnabled?: boolean;
  subdomain?: string;
  ingressHost?: string;
  hostPort?: number;
  description?: string;
}
