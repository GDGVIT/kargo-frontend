'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Modal from '../Modal/Modal';

const Footer: React.FC = () => {
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isDocsPage = pathname?.startsWith('/docs');

  return (
    <>
      <footer
        className={`hidden md:flex bottom-0 left-0 ${isDocsPage ? 'mr-64' : 'w-full'} h-16 border-t-2 border-[#2c313f] bg-[var(--background)]/70 backdrop-blur-sm px-6 py-4 flex-col md:flex-row items-center justify-between text-[#9DA3B3] text-sm font-normal select-none z-50`}
      >
        <span className="mb-2 md:mb-0">© 2025 Kargo. All rights reserved.</span>
        <div className="flex space-x-4 gap-4">
          <button
            onClick={() => setIsGitHubModalOpen(true)}
            className="hover:text-white transition-colors duration-200"
            style={{ color: 'lightgray' }}
          >
            GitHub
          </button>
          <button
            onClick={() => router.push('/docs')}
            className="hover:text-white transition-colors duration-200"
            style={{ color: 'lightgray' }}
          >
            Docs
          </button>
        </div>
      </footer>

      <Modal
        open={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        title="GitHub Repositories"
        className="max-w-md"
      >
        <div className="flex flex-col gap-4">
          <p className="text-[var(--foreground)]/70 text-sm mb-2">
            Choose which repository you&apos;d like to visit:
          </p>

          <a
            href="https://github.com/GDGVIT/kargo-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-lg border border-[var(--foreground)]/10 hover:border-[var(--text-link-color)] hover:bg-[var(--background)]/30 transition-all duration-200 group"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-[var(--foreground)] group-hover:text-[var(--text-link-color)] transition-colors">
                Kargo Frontend
              </span>
              <span className="text-xs text-[var(--foreground)]/50 mt-1">Next.js application</span>
            </div>
            <svg
              className="w-5 h-5 text-[var(--foreground)]/30 group-hover:text-[var(--text-link-color)] transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          <a
            href="https://github.com/GDGVIT/kargo-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-lg border border-[var(--foreground)]/10 hover:border-[var(--text-link-color)] hover:bg-[var(--background)]/30 transition-all duration-200 group"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-[var(--foreground)] group-hover:text-[var(--text-link-color)] transition-colors">
                Kargo Backend
              </span>
              <span className="text-xs text-[var(--foreground)]/50 mt-1">Node.js API server</span>
            </div>
            <svg
              className="w-5 h-5 text-[var(--foreground)]/30 group-hover:text-[var(--text-link-color)] transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </Modal>
    </>
  );
};

export default Footer;
