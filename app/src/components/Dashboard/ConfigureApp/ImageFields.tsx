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
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="mb-1 font-medium">Image URL</label>
      <input
        className="w-full p-3 rounded-lg  border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition"
        required
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="registry.io/my-app"
      />
    </div>
    <div>
      <label className="mb-1 font-medium">Image Tag</label>
      <input
        className="w-full p-3 rounded-lg  border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition"
        required
        value={imageTag}
        onChange={(e) => setImageTag(e.target.value)}
        placeholder="latest"
      />
    </div>
  </div>
);

export default ImageFields;
