import React from "react";
import type ImageFieldsProps from "../../../types/Application/ImageFieldProps/ImageFieldProps";
import { Input } from "../../ui/Input/Input";

const ImageFields: React.FC<ImageFieldsProps> = ({
  imageUrl,
  imageTag,
  setImageUrl,
  setImageTag,
}) => (
  <div className="grid grid-cols-1 gap-4 mb-6">
    <h3 className="text-gray-400 mb-2">Image Configuration</h3>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Image URL
      </label>
      <Input
        required
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="registry.io/my-app"
        label="Image URL"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Image Tag
      </label>
      <Input
        required
        value={imageTag}
        onChange={(e) => setImageTag(e.target.value)}
        placeholder="latest"
        label="Image Tag"
      />
    </div>
  </div>
);

export default ImageFields;
