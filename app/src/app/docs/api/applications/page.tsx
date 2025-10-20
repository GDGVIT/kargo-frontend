import { generatePageMetadata } from '@/lib/metadata';

const title = 'Applications API';
const description = 'Complete reference for the Kargo Applications API endpoints.';

export const metadata = generatePageMetadata({
  title,
  description,
  path: '/docs/api/applications',
  imageAlt: 'Kargo Applications API Reference',
});

export default function ApplicationsAPIPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Applications API</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Complete reference for managing applications through the Kargo API.
        </p>

        <h2>Base URL</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>https://api.kargo.dev/api/applications</code>
        </pre>

        <h2>List Applications</h2>
        <p>Retrieve a list of all applications in your account.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`GET /api/applications
Authorization: Bearer <token>`}
          </code>
        </pre>

        <h3>Query Parameters</h3>
        <ul>
          <li>
            <code>page</code> (optional) - Page number for pagination
          </li>
          <li>
            <code>limit</code> (optional) - Number of items per page (max 100)
          </li>
          <li>
            <code>status</code> (optional) - Filter by status (running, stopped, error)
          </li>
          <li>
            <code>environment</code> (optional) - Filter by environment
          </li>
        </ul>

        <h3>Response</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`{
  "applications": [
    {
      "id": "app-123",
      "name": "my-web-app",
      "status": "running",
      "image": "nginx:latest",
      "replicas": 3,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T11:00:00Z",
      "url": "https://my-web-app.kargo.dev"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}`}
          </code>
        </pre>

        <h2>Get Application</h2>
        <p>Retrieve details for a specific application.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`GET /api/applications/{id}
Authorization: Bearer <token>`}
          </code>
        </pre>

        <h3>Response</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`{
  "id": "app-123",
  "name": "my-web-app",
  "description": "My awesome web application",
  "status": "running",
  "image": "nginx:latest",
  "port": 80,
  "replicas": 3,
  "environment": "production",
  "resources": {
    "cpu": "500m",
    "memory": "1Gi",
    "storage": "10Gi"
  },
  "env_vars": {
    "NODE_ENV": "production",
    "API_URL": "https://api.example.com"
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:00:00Z",
  "url": "https://my-web-app.kargo.dev"
}`}
          </code>
        </pre>

        <h2>Create Application</h2>
        <p>Create a new application.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`POST /api/applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "my-new-app",
  "description": "A new application",
  "image": "nginx:latest",
  "port": 80,
  "replicas": 2,
  "environment": "development",
  "resources": {
    "cpu": "250m",
    "memory": "512Mi"
  },
  "env_vars": {
    "NODE_ENV": "development"
  }
}`}
          </code>
        </pre>

        <h3>Response</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`{
  "id": "app-456",
  "name": "my-new-app",
  "status": "pending",
  "message": "Application created successfully"
}`}
          </code>
        </pre>

        <h2>Update Application</h2>
        <p>Update an existing application.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`PUT /api/applications/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "replicas": 5,
  "resources": {
    "cpu": "1000m",
    "memory": "2Gi"
  }
}`}
          </code>
        </pre>

        <h2>Scale Application</h2>
        <p>Scale an application to a specific number of replicas.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`POST /api/applications/{id}/scale
Authorization: Bearer <token>
Content-Type: application/json

{
  "replicas": 10
}`}
          </code>
        </pre>

        <h2>Deploy Application</h2>
        <p>Trigger a new deployment for an application.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`POST /api/applications/{id}/deploy
Authorization: Bearer <token>
Content-Type: application/json

{
  "image": "nginx:1.21",
  "force": false
}`}
          </code>
        </pre>

        <h2>Stop Application</h2>
        <p>Stop a running application.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`POST /api/applications/{id}/stop
Authorization: Bearer <token>`}
          </code>
        </pre>

        <h2>Start Application</h2>
        <p>Start a stopped application.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`POST /api/applications/{id}/start
Authorization: Bearer <token>`}
          </code>
        </pre>

        <h2>Delete Application</h2>
        <p>Permanently delete an application and all its resources.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`DELETE /api/applications/{id}
Authorization: Bearer <token>`}
          </code>
        </pre>

        <h2>Get Application Logs</h2>
        <p>Retrieve logs for an application.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`GET /api/applications/{id}/logs
Authorization: Bearer <token>`}
          </code>
        </pre>

        <h3>Query Parameters</h3>
        <ul>
          <li>
            <code>lines</code> (optional) - Number of log lines to return (default: 100)
          </li>
          <li>
            <code>since</code> (optional) - Return logs since timestamp
          </li>
          <li>
            <code>follow</code> (optional) - Stream logs in real-time
          </li>
        </ul>

        <h2>Get Application Metrics</h2>
        <p>Retrieve performance metrics for an application.</p>

        <h3>Request</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`GET /api/applications/{id}/metrics
Authorization: Bearer <token>`}
          </code>
        </pre>

        <h3>Response</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`{
  "cpu_usage": "45%",
  "memory_usage": "67%",
  "network_in": "1.2MB/s",
  "network_out": "800KB/s",
  "requests_per_second": 150,
  "response_time": "45ms"
}`}
          </code>
        </pre>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📋 API Response Codes
          </h3>
          <ul className="text-blue-800 dark:text-blue-200">
            <li>
              <strong>200</strong> - Success
            </li>
            <li>
              <strong>201</strong> - Created
            </li>
            <li>
              <strong>400</strong> - Bad Request
            </li>
            <li>
              <strong>401</strong> - Unauthorized
            </li>
            <li>
              <strong>403</strong> - Forbidden
            </li>
            <li>
              <strong>404</strong> - Not Found
            </li>
            <li>
              <strong>429</strong> - Rate Limited
            </li>
            <li>
              <strong>500</strong> - Server Error
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
