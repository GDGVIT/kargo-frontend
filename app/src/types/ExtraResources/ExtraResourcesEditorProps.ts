export default interface ExtraResourcesEditorProps {
  userId: string;
  data: {
    requestsCpu: string;
    requestsMemory: string;
    requestsStorage: string;
    limitsCpu: string;
    limitsMemory: string;
    limitsStorage: string;
  };
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}
