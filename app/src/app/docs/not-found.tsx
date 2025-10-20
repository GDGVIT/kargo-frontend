'use client';

import Link from 'next/link';
import { AnimatedButton } from '@/components/ui';

export default function DocsNotFound() {
  return (
    <div className="max-w-4xl">
      <div className="text-center py-16">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-400 dark:text-gray-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Documentation Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            The documentation page you&apos;re looking for doesn&apos;t exist or may have been
            moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <AnimatedButton
            onClick={() => (window.location.href = '/docs')}
            variant="primary"
            className="text-base font-medium px-6 py-3"
          >
            Back to Documentation
          </AnimatedButton>
          <AnimatedButton
            onClick={() => (window.location.href = '/')}
            variant="secondary"
            className="text-base font-medium px-6 py-3"
          >
            Go to Homepage
          </AnimatedButton>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Popular Documentation Sections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Link
                href="/docs/quick-start"
                className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Quick Start Guide
              </Link>
              <Link
                href="/docs/installation"
                className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Installation
              </Link>
              <Link
                href="/docs/applications/creating"
                className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Creating Applications
              </Link>
            </div>
            <div className="space-y-2">
              <Link
                href="/docs/features/ai-setup"
                className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                AI-Powered Setup
              </Link>
              <Link
                href="/docs/features/github"
                className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                GitHub Integration
              </Link>
              <Link
                href="/docs/api/authentication"
                className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                API Reference
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
