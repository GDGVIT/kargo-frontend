import React from "react";

interface ImageFieldsProps {
  imageUrl: string;
  imageTag: string;
  setImageUrl: (url: string) => void;
  setImageTag: (tag: string) => void;
}

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
      <input
        required
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="registry.io/my-app"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Image Tag
      </label>
      <input
        required
        value={imageTag}
        onChange={(e) => setImageTag(e.target.value)}
        placeholder="latest"
      />
    </div>
  </div>
);

export default ImageFields;
