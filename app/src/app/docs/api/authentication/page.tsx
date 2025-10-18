import { generatePageMetadata } from '../../../../lib/metadata';

const title = 'API Authentication';
const description = 'Learn how to authenticate with the Kargo API using tokens and OAuth.';

export const metadata = generatePageMetadata({
  title,
  description,
  path: '/docs/api/authentication',
  imageAlt: 'Kargo API Authentication',
});

export default function APIAuthenticationPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">API Authentication</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Learn how to authenticate with the Kargo API using various methods.
        </p>

        <h2>Authentication Methods</h2>

        <h3>1. JWT Tokens</h3>
        <p>Most API endpoints require JWT authentication:</p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>{`Authorization: Bearer <your-jwt-token>`}</code>
        </pre>

        <h3>2. OAuth 2.0</h3>
        <p>For third-party integrations, use OAuth with supported providers:</p>
        <ul>
          <li>GitHub OAuth</li>
          <li>Google OAuth</li>
        </ul>

        <h2>Getting Your Token</h2>
        <ol>
          <li>Sign in to your Kargo account</li>
          <li>Go to Settings → API Tokens</li>
          <li>Generate a new token</li>
          <li>Copy and securely store the token</li>
        </ol>

        <h3>Token Scopes</h3>
        <p>When creating a token, you can specify scopes:</p>
        <ul>
          <li>
            <strong>read:applications</strong> - Read application data
          </li>
          <li>
            <strong>write:applications</strong> - Create and modify applications
          </li>
          <li>
            <strong>read:logs</strong> - Access application logs
          </li>
          <li>
            <strong>read:metrics</strong> - Access application metrics
          </li>
          <li>
            <strong>admin</strong> - Full administrative access
          </li>
        </ul>

        <h2>Example Requests</h2>

        <h3>Get Applications</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`curl -X GET \\
  https://api.kargo.dev/api/applications \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`}
          </code>
        </pre>

        <h3>Create Application</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`curl -X POST \\
  https://api.kargo.dev/api/applications \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "my-app",
    "image": "nginx:latest",
    "port": 80,
    "replicas": 3
  }'`}
          </code>
        </pre>

        <h3>Update Application</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`curl -X PUT \\
  https://api.kargo.dev/api/applications/my-app \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "replicas": 5,
    "resources": {
      "cpu": "500m",
      "memory": "1Gi"
    }
  }'`}
          </code>
        </pre>

        <h2>Rate Limiting</h2>
        <p>The Kargo API implements rate limiting to ensure fair usage:</p>
        <ul>
          <li>
            <strong>Standard Plan</strong> - 1000 requests per hour
          </li>
          <li>
            <strong>Pro Plan</strong> - 5000 requests per hour
          </li>
          <li>
            <strong>Enterprise Plan</strong> - 10000 requests per hour
          </li>
        </ul>

        <h3>Rate Limit Headers</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1609459200`}
          </code>
        </pre>

        <h2>Error Responses</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Status Code</th>
              <th>Description</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>401</td>
              <td>Unauthorized</td>
              <td>Invalid or missing token</td>
            </tr>
            <tr>
              <td>403</td>
              <td>Forbidden</td>
              <td>Insufficient permissions</td>
            </tr>
            <tr>
              <td>429</td>
              <td>Rate Limited</td>
              <td>Too many requests</td>
            </tr>
            <tr>
              <td>500</td>
              <td>Server Error</td>
              <td>Internal server error</td>
            </tr>
          </tbody>
        </table>

        <h3>Error Response Format</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid authentication token",
    "details": "The provided token has expired"
  }
}`}
          </code>
        </pre>

        <h2>SDK Libraries</h2>
        <p>Official SDK libraries are available for popular languages:</p>

        <h3>JavaScript/Node.js</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`npm install @kargo/sdk

import { KargoClient } from '@kargo/sdk';

const client = new KargoClient({
  token: 'your-api-token'
});

const apps = await client.applications.list();`}
          </code>
        </pre>

        <h3>Python</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`pip install kargo-sdk

from kargo import KargoClient

client = KargoClient(token='your-api-token')
apps = client.applications.list()`}
          </code>
        </pre>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
            🔒 Security Best Practices
          </h3>
          <ul className="text-red-800 dark:text-red-200">
            <li>Never expose your API tokens in client-side code</li>
            <li>Rotate tokens regularly (recommended: every 90 days)</li>
            <li>Use environment variables to store tokens</li>
            <li>Implement proper error handling for authentication failures</li>
            <li>Use the minimum required scopes for your use case</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
