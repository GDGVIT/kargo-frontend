export default interface Port {
  id: string;
  containerPort: number;
  hostPort: number;
  protocol: "TCP" | "UDP";
  description?: string;
  subdomain?: string;
}
