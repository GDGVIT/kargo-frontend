import React from "react";
import type ImageFieldsProps from "../../../../types/Application/ImageFieldProps/ImageFieldProps";
import Input from "../../../ui/Input/Input";
import Select from "../../../ui/Select/Select";

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
    <h3 className="text-gray-400 mb-2" style={{ margin: 0 }}>
      Image Configuration
    </h3>
    <div>
      <Input
        required
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="registry.io/my-app"
        label="Image URL"
      />
    </div>
    <div>
      <Input
        required
        value={imageTag}
        onChange={(e) => setImageTag(e.target.value)}
        placeholder="latest"
        label="Image Tag"
      />
    </div>
    <div style={{ position: "relative", minHeight: 80, paddingBottom: 70 }}>
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
