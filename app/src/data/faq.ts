interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is Kargo and how does it work?',
    answer:
      'Kargo is an AI-augmented deployment platform that simplifies containerized application deployment. It uses AI to automatically generate Dockerfiles from your code, manages Kubernetes deployments, and provides a user-friendly interface for monitoring and scaling your applications.',
  },
  {
    question: 'Do I need Kubernetes knowledge to use Kargo?',
    answer:
      'No! Kargo abstracts away the complexity of Kubernetes. While it uses Kubernetes under the hood for orchestration, you can deploy and manage applications through our intuitive interface without knowing Kubernetes commands or YAML syntax.',
  },
  {
    question: 'Which programming languages are supported?',
    answer:
      'Kargo supports 75+ programming languages including Python, JavaScript, TypeScript, Java, Go, Rust, Ruby, PHP, C++, and many more. Our AI engine analyzes your repository structure and dependencies to generate optimal Docker configurations.',
  },
  {
    question: 'How does the AI-powered Dockerization work?',
    answer:
      'Simply provide your GitHub repository URL. Our AI engine (powered by LangChain and Groq) analyzes your codebase, identifies the programming language, framework, and dependencies, then automatically generates a production-ready Dockerfile and Docker Compose configuration.',
  },
  {
    question: 'Can I use my own Docker images?',
    answer:
      'Absolutely! You can deploy from any Docker registry including Docker Hub, GitHub Container Registry, GitLab Registry, or your private registry. Just add your registry credentials and specify the image URL.',
  },
  {
    question: 'What are resource plans?',
    answer:
      'Resource plans define the CPU, memory, and storage quotas for your applications. Administrators can create custom plans for different user tiers. The base plan includes 15m CPU cores, 32 MiB memory, and 1 GiB storage, with options to upgrade or request additional resources.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes! Kargo implements enterprise-grade security including encrypted credential storage, Kubernetes RBAC, namespace isolation for each application, image pull secrets management, and email verification for accounts. All deployments run in isolated namespaces.',
  },
  {
    question: 'Can I see my application logs?',
    answer:
      'Yes! Kargo provides real-time log streaming directly from your containers. You can view logs from multiple pods, search and filter log entries, and access historical logs for debugging and monitoring.',
  },
  {
    question: 'How do I scale my applications?',
    answer:
      'You can scale applications through the configuration interface by adjusting resource limits, performing rollout restarts, or scaling deployments to zero when not in use. Kargo handles all Kubernetes scaling operations automatically.',
  },
  {
    question: 'What authentication methods are supported?',
    answer:
      'Kargo supports multiple authentication methods: Google OAuth, GitHub OAuth (with GitHub App integration), and traditional email/password with verification. You can link multiple authentication methods to the same account.',
  },
  {
    question: 'Can I deploy multi-container applications?',
    answer:
      'Yes! Kargo supports Docker Compose configurations for multi-service applications. The AI engine can generate Docker Compose files for complex microservices architectures with network configuration and service dependencies.',
  },
  {
    question: 'Is Kargo open source?',
    answer:
      'Kargo is developed by GDG-VIT (Google Developer Groups on Campus) and is designed to be a learning platform for students and developers interested in cloud-native technologies and Kubernetes deployment.',
  },
];

export default faqs;
export type { FAQItem };
