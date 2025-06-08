// RegistryCredential type for user registry credentials
export default interface RegistryCredential {
  name: string;
  registryType: "dockerhub" | "github" | "gitlab" | "other";
  username: string;
  token: string;
}
