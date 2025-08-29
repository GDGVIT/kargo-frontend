export default interface Port {
  name?: string; // optional, backend will generate if not present
  containerPort: number;
  protocol: string; // "TCP" | "UDP" or any string
  subdomain?: string;
}
