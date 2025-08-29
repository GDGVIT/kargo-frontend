export default interface ActionButtonsProps {
  saving: boolean;
  onSaveAndDeploy: (e: React.FormEvent) => void;
  onRequestDelete: () => void;
}
