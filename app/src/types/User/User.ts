import ExtraResource from "../ExtraResources/ExtraResource";
import RegistryCredential from "../RegistryCredential/RegistryCredential";

export default interface User {
  _id: string;
  email: string;
  username?: string;
  name?: string;
  role?: "user" | "admin" | "superadmin";
  resources?: ExtraResource;
  extraResources?: ExtraResource;
  plan?: string | { _id: string; name: string; isDefault?: boolean };
  credentials?: RegistryCredential[];
}
