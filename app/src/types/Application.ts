export interface Application {
  _id: string;
  name: string;
  imageUrl: string;
  imageTag: string;
  registryToken: string;
  namespace?: string;
  deploymentName?: string;
  serviceName?: string;
  ingressHost?: string;
  env?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}
