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
  resources?: {
    requests?: {
      cpu?: string;
      memory?: string;
    };
    limits?: {
      cpu?: string;
      memory?: string;
    };
  };
  ports?: Array<{
    name?: string;
    containerPort: number;
    protocol?: string;
  }>;
  volumes?: Array<{
    name: string;
    mountPath: string;
    type?: string;
    configMapName?: string;
    secretName?: string;
    claimName?: string;
    size?: string;
    readOnly?: boolean;
    secretItems?: Array<{ key: string; path: string }>;
  }>;
  ingress?: {
    enabled: boolean;
    host?: string;
    paths?: Array<{
      path: string;
      pathType?: string;
      servicePort?: number;
    }>;
    annotations?: Record<string, string>;
    tls?: Array<{
      hosts: string[];
      secretName: string;
    }>;
  };
  livenessProbe?: object;
  readinessProbe?: object;
  command?: string[];
  args?: string[];
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  nodeSelector?: Record<string, string>;
  tolerations?: object[];
  affinity?: object;
  createdAt: string;
  updatedAt: string;
}
