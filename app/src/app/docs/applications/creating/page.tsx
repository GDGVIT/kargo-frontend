import { generatePageMetadata } from '../../../../lib/metadata';

const title = 'Creating Applications';
const description = 'Learn how to create and configure applications in Kargo.';

export const metadata = generatePageMetadata({
  title,
  description,
  path: '/docs/applications/creating',
  imageAlt: 'Creating Applications in Kargo',
});

export default function CreatingApplicationsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Creating Applications</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Learn how to create and configure applications in Kargo.
        </p>

        <h2>Application Types</h2>
        <p>Kargo supports various types of applications:</p>
        <ul>
          <li>
            <strong>Web Applications</strong> - Frontend and backend services
          </li>
          <li>
            <strong>APIs</strong> - RESTful and GraphQL APIs
          </li>
          <li>
            <strong>Microservices</strong> - Distributed application components
          </li>
          <li>
            <strong>Databases</strong> - Persistent data storage solutions
          </li>
          <li>
            <strong>Workers</strong> - Background job processors
          </li>
        </ul>

        <h2>Creating from GitHub</h2>
        <ol>
          <li>Navigate to the Add Application page</li>
          <li>Click &quot;Connect with GitHub&quot;</li>
          <li>Select your repository from the list</li>
          <li>Choose the branch to deploy from</li>
          <li>Kargo will automatically detect your Dockerfile or suggest build configurations</li>
        </ol>

        <h2>Manual Configuration</h2>
        <p>For applications not hosted on GitHub:</p>
        <ol>
          <li>Provide a Docker image URL</li>
          <li>Specify the container port</li>
          <li>Configure environment variables</li>
          <li>Set resource requirements</li>
        </ol>

        <h2>AI-Powered Setup</h2>
        <p>Kargo&apos;s AI can help optimize your application configuration:</p>
        <ul>
          <li>Automatic resource allocation based on application type</li>
          <li>Environment variable suggestions</li>
          <li>Security best practices recommendations</li>
          <li>Performance optimization hints</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Pro Tip
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            Use the &quot;Dockerize&quot; feature on GitHub repositories to automatically generate
            Docker configurations for your applications.
          </p>
        </div>
      </div>
    </div>
  );
}
