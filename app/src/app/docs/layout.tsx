"use client";

import Link from "next/link";

const docsNavigation = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs" },
      { name: "Quick Start", href: "/docs/quick-start" },
      { name: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Applications",
    items: [
      { name: "Creating Applications", href: "/docs/applications/creating" },
      { name: "Configuration", href: "/docs/applications/configuration" },
      { name: "Deployment", href: "/docs/applications/deployment" },
      { name: "Environment Variables", href: "/docs/applications/environment" },
    ],
  },
  {
    title: "Platform Features",
    items: [
      { name: "AI-Powered Setup", href: "/docs/features/ai-setup" },
      { name: "GitHub Integration", href: "/docs/features/github" },
      { name: "Kubernetes Management", href: "/docs/features/kubernetes" },
      { name: "Docker Support", href: "/docs/features/docker" },
    ],
  },
  {
    title: "Administration",
    items: [
      { name: "User Management", href: "/docs/admin/users" },
      { name: "Plans & Billing", href: "/docs/admin/plans" },
      { name: "Resource Management", href: "/docs/admin/resources" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { name: "Authentication", href: "/docs/api/authentication" },
      { name: "Applications API", href: "/docs/api/applications" },
      { name: "Users API", href: "/docs/api/users" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Main content */}
      <div className="mr-64 overflow-y-auto min-h-screen">
        <div className="p-8 my-2">{children}</div>
      </div>

      {/* Sidebar */}
      <aside
        className="w-64 fixed right-0 top-0 h-screen overflow-y-auto px-6 py-10"
        style={{
          backgroundColor: "var(--card-background)",
          borderLeft: "1px solid #3a4152",
        }}
      >
        <nav className="space-y-8">
          {docsNavigation.map((section) => (
            <div key={section.title}>
              <h3
                className="font-semibold mb-3"
                style={{ color: "var(--foreground)" }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="sidebar-link transition-colors"
                      style={{
                        color: "#a0aec0",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--theme-blue)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#a0aec0";
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
