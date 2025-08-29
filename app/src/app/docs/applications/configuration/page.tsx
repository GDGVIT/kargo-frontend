import { generatePageMetadata } from "../../../../lib/metadata";

const title = "Application Configuration";
const description =
  "Learn how to configure applications for optimal performance and security in Kargo.";

export const metadata = generatePageMetadata({
  title,
  description,
  path: "/docs/applications/configuration",
  imageAlt: "Application Configuration in Kargo",
});

export default function ApplicationConfigurationPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Application Configuration</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Configure your applications for optimal performance, security, and
          scalability.
        </p>

        <h2>Basic Configuration</h2>
        <p>Every application in Kargo requires these basic settings:</p>
        <ul>
          <li>
            <strong>Application Name</strong> - Unique identifier for your app
          </li>
          <li>
            <strong>Docker Image</strong> - Container image to deploy
          </li>
          <li>
            <strong>Port</strong> - Port your application listens on
          </li>
          <li>
            <strong>Environment</strong> - Development, staging, or production
          </li>
        </ul>

        <h2>Resource Configuration</h2>
        <p>Configure compute resources for your application:</p>

        <h3>CPU Allocation</h3>
        <ul>
          <li>
            <strong>Requests</strong> - Minimum CPU guaranteed
          </li>
          <li>
            <strong>Limits</strong> - Maximum CPU allowed
          </li>
          <li>Measured in millicores (1000m = 1 CPU core)</li>
        </ul>

        <h3>Memory Allocation</h3>
        <ul>
          <li>
            <strong>Requests</strong> - Minimum memory guaranteed
          </li>
          <li>
            <strong>Limits</strong> - Maximum memory allowed
          </li>
          <li>Measured in MB or GB</li>
        </ul>

        <h3>Storage Configuration</h3>
        <ul>
          <li>
            <strong>Persistent Volumes</strong> - For data that needs to survive
            restarts
          </li>
          <li>
            <strong>Temporary Storage</strong> - For cache and temporary files
          </li>
          <li>
            <strong>Volume Mounts</strong> - Where to mount storage in your
            container
          </li>
        </ul>

        <h2>Health Checks</h2>
        <p>Configure health checks to ensure your application runs smoothly:</p>

        <h3>Liveness Probe</h3>
        <ul>
          <li>Determines if your application is running</li>
          <li>Restarts container if probe fails</li>
          <li>Configure HTTP endpoint or command</li>
        </ul>

        <h3>Readiness Probe</h3>
        <ul>
          <li>Determines if your application is ready to serve traffic</li>
          <li>Removes from load balancer if probe fails</li>
          <li>Configure HTTP endpoint or command</li>
        </ul>

        <h2>Scaling Configuration</h2>
        <p>Set up automatic scaling for your application:</p>
        <ul>
          <li>
            <strong>Horizontal Pod Autoscaler (HPA)</strong> - Scale based on
            CPU/memory usage
          </li>
          <li>
            <strong>Manual Scaling</strong> - Set fixed number of replicas
          </li>
          <li>
            <strong>Custom Metrics</strong> - Scale based on
            application-specific metrics
          </li>
        </ul>

        <h2>Security Configuration</h2>
        <p>Secure your application with these settings:</p>
        <ul>
          <li>
            <strong>Security Context</strong> - Run containers as non-root user
          </li>
          <li>
            <strong>Network Policies</strong> - Control traffic between
            applications
          </li>
          <li>
            <strong>Secrets Management</strong> - Store sensitive data securely
          </li>
          <li>
            <strong>Service Accounts</strong> - Control Kubernetes API access
          </li>
        </ul>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
            ⚙️ Configuration Tips
          </h3>
          <ul className="text-amber-800 dark:text-amber-200">
            <li>
              Start with conservative resource limits and adjust based on
              monitoring
            </li>
            <li>Always configure health checks for production applications</li>
            <li>
              Use environment-specific configurations for different deployment
              stages
            </li>
            <li>
              Enable security features like non-root containers and network
              policies
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
