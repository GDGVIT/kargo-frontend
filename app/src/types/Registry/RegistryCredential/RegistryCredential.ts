import RegistryType from '../RegistryType/RegistryType';

export default interface RegistryCredential {
  name: string;
  registryType: RegistryType;
  username: string;
  token: string;
}
