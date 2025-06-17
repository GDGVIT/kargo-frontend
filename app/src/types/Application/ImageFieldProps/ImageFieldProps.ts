import RegistryCredential from "@/types/Registry/RegistryCredential/RegistryCredential";

export default interface ImageFieldsProps {
  imageUrl: string;
  imageTag: string;
  setImageUrl: (url: string) => void;
  setImageTag: (tag: string) => void;
  credentials: RegistryCredential[];
  selectedCredential: string;
  setSelectedCredential: (name: string) => void;
}
