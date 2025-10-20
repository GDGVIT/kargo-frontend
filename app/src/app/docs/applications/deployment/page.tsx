import { generatePageMetadata } from '@/lib/metadata';

const title = 'Application Deployment';
const description = 'Learn how to deploy and manage applications in Kargo.';

export const metadata = generatePageMetadata({
  title,
  description,
  path: '/docs/applications/deployment',
  imageAlt: 'Application Deployment in Kargo',
});

export default function ApplicationDeploymentPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Application Deployment</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Deploy and manage your applications with Kargo&apos;s powerful deployment features.
        </p>

        <h2>Deployment Strategies</h2>
        <p>Kargo supports multiple deployment strategies:</p>

        <h3>Rolling Deployment</h3>
        <ul>
          <li>Gradually replaces old versions with new ones</li>
          <li>Zero downtime deployment</li>
          <li>Automatic rollback on failure</li>
          <li>Default strategy for most applications</li>
        </ul>

        <h3>Blue-Green Deployment</h3>
        <ul>
          <li>Maintains two identical production environments</li>
          <li>Instant traffic switching</li>
          <li>Quick rollback capability</li>
          <li>Higher resource usage</li>
        </ul>

        <h3>Canary Deployment</h3>
        <ul>
          <li>Gradually routes traffic to new version</li>
          <li>Risk mitigation through gradual rollout</li>
          <li>Performance monitoring during deployment</li>
          <li>Automatic rollback on issues</li>
        </ul>

        <h2>Deployment Process</h2>
        <ol>
          <li>
            <strong>Build</strong> - Container image is built from source
          </li>
          <li>
            <strong>Test</strong> - Automated tests run against the image
          </li>
          <li>
            <strong>Deploy</strong> - Image is deployed to Kubernetes
          </li>
          <li>
            <strong>Verify</strong> - Health checks confirm successful deployment
          </li>
          <li>
            <strong>Monitor</strong> - Ongoing monitoring ensures stability
          </li>
        </ol>

        <h2>Continuous Deployment</h2>
        <p>Set up automatic deployments from your Git repository:</p>

        <h3>GitHub Integration</h3>
        <ul>
          <li>Automatic deployments on code push</li>
          <li>Branch-based deployments</li>
          <li>Pull request previews</li>
          <li>Commit status updates</li>
        </ul>

        <h3>Deployment Triggers</h3>
        <ul>
          <li>
            <strong>Manual</strong> - Deploy when you choose
          </li>
          <li>
            <strong>On Push</strong> - Deploy automatically on git push
          </li>
          <li>
            <strong>On Tag</strong> - Deploy when you create a git tag
          </li>
          <li>
            <strong>Scheduled</strong> - Deploy on a schedule
          </li>
        </ul>

        <h2>Environment Management</h2>
        <p>Manage multiple environments for your application:</p>

        <h3>Development</h3>
        <ul>
          <li>Quick iteration and testing</li>
          <li>Lower resource allocation</li>
          <li>Debug-friendly configuration</li>
        </ul>

        <h3>Staging</h3>
        <ul>
          <li>Production-like environment</li>
          <li>Final testing before release</li>
          <li>Integration testing</li>
        </ul>

        <h3>Production</h3>
        <ul>
          <li>Live user-facing environment</li>
          <li>High availability configuration</li>
          <li>Performance monitoring</li>
          <li>Backup and disaster recovery</li>
        </ul>

        <h2>Rollback and Recovery</h2>
        <p>Kargo provides several options for handling deployment issues:</p>

        <h3>Automatic Rollback</h3>
        <ul>
          <li>Health check failures trigger rollback</li>
          <li>Configurable failure thresholds</li>
          <li>Notification on rollback events</li>
        </ul>

        <h3>Manual Rollback</h3>
        <ul>
          <li>One-click rollback to previous version</li>
          <li>Rollback to any previous deployment</li>
          <li>Version history and comparison</li>
        </ul>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
            🚀 Deployment Best Practices
          </h3>
          <ul className="text-green-800 dark:text-green-200">
            <li>Always test in staging before production deployment</li>
            <li>Use health checks to ensure deployment success</li>
            <li>Monitor application metrics during and after deployment</li>
            <li>Keep deployment artifacts for easy rollback</li>
            <li>Use feature flags for gradual feature rollouts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
