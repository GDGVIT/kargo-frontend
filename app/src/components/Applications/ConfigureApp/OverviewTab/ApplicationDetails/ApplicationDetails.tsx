import React from "react";
import type Application from "../../../../../types/Application/Application";

const ApplicationDetails: React.FC<{ form: Application | null }> = ({
  form,
}) => {
  if (!form) return null;
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-bold mb-2 text-gray-100">
        Application Details
      </h3>
      <div className="text-gray-300">
        <div>
          <b>Name:</b> {form.name}
        </div>
        <div>
          <b>Image:</b> {form.imageUrl}:{form.imageTag}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
