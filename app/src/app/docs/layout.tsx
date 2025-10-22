'use client';

import Link from 'next/link';
import docsNavigation from '@/data/docs-navigation';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Main content */}
      <div className="mr-64 overflow-y-auto min-h-screen">
        <div className="p-8 my-2 docs-theme">
          <div className="max-w-5xl mx-auto">{children}</div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className="w-64 fixed right-0 top-16 h-[calc(100vh-64px)] overflow-y-auto px-6 py-10"
        style={{
          backgroundColor: 'var(--card-background)',
          borderLeft: '1px solid #3a4152',
        }}
      >
        <nav className="space-y-8">
          {docsNavigation.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="sidebar-link transition-colors"
                      style={{
                        color: '#a0aec0',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text-link-hover-color)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#a0aec0';
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
}
