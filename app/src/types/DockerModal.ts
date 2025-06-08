// Types for DockerModal
export interface DockerModalProps {
  open: boolean;
  dockerfile?: string;
  dockerCompose?: string;
  repoName?: string;
  onClose: () => void;
}
