import { generatePageMetadata } from '../../../../lib/metadata';

const title = 'Environment Variables';
const description =
  'Learn how to manage environment variables and configuration in Kargo applications.';

export const metadata = generatePageMetadata({
  title,
  description,
  path: '/docs/applications/environment',
  imageAlt: 'Environment Variables in Kargo',
});

export default function EnvironmentVariablesPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Environment Variables</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Manage configuration and secrets for your applications using environment variables.
        </p>

        <h2>Types of Environment Variables</h2>

        <h3>Configuration Variables</h3>
        <p>Non-sensitive configuration that can be stored in plain text:</p>
        <ul>
          <li>API endpoints and URLs</li>
          <li>Feature flags</li>
          <li>Application settings</li>
          <li>Debug modes</li>
        </ul>

        <h3>Secrets</h3>
        <p>Sensitive data that requires encryption:</p>
        <ul>
          <li>Database passwords</li>
          <li>API keys and tokens</li>
          <li>Encryption keys</li>
          <li>OAuth client secrets</li>
        </ul>

        <h2>Setting Environment Variables</h2>

        <h3>Through the Dashboard</h3>
        <ol>
          <li>Navigate to your application settings</li>
          <li>Go to the &quot;Environment&quot; tab</li>
          <li>Add key-value pairs</li>
          <li>Mark sensitive variables as secrets</li>
          <li>Save and redeploy</li>
        </ol>

        <h3>Through Configuration Files</h3>
        <p>You can also define environment variables in your application configuration:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`environment:
  NODE_ENV: production
  API_URL: https://api.example.com
  DEBUG: false
secrets:
  DATABASE_PASSWORD: secret-ref-db-password
  JWT_SECRET: secret-ref-jwt-secret`}
          </code>
        </pre>

        <h2>Environment-Specific Variables</h2>
        <p>Different environments often require different configurations:</p>

        <table className="min-w-full">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Development</th>
              <th>Staging</th>
              <th>Production</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NODE_ENV</td>
              <td>development</td>
              <td>staging</td>
              <td>production</td>
            </tr>
            <tr>
              <td>LOG_LEVEL</td>
              <td>debug</td>
              <td>info</td>
              <td>warn</td>
            </tr>
            <tr>
              <td>DATABASE_URL</td>
              <td>localhost:5432</td>
              <td>staging-db.com</td>
              <td>prod-db.com</td>
            </tr>
          </tbody>
        </table>

        <h2>Secret Management</h2>
        <p>Kargo uses Kubernetes secrets to securely store sensitive data:</p>

        <h3>Creating Secrets</h3>
        <ul>
          <li>Secrets are encrypted at rest</li>
          <li>Access is controlled by RBAC</li>
          <li>Secrets are mounted as environment variables</li>
          <li>Automatic rotation support</li>
        </ul>

        <h3>Secret Sources</h3>
        <ul>
          <li>
            <strong>Manual Entry</strong> - Enter secrets through the dashboard
          </li>
          <li>
            <strong>External Secrets</strong> - Sync from external secret managers
          </li>
          <li>
            <strong>CI/CD Integration</strong> - Set secrets during deployment
          </li>
        </ul>

        <h2>Best Practices</h2>

        <h3>Security</h3>
        <ul>
          <li>Never commit secrets to version control</li>
          <li>Use different secrets for each environment</li>
          <li>Rotate secrets regularly</li>
          <li>Limit secret access to necessary applications only</li>
        </ul>

        <h3>Organization</h3>
        <ul>
          <li>Use consistent naming conventions</li>
          <li>Group related variables together</li>
          <li>Document the purpose of each variable</li>
          <li>Use environment-specific prefixes when needed</li>
        </ul>

        <h2>Common Environment Variables</h2>
        <p>Here are some commonly used environment variables in applications:</p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`# Application
NODE_ENV=production
PORT=3000
LOG_LEVEL=info

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379

# External Services
API_BASE_URL=https://api.example.com
MAIL_SERVER=smtp.example.com

# Security
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key

# Feature Flags
ENABLE_FEATURE_X=true
MAX_UPLOAD_SIZE=10MB`}
          </code>
        </pre>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
            🔐 Security Warning
          </h3>
          <p className="text-red-800 dark:text-red-200">
            Always mark sensitive data as secrets. Regular environment variables are visible to
            anyone with access to the application configuration.
          </p>
        </div>
      </div>
    </div>
  );
}
