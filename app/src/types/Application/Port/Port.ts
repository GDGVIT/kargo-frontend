export default interface Port {
  id: string;
  containerPort: number;
  protocol: "TCP" | "UDP";
  description?: string;
  subdomain?: string;
}
