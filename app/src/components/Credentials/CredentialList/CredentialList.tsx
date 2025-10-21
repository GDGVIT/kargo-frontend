import { useState } from 'react';
import { FaDocker, FaGithub, FaGitlab, FaKey, FaTrash } from 'react-icons/fa';
import { Modal, AnimatedButton, Card } from '@/components/ui';
import type RegistryCredential from '@/types/Registry/RegistryCredential/RegistryCredential';

export default function CredentialList({
  credentials,
  loading,
  onDelete,
  confirmDelete,
  setConfirmDelete,
}: {
  credentials: RegistryCredential[];
  loading: boolean;
  onDelete: (cred: RegistryCredential) => void;
  confirmDelete: RegistryCredential | null;
  setConfirmDelete: (cred: RegistryCredential | null) => void;
}) {
  const [infoModal, setInfoModal] = useState<RegistryCredential | null>(null);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-200 mb-2">Saved Credentials</h3>
      {credentials.length === 0 ? (
        <div className="text-gray-400">No credentials saved yet.</div>
      ) : (
        <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {credentials.map((cred) => {
            let Icon = FaKey;
            if (cred.registryType === 'dockerhub') Icon = FaDocker;
            else if (cred.registryType === 'github') Icon = FaGithub;
            else if (cred.registryType === 'gitlab') Icon = FaGitlab;
            return (
              <li key={cred.name + cred.registryType} className="flex">
                <Card
                  className="flex flex-1 items-center justify-between p-3 group cursor-pointer hover:ring-2 hover:ring-blue-400 min-w-0"
                  onClick={() => setInfoModal(cred)}
                >
                  <div className="flex flex-wrap items-center gap-2 min-w-0">
                    <Icon className="text-lg text-blue-400 shrink-0" />
                    <span className="font-medium text-gray-100 truncate max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem]">
                      {cred.name}
                    </span>
                    <span className="ml-2 text-xs text-gray-400 truncate max-w-[6rem] sm:max-w-[8rem] md:max-w-[10rem]">
                      {cred.username}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <AnimatedButton
                      className="!px-2 !py-1 !rounded text-xs !bg-red-700 hover:!bg-red-800 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete(cred);
                      }}
                      icon={<FaTrash />}
                      variant="danger"
                      type="button"
                    ></AnimatedButton>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <Modal open={!!infoModal} onClose={() => setInfoModal(null)} title="Credential Info">
        {infoModal && (
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Name:</span> {infoModal.name}
            </div>
            <div>
              <span className="font-semibold">Registry:</span> {infoModal.registryType}
            </div>
            <div>
              <span className="font-semibold">Username:</span> {infoModal.username}
            </div>
            <div>
              <span className="font-semibold">Token:</span>{' '}
              <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-xs">
                {infoModal.token}
              </span>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete Credential?"
      >
        <div className="mb-4">
          Are you sure you want to delete the credential{' '}
          <span className="font-semibold text-red-400">{confirmDelete?.name}</span>?
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
            icon={<FaTrash />}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </AnimatedButton>
        </div>
      </Modal>
    </div>
  );
}
