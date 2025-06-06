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
  <div>
    <div>
      <label>Image URL</label>
      <input
        required
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="registry.io/my-app"
      />
    </div>
    <div>
      <label>Image Tag</label>
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
