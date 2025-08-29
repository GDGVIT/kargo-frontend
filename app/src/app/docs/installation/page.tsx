import { generatePageMetadata } from "../../../lib/metadata";

const title = "Installation Guide";
const description =
  "Learn how to install and set up Kargo for development or production use.";

export const metadata = generatePageMetadata({
  title,
  description,
  path: "/docs/installation",
  imageAlt: "Kargo Installation Guide",
});

export default function InstallationPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Installation Guide</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Set up Kargo for development or production environments. Kargo
          consists of two separate repositories: the frontend and backend
          services.
        </p>

        <h2>System Requirements</h2>
        <ul>
          <li>Node.js 18+ and npm/yarn</li>
          <li>Docker and Docker Compose</li>
          <li>Kubernetes cluster (for production)</li>
          <li>Git for version control</li>
        </ul>

        <h2>Development Setup</h2>

        <h3>1. Clone the Repositories</h3>
        <p>
          Kargo is split into two separate repositories for better
          maintainability:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`# Clone the frontend repository
git clone https://github.com/gdgvit/kargo-frontend.git
cd kargo-frontend

# Clone the backend repository (in a separate directory)
cd ..
git clone https://github.com/gdgvit/kargo-backend.git
cd kargo-backend`}
          </code>
        </pre>

        <h3>2. Frontend Setup</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`cd kargo-frontend/app
npm install
cp ../example.env ../.env
npm run dev`}
          </code>
        </pre>

        <h3>3. Backend Setup</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`cd kargo-backend/api
npm install
cp ../example.env ../.env
npm run dev`}
          </code>
        </pre>

        <h2>Environment Configuration</h2>
        <p>
          Configure the following environment variables in your{" "}
          <code>.env</code> files:
        </p>

        <h3>Frontend (.env)</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret`}
          </code>
        </pre>

        <h3>Backend (.env)</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kargo
JWT_SECRET=your-jwt-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret`}
          </code>
        </pre>

        <h2>Docker Setup</h2>
        <p>
          For a quick setup using Docker Compose, you can run each service
          independently:
        </p>

        <h3>Frontend with Docker</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`# From the kargo-frontend directory
docker-compose up -d

# This will start the frontend on http://localhost:3000`}
          </code>
        </pre>

        <h3>Backend with Docker</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <code>
            {`# From the kargo-backend directory
docker-compose up -d

# This will start:
# - Backend API on http://localhost:5000
# - MongoDB database (if included in compose)`}
          </code>
        </pre>

        <h2>Production Deployment</h2>
        <p>
          For production deployment, you&apos;ll need to deploy each service
          independently:
        </p>
        <ul>
          <li>
            Frontend: Deploy to Vercel, Netlify, or your preferred static
            hosting
          </li>
          <li>Backend: Deploy to a server with Kubernetes access</li>
          <li>A Kubernetes cluster for application deployments</li>
          <li>
            Container registry (Docker Hub, GitHub Container Registry, etc.)
          </li>
          <li>Domain name and SSL certificates</li>
          <li>External database (MongoDB Atlas, etc.)</li>
        </ul>

        <p>
          Each repository contains its own deployment configuration and Docker
          files.
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            ⚠️ Security Notice
          </h3>
          <p className="text-yellow-800 dark:text-yellow-200">
            Make sure to use strong, unique secrets in production and never
            commit sensitive environment variables to version control.
          </p>
        </div>
      </div>
    </div>
  );
}
