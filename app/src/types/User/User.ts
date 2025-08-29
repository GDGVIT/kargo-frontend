import ExtraResource from "../ExtraResources/ExtraResource";
import RegistryCredential from "../Registry/RegistryCredential/RegistryCredential";
import type Plan from "../Plan/Plan";
import Resource from "../Application/Resource/Resource";

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
    requests?: Resource;
    limits?: Resource;
  };
  role?: "user" | "admin" | "superadmin";
  extraResources?: ExtraResource;
  plan?: string | Plan;
  credentials?: RegistryCredential[];
}
