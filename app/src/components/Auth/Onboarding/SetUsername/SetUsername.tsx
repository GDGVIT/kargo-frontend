'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../AuthProvider/AuthProvider';
import { motion } from 'framer-motion';
import { baseURL } from '@/utils/api';
import {
  Card,
  Input,
  AnimatedButton,
  useNotification,
  NotificationProvider,
} from '@/components/ui';

const SetUsername: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshUser } = useAuth();
  const { notify } = useNotification();

  // Kubernetes-compatible username regex: lowercase alphanumeric and hyphens only
  // Must start and end with alphanumeric character
  const usernameRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim().toLowerCase();

    if (
      !username ||
      typeof username !== 'string' ||
      trimmedUsername.length === 0 ||
      trimmedUsername.length > 63 ||
      !usernameRegex.test(trimmedUsername)
    ) {
      setError(
        'Invalid username. Only lowercase letters, numbers, and hyphens. Must start and end with a letter or number. Max 63 characters.'
      );
      notify(
        'Invalid username. Only lowercase letters, numbers, and hyphens. Must start and end with a letter or number. Max 63 characters.',
        'warning'
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/api/auth/set-username`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to set username');
        notify(data.message || 'Failed to set username', 'error');
      } else {
        notify('Username set successfully!', 'success');
        await refreshUser();
        router.replace('/settings');
      }
    } catch {
      setError('Something went wrong. Please try again.');
      notify('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotificationProvider>
      <Card className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Choose a Username</h2>
            <p className="text-sm text-zinc-400">
              Set your unique username to continue. It must be Kubernetes-compatible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              type="text"
              placeholder="Enter username (lowercase, letters, numbers, hyphens)"
              value={username}
              onChange={(value) => setUsername(value)}
              error={error}
              helperText="Only lowercase letters, numbers, and hyphens. Must start and end with a letter or number. Max 63 characters."
              disabled={loading}
              required
            />

            <AnimatedButton type="submit" variant="primary" disabled={loading} className="w-full">
              {loading ? 'Setting...' : 'Set Username'}
            </AnimatedButton>
          </form>
        </motion.div>
      </Card>
    </NotificationProvider>
  );
};

export default SetUsername;
