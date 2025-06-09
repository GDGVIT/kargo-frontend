export default interface ImageFieldsProps {
  imageUrl: string;
  imageTag: string;
  setImageUrl: (url: string) => void;
  setImageTag: (tag: string) => void;
}
