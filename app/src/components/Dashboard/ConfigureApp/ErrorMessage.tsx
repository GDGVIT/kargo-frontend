import React from "react";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) =>
  error ? (
    <div className="mt-4 text-red-400 text-center animate-shake">{error}</div>
  ) : null;

export default ErrorMessage;
