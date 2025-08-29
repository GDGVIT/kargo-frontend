import { generatePageMetadata } from "../../lib/metadata";

const title = "Documentation - Introduction";
const description =
  "Learn how to use Kargo to deploy containerized applications with AI-powered setup and Kubernetes-native scaling.";

export const metadata = generatePageMetadata({
  title,
  description,
  path: "/docs",
  imageAlt: "Kargo Documentation",
});

export default function DocsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Kargo Documentation</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Welcome to Kargo, a comprehensive, AI-augmented deployment platform
          that empowers developers to deploy Docker-based applications with
          maximum flexibility and ease.
        </p>

        <h2>What is Kargo?</h2>
        <p>
          Kargo is a modern deployment platform that combines the power of
          Kubernetes with AI-assisted configuration to make container deployment
          accessible to developers of all skill levels. Whether you&apos;re
          deploying a simple web application or a complex microservices
          architecture, Kargo provides the tools you need.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>AI-Powered Setup</strong> - Automatically generate optimal
            configurations for your applications
          </li>
          <li>
            <strong>GitHub Integration</strong> - Deploy directly from your
            GitHub repositories
          </li>
          <li>
            <strong>Kubernetes Native</strong> - Built on Kubernetes for
            scalability and reliability
          </li>
          <li>
            <strong>Docker Support</strong> - Full support for Docker containers
            and images
          </li>
          <li>
            <strong>Resource Management</strong> - Fine-grained control over
            CPU, memory, and storage
          </li>
          <li>
            <strong>Real-time Monitoring</strong> - Live logs and application
            metrics
          </li>
        </ul>

        <h2>Getting Started</h2>
        <p>
          Ready to deploy your first application? Check out our{" "}
          <a
            href="/docs/quick-start"
            className="text-blue-600 hover:text-blue-700"
          >
            Quick Start Guide
          </a>{" "}
          to get up and running in minutes.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Need Help?
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            If you have questions or need assistance, feel free to reach out to
            our support team or check out our community resources.
          </p>
        </div>
      </div>
    </div>
  );
}
