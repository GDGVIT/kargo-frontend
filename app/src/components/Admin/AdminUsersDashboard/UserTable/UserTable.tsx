import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { Modal, Select, AnimatedButton, Card } from '@/components/ui';
import { formatCpuMilli, formatMemory, formatStorage } from '@/utils/resources';
import type UserTableProps from '@/types/User/UserTableProps';
import type User from '@/types/User/User';
import ExtraResourcesEditor from '../ExtraResourcesEditor/ExtraResourcesEditor';

const UserTable: React.FC<UserTableProps> = ({
  users,
  plans,
  planAssigning,
  extraResourcesEdit,
  extraResourcesSaving,
  onPlanAssign,
  onOpenExtraResourcesEdit,
  onExtraResourcesChange,
  onExtraResourcesSave,
  onExtraResourcesCancel,
  getRoleActions,
  currentUserId,
  allowedResources,
}) => {
  const [modalUserId, setModalUserId] = useState<string | null>(null);
  const handleOpenModal = (user: User) => {
    onOpenExtraResourcesEdit(user);
    setModalUserId(user._id);
  };
  const handleCloseModal = () => {
    setModalUserId(null);
  };
  return (
    <>
      <Card>
        <table className="w-full border text-sm">
          <thead>
            <tr className="text-zinc-200">
              <th className="p-2">Email</th>
              <th className="p-2">Username</th>
              <th className="p-2">Role</th>
              <th className="p-2">Plan</th>
              <th className="p-2">Resources</th>
              <th className="p-2">Extra Resources</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-zinc-700">
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.username || '-'}</td>
                <td className="p-2">
                  {user.role || ''}
                  <div className="mt-1 flex flex-wrap gap-1">
                    {getRoleActions(user) &&
                      React.Children.map(getRoleActions(user), (action, idx) => {
                        if (!action) return null;
                        if (!React.isValidElement(action)) return action;

                        const typeName =
                          typeof action.type === 'function' ? action.type.name : null;
                        if (typeName === 'AnimatedButton') {
                          return action;
                        }

                        if (typeof action.type === 'string' && action.type === 'button') {
                          const { className, onClick, disabled, children } =
                            action.props as React.ButtonHTMLAttributes<HTMLButtonElement>;
                          const disabledClass = disabled
                            ? 'opacity-60 cursor-not-allowed pointer-events-none'
                            : '';
                          return (
                            <AnimatedButton
                              key={idx}
                              className={
                                (className?.replace('px-2 py-1', '!px-2 !py-1') ||
                                  '!px-2 !py-1 !text-xs !rounded') +
                                ' ' +
                                disabledClass
                              }
                              onClick={onClick}
                              icon={null}
                            >
                              {children}
                            </AnimatedButton>
                          );
                        }
                        return action;
                      })}
                  </div>
                </td>
                <td className="p-2">
                  <Select
                    options={plans.map((plan) => ({
                      value: plan._id,
                      label: plan.name + (plan.isDefault ? ' (BASE)' : ''),
                    }))}
                    value={typeof user.plan === 'string' ? user.plan : user.plan?._id || ''}
                    onChange={(value) => onPlanAssign(user._id, value)}
                    aria-label="Select plan for user"
                    className={`min-w-[120px]${
                      planAssigning === user._id ||
                      (currentUserId === user._id && user.role !== 'superadmin')
                        ? ' pointer-events-none opacity-60'
                        : ''
                    }`}
                  />
                </td>
                <td className="p-2">
                  {allowedResources[user._id] ? (
                    <div className="text-xs">
                      <div>
                        <span className="font-semibold">Req:</span> CPU:{' '}
                        {formatCpuMilli(allowedResources[user._id].requests?.cpu)}, Mem:{' '}
                        {formatMemory(allowedResources[user._id].requests?.memory)}, Storage:{' '}
                        {formatStorage(allowedResources[user._id].requests?.storage)}
                      </div>
                      <div>
                        <span className="font-semibold">Lim:</span> CPU:{' '}
                        {formatCpuMilli(allowedResources[user._id].limits?.cpu)}, Mem:{' '}
                        {formatMemory(allowedResources[user._id].limits?.memory)}, Storage:{' '}
                        {formatStorage(allowedResources[user._id].limits?.storage)}
                      </div>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="p-2">
                  <div>
                    <div className="text-xs mb-1">
                      <div>
                        <b>Requests:</b> CPU: {formatCpuMilli(user.extraResources?.requests?.cpu)},
                        Mem: {formatMemory(user.extraResources?.requests?.memory)}, Storage:{' '}
                        {formatStorage(user.extraResources?.requests?.storage)}
                      </div>
                      <div>
                        <b>Limits:</b> CPU: {formatCpuMilli(user.extraResources?.limits?.cpu)}, Mem:{' '}
                        {formatMemory(user.extraResources?.limits?.memory)}, Storage:{' '}
                        {formatStorage(user.extraResources?.limits?.storage)}
                      </div>
                    </div>
                    <AnimatedButton
                      className="!px-2 !py-1 !text-xs !rounded !bg-amber-500 hover:!bg-amber-600 mt-1"
                      onClick={() => handleOpenModal(user)}
                      icon={<HiPencil className="w-4 h-4" />}
                    >
                      Edit
                    </AnimatedButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal
        open={!!modalUserId && !!extraResourcesEdit[modalUserId]}
        onClose={handleCloseModal}
        title="Edit Extra Resources"
      >
        {modalUserId && extraResourcesEdit[modalUserId] && (
          <ExtraResourcesEditor
            userId={modalUserId}
            data={extraResourcesEdit[modalUserId]}
            onChange={(field, value) => onExtraResourcesChange(modalUserId, field, value)}
            onSave={() => {
              onExtraResourcesSave(modalUserId);
              handleCloseModal();
            }}
            onCancel={() => {
              onExtraResourcesCancel(modalUserId);
              handleCloseModal();
            }}
            saving={extraResourcesSaving === modalUserId}
          />
        )}
      </Modal>
    </>
  );
};

export default UserTable;
