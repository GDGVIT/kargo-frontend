interface Slide {
  title?: string;
  description?: string;
  image: string;
  imageAlt: string;
  highlights?: string[];
}

interface Feature {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  highlights?: string[];
  ctaText?: string;
  ctaLink?: string;
  slides?: Slide[];
}

const features: Feature[] = [
  {
    title: 'AI-Powered Dockerization',
    description:
      'Transform any GitHub repository into a containerized application with our intelligent AI engine. Automatically generate Dockerfiles and Docker Compose configurations tailored to your project structure.',
    slides: [
      {
        title: 'Dockerfile Generation',
        description:
          'Automatically generate optimized Dockerfiles from your source code with language- and framework-aware heuristics.',
        image: '/landing/dockerize-generated_dockerfile.avif',
        imageAlt: 'AI-generated Dockerfile interface',
        highlights: [
          'Language and framework detection',
          'Optimized multi-stage builds',
          'Dependency caching strategies',
        ],
      },
      {
        title: 'Docker Compose Generation',
        description:
          'Create production-ready Compose files for multi-service apps including networks, volumes, and dependencies.',
        image: '/landing/dockerize-generate_docker_compose.avif',
        imageAlt: 'Docker Compose generation interface',
        highlights: ['Service orchestration', 'Volume management', 'Network configuration'],
      },
      {
        title: 'Browse Repositories',
        description:
          'Select repositories via our GitHub integration and kick off dockerization directly from the UI.',
        image: '/landing/dockerize-list_of_available.avif',
        imageAlt: 'GitHub repository browser',
        highlights: ['GitHub App integration', 'Branch and tag selection', 'Access controls'],
      },
    ],
    ctaText: 'Try Dockerization',
    ctaLink: '/applications/add',
    highlights: [
      'Supports 75+ programming languages and frameworks',
      'Intelligent dependency detection and optimization',
      'One-click deployment from GitHub repositories',
    ],
  },
  {
    title: 'Comprehensive Application Management',
    description:
      'Manage all your containerized applications from a unified dashboard. Monitor status, track resources, and control deployments with intuitive controls.',
    image: '/landing/applications.avif',
    imageAlt: 'Applications management dashboard',
    highlights: [
      'Real-time application status monitoring',
      'Quick deployment controls (start, stop, restart)',
      'Resource usage tracking at a glance',
      'Bulk operations support',
    ],
    ctaText: 'View Applications',
    ctaLink: '/applications',
  },
  {
    title: 'Advanced Configuration',
    description:
      'Fine-tune every aspect of your deployments with our comprehensive configuration interface. Set resource limits, configure environment variables, manage ports, and define storage volumes.',
    slides: [
      {
        title: 'Overview',
        description: 'A unified view of all key deployment settings for clarity and speed.',
        image: '/landing/configuration-overview.avif',
        imageAlt: 'Application configuration overview',
      },
      {
        title: 'Resources',
        description:
          'Define CPU, memory, and storage requests/limits with Kubernetes-native primitives.',
        image: '/landing/configuration-setup-resources.avif',
        imageAlt: 'Resource configuration interface',
        highlights: ['CPU & memory limits', 'Storage provisioning', 'Request optimization'],
      },
      {
        title: 'Env & Ports',
        description:
          'Manage environment variables securely and configure service ports and protocols.',
        image: '/landing/configuration-setup-env&port.avif',
        imageAlt: 'Environment and port configuration',
        highlights: ['Secure env management', 'Protocol & port mapping', 'Subdomains and routing'],
      },
    ],
  },
  {
    title: 'Registry Credentials Management',
    description:
      'Securely store and manage credentials for multiple container registries. Support for Docker Hub, GitHub Container Registry, GitLab, and custom registries.',
    image: '/landing/credentials.avif',
    imageAlt: 'Registry credentials management',
    highlights: [
      'Multi-registry support (Docker Hub, GitHub, GitLab)',
      'Encrypted credential storage',
      'Easy credential rotation',
      'Private registry integration',
    ],
    ctaText: 'Manage Credentials',
    ctaLink: '/credentials',
  },
  {
    title: 'Real-Time Logs',
    description:
      'Stream application logs in real-time directly from your Kubernetes pods. Debug issues, monitor activity, and gain insights into application behavior.',
    image: '/landing/logs.avif',
    imageAlt: 'Real-time log streaming interface',
    highlights: [
      'Live log streaming from containers',
      'Multi-pod log aggregation',
      'Search and filter capabilities',
      'Log history and persistence',
    ],
    ctaText: 'View Logs',
    ctaLink: '/logs',
  },
  {
    title: 'User Preferences',
    description:
      'Customize your Kargo experience with personalized settings. Manage your profile, authentication methods, and platform preferences.',
    image: '/landing/settings.avif',
    imageAlt: 'User settings interface',
    highlights: [
      'Profile management and customization',
      'OAuth provider connections',
      'GitHub App integration',
    ],
    ctaText: 'Configure Settings',
    ctaLink: '/settings',
  },
  {
    title: 'Admin Controls',
    description:
      'Comprehensive administrative tools for platform management. Monitor system health, manage users, and configure plans.',
    slides: [
      {
        title: 'Dashboard',
        description: 'System-wide metrics, audits, and platform health checks at a glance.',
        image: '/landing/admin.avif',
        imageAlt: 'Admin dashboard overview',
      },
      {
        title: 'Users',
        description: 'RBAC, user management, and activity tracking for full governance.',
        image: '/landing/admin-users.avif',
        imageAlt: 'User management interface',
        highlights: ['RBAC', 'Quota assignment', 'Audit trails'],
      },
      {
        title: 'Plans',
        description: 'Define and manage CPU, memory, and storage quotas across tiers.',
        image: '/landing/admin-plans.avif',
        imageAlt: 'Resource plans management',
        highlights: ['Custom tiers', 'Quota controls', 'Activation & assignment'],
      },
    ],
  },
  // Dockerization slides above include repo browsing and compose support
];

export default features;
export type { Feature, Slide };
