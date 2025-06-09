import ExtraResource from "../ExtraResources/ExtraResource";
import RegistryCredential from "../Registry/RegistryCredential/RegistryCredential";
import type Plan from "../Plan/Plan";

export default interface User {
  _id: string;
  name?: string;
  email: string;
  username?: string;
  profilePicture?: string;
  oauth?: {
    googleId?: string;
    githubId?: string;
  };
  githubInstallationId?: string[];
  resources?: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
  role?: "user" | "admin" | "superadmin";
  extraResources?: ExtraResource;
  plan?: string | Plan;
  credentials?: RegistryCredential[];
}
