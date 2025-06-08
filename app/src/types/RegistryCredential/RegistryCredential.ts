export default interface RegistryCredential {
  name: string;
  registryType: "dockerhub" | "github" | "gitlab" | "other";
  username: string;
  token: string;
}
