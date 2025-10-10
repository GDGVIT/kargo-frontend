import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="hidden md:flex bottom-0 left-0 w-full h-16 border-t-2 border-[#2c313f] bg-[var(--background)]/70 backdrop-blur-sm px-6 py-4 flex-col md:flex-row items-center justify-between text-[#9DA3B3] text-sm font-normal select-none z-50">
      <span className="mb-2 md:mb-0">© 2025 Kargo. All rights reserved.</span>
      <div className="flex space-x-4">
        <a
          href="https://github.com/GDGVIT/kargo-frontend"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'lightgray' }}
        >
          GitHub
        </a>
        <Link href="/docs" style={{ color: 'lightgray' }}>
          Docs
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
