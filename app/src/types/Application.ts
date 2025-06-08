// Application type representing an application in the system
export interface Application {
  _id: string;
  name: string;
  imageUrl: string;
  imageTag: string;
  namespace?: string;
  deploymentName?: string;
  serviceName?: string;
  env?: Record<string, string>;
  owner?: string;
  resources?: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
  ports?: Array<{
    name?: string;
    containerPort: number;
    protocol?: string;
    subdomain?: string;
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
  livenessProbe?: Probe;
  readinessProbe?: Probe;
  command?: string[];
  args?: string[];
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  nodeSelector?: Record<string, string>;
  tolerations?: Toleration[];
  affinity?: Affinity;
  credentials?: Array<{
    name: string;
    registryType: string;
    username: string;
    token: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Probe {
  [key: string]: unknown;
}
export interface Toleration {
  [key: string]: unknown;
}
export interface Affinity {
  [key: string]: unknown;
}
