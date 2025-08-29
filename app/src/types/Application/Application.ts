import Probe from "./Probe/Probe";
import Toleration from "./Toleration/Toleration";
import Affinity from "./Affinity/Affinity";
import Resource from "./Resource/Resource";
import Port from "./Port/Port";

export default interface Application {
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
    requests?: Resource;
    limits?: Resource;
  };
  ports?: Port[];
  volumes?: Array<{
    name: string;
    mountPath: string;
    type?: string; // e.g., 'pvc', 'configMap', 'secret'
    configMapName?: string;
    secretName?: string;
    claimName?: string; // For PVC
    size?: string; // e.g., '10Gi'
    accessModes?: string[]; // e.g., ['ReadWriteOnce', 'ReadWriteMany']
    storageClassName?: string;
    volumeMode?: string; // e.g., 'Filesystem' or 'Block'
    annotations?: Record<string, string>;
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
