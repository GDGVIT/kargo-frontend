import React from "react";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) =>
  error ? <div>{error}</div> : null;

export default ErrorMessage;
