import React from "react";
import Modal from "../../ui/Modal/Modal";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";
import { FaExclamationTriangle, FaKey, FaCog } from "react-icons/fa";

interface ImageTestErrorModalProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  imageTag: string;
  error?: string;
  needsAuth?: boolean;
  authTested?: boolean;
  suggestions?: string[];
  available?: boolean;
  isArchitectureIssue?: boolean;
  onNavigateToCredentials: () => void;
}

const ImageTestErrorModal: React.FC<ImageTestErrorModalProps> = ({
  open,
  onClose,
  imageUrl,
  imageTag,
  error,
  needsAuth,
  authTested,
  suggestions,
  available,
  isArchitectureIssue,
  onNavigateToCredentials,
}) => {
  const fullImageName = `${imageUrl}:${imageTag}`;

  const getTitle = () => {
    if (available) {
      return "Image Available with Warnings";
    }
    if (isArchitectureIssue) {
      return "Architecture Validation Failed";
    }
    return "Image Not Accessible";
  };

  const getIcon = () => {
    if (available) {
      return (
        <FaExclamationTriangle className="text-yellow-400 text-xl mt-1 flex-shrink-0" />
      );
    }
    return (
      <FaExclamationTriangle className="text-red-400 text-xl mt-1 flex-shrink-0" />
    );
  };

  const getMainMessage = () => {
    if (available) {
      return "The image is available but there are some compatibility warnings:";
    }
    if (isArchitectureIssue) {
      return "Architecture validation failed - deployment blocked";
    }
    return "Docker Image Test Failed";
  };

  const getErrorMessage = () => {
    if (isArchitectureIssue) {
      return "The image is accessible but cannot be deployed due to architecture compatibility issues.";
    }
    if (needsAuth && !authTested) {
      return "The image appears to be private and you don't have any registry credentials configured.";
    }
    if (needsAuth && authTested) {
      return "The image is not accessible with your current credentials. The image may not exist or you may need different credentials.";
    }
    return "The image could not be found or accessed.";
  };

  const getActionMessage = () => {
    if (isArchitectureIssue) {
      return "Please check the architecture compatibility details below or ensure cluster access is available.";
    }
    if (needsAuth && !authTested) {
      return "Please configure your registry credentials and try again.";
    }
    if (needsAuth && authTested) {
      return "Please check your credentials or verify the image exists.";
    }
    return "Please verify the image name and tag are correct.";
  };

  return (
    <Modal open={open} onClose={onClose} title={getTitle()}>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              {getMainMessage()}
            </h3>
            <p className="text-gray-300 mb-2">
              <span className="font-mono bg-gray-800 px-2 py-1 rounded text-sm">
                {fullImageName}
              </span>
            </p>
            {!available && (
              <>
                <p className="text-gray-400 mb-3">{getErrorMessage()}</p>
                <p className="text-gray-400 mb-3">{getActionMessage()}</p>
              </>
            )}
            {suggestions && suggestions.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  {available ? "Warnings:" : "Suggestions:"}
                </h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span
                        className={
                          available
                            ? "text-yellow-400 mt-0.5"
                            : "text-yellow-400 mt-0.5"
                        }
                      >
                        •
                      </span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {error && !available && (
              <details className="mb-3">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-400">
                  Technical Details
                </summary>
                <pre className="mt-2 text-xs bg-gray-800 p-3 rounded overflow-x-auto text-red-300">
                  {error}
                </pre>
              </details>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
          <AnimatedButton
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            icon={null}
          >
            {available ? "Continue" : "Cancel"}
          </AnimatedButton>

          {needsAuth && !available && (
            <AnimatedButton
              variant="primary"
              onClick={() => {
                onNavigateToCredentials();
                onClose();
              }}
              className="flex-1"
              icon={<FaKey />}
            >
              {authTested ? "Manage Credentials" : "Add Credentials"}
            </AnimatedButton>
          )}

          {!available && (
            <AnimatedButton
              variant="primary"
              onClick={onClose}
              className="flex-1"
              icon={<FaCog />}
            >
              Update Image Details
            </AnimatedButton>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageTestErrorModal;
