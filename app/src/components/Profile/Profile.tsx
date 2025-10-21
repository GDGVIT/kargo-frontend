import React from 'react';
import { FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { AnimatedButton } from '@/components/ui';

interface ProfileProps {
  user: {
    name?: string;
    email?: string;
    username?: string;
    profilePicture?: string;
  };
  imageError: boolean;
  setImageError: (val: boolean) => void;
  handleLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, imageError, setImageError, handleLogout }) => {
  return (
    <>
      <div className="relative">
        <div>
          {user.profilePicture && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full"
              onError={() => setImageError(true)}
            />
          ) : (
            <FaUser className="w-24 h-24 text-zinc-300 bg-zinc-800 rounded-full p-4 border-4 border-sky-700/40 shadow transition-colors duration-300" />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center md:items-start gap-1 w-full">
        <div className="flex flex-wrap items-center gap-3 text-xl font-bold text-white select-text w-full">
          <FaUser className="text-sky-400 flex-shrink-0" />
          <span className="break-words flex-1 min-w-0" style={{ wordBreak: 'break-word' }}>
            {user.name}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-zinc-300 text-base select-text w-full">
          <FaEnvelope className="text-sky-400 flex-shrink-0" />
          <span className="break-words flex-1 min-w-0" style={{ wordBreak: 'break-word' }}>
            {user.email}
          </span>
        </div>
        {user.username && (
          <div className="flex flex-wrap items-center gap-2 text-zinc-400 text-base select-text w-full">
            <FaUser className="text-sky-400 flex-shrink-0" />@{user.username}
          </div>
        )}
      </div>
      <AnimatedButton
        onClick={handleLogout}
        icon={<FaSignOutAlt className="text-lg" />}
        className="mt-2 w-full md:w-auto justify-center"
        variant="danger"
      >
        Logout
      </AnimatedButton>
    </>
  );
};

export default Profile;
