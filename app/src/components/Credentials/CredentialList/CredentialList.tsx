import Card from "../../ui/Card/Card";
import { FaDocker, FaGithub, FaGitlab, FaKey } from "react-icons/fa";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";
import Modal from "../../ui/Modal/Modal";
import type RegistryCredential from "../../../types/Registry/RegistryCredential/RegistryCredential";

export default function CredentialList({
  credentials,
  loading,
  onDelete,
  onSelect,
  confirmDelete,
  setConfirmDelete,
}: {
  credentials: RegistryCredential[];
  loading: boolean;
  onDelete: (cred: RegistryCredential) => void;
  onSelect?: (cred: RegistryCredential) => void;
  confirmDelete: RegistryCredential | null;
  setConfirmDelete: (cred: RegistryCredential | null) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-200 mb-2">
        Saved Credentials
      </h3>
      {credentials.length === 0 ? (
        <div className="text-gray-400">No credentials saved yet.</div>
      ) : (
        <ul className="space-y-2">
          {credentials.map((cred) => {
            let Icon = FaKey;
            if (cred.registryType === "dockerhub") Icon = FaDocker;
            else if (cred.registryType === "github") Icon = FaGithub;
            else if (cred.registryType === "gitlab") Icon = FaGitlab;
            return (
              <li key={cred.name + cred.registryType}>
                <Card className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <Icon className="text-lg text-blue-400" />
                    <span className="font-medium text-gray-100">
                      {cred.name}
                    </span>
                    <span className="ml-2 text-xs text-gray-400">
                      {cred.username}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {onSelect && (
                      <AnimatedButton
                        className="!px-2 !py-1 !rounded text-xs !bg-green-700 hover:!bg-green-800"
                        onClick={() => onSelect(cred)}
                        icon={null}
                      >
                        Select
                      </AnimatedButton>
                    )}
                    <AnimatedButton
                      className="!px-2 !py-1 !rounded text-xs !bg-red-700 hover:!bg-red-800"
                      onClick={() => setConfirmDelete(cred)}
                      icon={null}
                    >
                      Delete
                    </AnimatedButton>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
      {/* Confirmation Modal for Delete */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete Credential?"
      >
        <div className="mb-4">
          Are you sure you want to delete the credential{" "}
          <span className="font-semibold text-red-400">
            {confirmDelete?.name}
          </span>
          ?
        </div>
        <div className="flex gap-3 justify-end">
          <AnimatedButton
            className="!px-4 !py-2 !rounded text-base"
            variant="secondary"
            onClick={() => setConfirmDelete(null)}
            disabled={loading}
            icon={null}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            className="!px-4 !py-2 !rounded text-base"
            variant="danger"
            onClick={() => confirmDelete && onDelete(confirmDelete)}
            disabled={loading}
            icon={null}
          >
            {loading ? "Deleting..." : "Delete"}
          </AnimatedButton>
        </div>
      </Modal>
    </div>
  );
}
