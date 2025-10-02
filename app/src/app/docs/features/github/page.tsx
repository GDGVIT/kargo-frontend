import { generatePageMetadata } from "../../../../lib/metadata";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSync,
  FaLink,
} from "react-icons/fa";

const title = "GitHub Integration";
const description =
  "Learn how to integrate GitHub repositories with Kargo for seamless deployments.";

export const metadata = generatePageMetadata({
  title,
  description,
  path: "/docs/features/github",
  imageAlt: "GitHub Integration with Kargo",
});

export default function GitHubIntegrationPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">GitHub Integration</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Seamlessly connect your GitHub repositories with Kargo for automated
          deployments and CI/CD workflows.
        </p>

        <h2>Setting Up GitHub Integration</h2>

        <h3>OAuth Authentication</h3>
        <ol>
          <li>Navigate to your account settings</li>
          <li>Click &quot;Connect GitHub Account&quot;</li>
          <li>Authorize Kargo to access your repositories</li>
          <li>Select which repositories to grant access to</li>
        </ol>

        <h3>Repository Permissions</h3>
        <p>Kargo requires the following permissions:</p>
        <ul>
          <li>
            <strong>Read Repository</strong> - Access source code and files
          </li>
          <li>
            <strong>Read Metadata</strong> - Repository information and branches
          </li>
          <li>
            <strong>Write Status</strong> - Update commit status for deployments
          </li>
          <li>
            <strong>Read Webhooks</strong> - Receive notifications on code
            changes
          </li>
        </ul>

        <h2>Automated Deployments</h2>

        <h3>Webhook Configuration</h3>
        <p>Kargo automatically configures webhooks to trigger deployments:</p>
        <ul>
          <li>Push events to monitored branches</li>
          <li>Pull request creation and updates</li>
          <li>Tag creation for release deployments</li>
          <li>Repository settings changes</li>
        </ul>

        <h3>Branch Strategies</h3>
        <p>Configure different deployment strategies for different branches:</p>

        <table className="min-w-full">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Environment</th>
              <th>Deployment Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>main/master</td>
              <td>Production</td>
              <td>Rolling deployment</td>
            </tr>
            <tr>
              <td>develop</td>
              <td>Staging</td>
              <td>Blue-green deployment</td>
            </tr>
            <tr>
              <td>feature/*</td>
              <td>Development</td>
              <td>Preview deployments</td>
            </tr>
          </tbody>
        </table>

        <h2>Pull Request Workflows</h2>

        <h3>Preview Deployments</h3>
        <p>Automatically create preview environments for pull requests:</p>
        <ul>
          <li>Temporary environment for each PR</li>
          <li>Unique URL for testing changes</li>
          <li>Automatic cleanup when PR is closed</li>
          <li>Status updates in GitHub</li>
        </ul>

        <h3>Deployment Status</h3>
        <p>Kargo updates GitHub with deployment information:</p>
        <ul>
          <li className="flex items-center">
            <FaCheckCircle className="mr-2 text-green-500" /> Deployment
            successful
          </li>
          <li className="flex items-center">
            <FaClock className="mr-2 text-yellow-500" /> Deployment in progress
          </li>
          <li className="flex items-center">
            <FaTimesCircle className="mr-2 text-red-500" /> Deployment failed
          </li>
          <li className="flex items-center">
            <FaSync className="mr-2 text-blue-500" /> Deployment pending
          </li>
        </ul>

        <h2>Repository Analysis</h2>

        <h3>Automatic Detection</h3>
        <p>Kargo analyzes your repository to determine:</p>
        <ul>
          <li>Programming language and framework</li>
          <li>Build requirements and dependencies</li>
          <li>Dockerfile presence and optimization opportunities</li>
          <li>Environment variable requirements</li>
        </ul>

        <h3>Dockerfile Generation</h3>
        <p>If no Dockerfile exists, Kargo can generate one:</p>
        <ul>
          <li>Framework-specific optimizations</li>
          <li>Multi-stage builds for production</li>
          <li>Security best practices</li>
          <li>Performance optimizations</li>
        </ul>

        <h2>Security and Compliance</h2>

        <h3>Access Control</h3>
        <ul>
          <li>Repository-level permissions</li>
          <li>Team-based access control</li>
          <li>Audit logs for all actions</li>
          <li>Integration with GitHub&apos;s security features</li>
        </ul>

        <h3>Secret Management</h3>
        <ul>
          <li>Secure storage of GitHub tokens</li>
          <li>Environment-specific secrets</li>
          <li>Integration with GitHub Secrets</li>
          <li>Automatic secret rotation</li>
        </ul>

        <h2>Advanced Features</h2>

        <h3>GitHub Actions Integration</h3>
        <p>Integrate with existing GitHub Actions workflows:</p>
        <ul>
          <li>Trigger Kargo deployments from Actions</li>
          <li>Pass build artifacts to Kargo</li>
          <li>Coordinate complex CI/CD pipelines</li>
          <li>Custom deployment notifications</li>
        </ul>

        <h3>Release Management</h3>
        <ul>
          <li>Automatic deployment on GitHub releases</li>
          <li>Semantic versioning support</li>
          <li>Release notes integration</li>
          <li>Rollback to previous releases</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
            <FaLink className="mr-2" /> Integration Benefits
          </h3>
          <ul className="text-blue-800 dark:text-blue-200">
            <li>Seamless developer workflow</li>
            <li>Automated deployment on code changes</li>
            <li>Real-time status updates</li>
            <li>Easy rollback and versioning</li>
            <li>Integrated monitoring and logging</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
