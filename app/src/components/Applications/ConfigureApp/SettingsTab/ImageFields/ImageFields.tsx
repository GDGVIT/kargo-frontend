import React from "react";
import type ImageFieldsProps from "../../../../../types/Application/ImageFieldProps/ImageFieldProps";
import Input from "../../../../ui/Input/Input";
import Select from "../../../../ui/Select/Select";

const ImageFields: React.FC<ImageFieldsProps> = ({
  imageUrl,
  imageTag,
  setImageUrl,
  setImageTag,
  credentials,
  selectedCredential,
  setSelectedCredential,
}) => (
  <div className="grid grid-cols-1 gap-4 mb-6">
    <div>
      <Input
        required
        value={imageUrl}
        onChange={setImageUrl}
        placeholder="registry.io/my-app"
        label="Image URL"
      />
    </div>
    <div>
      <Input
        required
        value={imageTag}
        onChange={setImageTag}
        placeholder="latest"
        label="Image Tag"
      />
    </div>
    <div style={{ position: "relative" }}>
      <Select
        label="Image Pull Credential"
        value={selectedCredential}
        onChange={setSelectedCredential}
        options={[
          { value: "", label: "No Credential" },
          ...credentials.map((cred) => ({
            value: cred.name,
            label: `${cred.name} (${cred.registryType})`,
          })),
        ]}
        placeholder="Select a credential"
      />
    </div>
  </div>
);

export default ImageFields;
