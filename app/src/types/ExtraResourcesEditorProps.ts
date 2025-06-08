// Props for the ExtraResourcesEditor component
export default interface ExtraResourcesEditorProps {
  userId: string;
  data: {
    requestsCpu: string;
    requestsMemory: string;
    limitsCpu: string;
    limitsMemory: string;
  };
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}
