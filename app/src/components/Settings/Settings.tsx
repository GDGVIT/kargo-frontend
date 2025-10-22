'use client';

import React, { useState } from 'react';
import { useNotification, Loader, Card } from '@/components/ui';
import { useAuth } from '../Auth/AuthProvider/AuthProvider';
import GithubAuth from '../Github/GithubAuth/GithubAuth';
import PlanDetails from '../PlanDetails/PlanDetails';
import UserStats from '../UserStats/UserStats';
import Profile from '../Profile/Profile';

const Settings: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { notify } = useNotification();
  const [imageError, setImageError] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      notify('Logged out successfully!', 'success');
    } catch {
      notify('Logout failed. Please try again.', 'error');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <Card className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center py-8 text-gray-400 text-lg font-semibold">
          You are not logged in.
        </div>
      </Card>
    );
  }

  return (
    <div className="px-2 sm:px-6 flex flex-col md:flex-row md:items-start md:gap-2 items-stretch gap-4">
      <Card className="flex flex-col justify-between md:items-start gap-4 w-full md:w-1/3 min-w-[220px] max-w-full md:max-w-xs p-6" style={{ height: "-webkit-fill-available" }}>
        <Profile
          user={user}
          imageError={imageError}
          setImageError={setImageError}
          handleLogout={handleLogout}
        />
        <UserStats user={user} />
      </Card>
      <div className="flex flex-col w-full md:w-2/3 justify-start">
        {user.plan && (
          <Card className="mb-0">
            <PlanDetails
              planId={typeof user.plan === 'string' ? user.plan : user.plan?._id}
              planObj={typeof user.plan === 'object' ? user.plan : undefined}
            />
          </Card>
        )}

        <Card className="p-4">
          <GithubAuth user={user} />
        </Card>
      </div>
    </div>
  );
};

export default Settings;
