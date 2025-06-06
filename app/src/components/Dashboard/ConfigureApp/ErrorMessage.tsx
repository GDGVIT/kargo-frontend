import React from "react";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) =>
  error ? (
    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm border border-red-300">
      {error}
    </div>
  ) : null;

export default ErrorMessage;
