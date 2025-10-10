import { generatePageMetadata } from '../../../lib/metadata';
import {
  FaRocket,
  FaLaptopCode,
  FaBuilding,
  FaCheck,
  FaBullseye,
  FaDocker,
  FaClock,
  FaDatabase,
  FaBox,
  FaLock,
  FaCog,
  FaApple,
  FaChartBar,
  FaShieldAlt,
  FaSearch,
  FaFileAlt,
  FaBook,
} from 'react-icons/fa';
import { SiKubernetes } from 'react-icons/si';

const title = 'Installation Guide';
const description = 'Learn how to install and set up Kargo for development or production use.';

export const metadata = generatePageMetadata({
  title,
  description,
  path: '/docs/installation',
  imageAlt: 'Kargo Installation Guide',
});

export default function InstallationPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Installation Guide</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Complete installation guide for Kargo across different environments. Choose your
          deployment strategy based on your needs: development, staging, or production.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              <FaRocket className="inline mr-1" /> Quick Start
            </h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
              Get Kargo running locally in under 10 minutes with Docker Compose.
            </p>
            <a
              href="#docker-compose-setup"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Jump to Docker Setup →
            </a>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              <FaLaptopCode className="inline mr-1" /> Development
            </h4>
            <p className="text-green-800 dark:text-green-200 text-sm mb-3">
              Full development environment with hot reload and debugging capabilities.
            </p>
            <a
              href="#development-setup"
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Development Guide →
            </a>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              <FaBuilding className="inline mr-1" /> Production
            </h4>
            <p className="text-purple-800 dark:text-purple-200 text-sm mb-3">
              Enterprise-grade deployment with Kubernetes, monitoring, and scaling.
            </p>
            <a
              href="#production-deployment"
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              Production Setup →
            </a>
          </div>
        </div>

        <h2>System Requirements</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <FaCheck className="text-green-500 mr-2" />
                Minimum Requirements
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Node.js</strong> 18.0+ and npm 8+
                </li>
                <li>
                  • <strong>Docker</strong> 20.0+ and Docker Compose
                </li>
                <li>
                  • <strong>Git</strong> for version control
                </li>
                <li>
                  • <strong>4GB RAM</strong> minimum for development
                </li>
                <li>
                  • <strong>10GB</strong> free disk space
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <FaBullseye className="text-blue-500 mr-2" />
                Recommended for Production
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Kubernetes</strong> 1.24+ cluster
                </li>
                <li>
                  • <strong>Container Registry</strong> (Docker Hub, ECR, etc.)
                </li>
                <li>
                  • <strong>MongoDB</strong> 5.0+ or Atlas
                </li>
                <li>
                  • <strong>Load Balancer</strong> with SSL termination
                </li>
                <li>
                  • <strong>Monitoring</strong> stack (Prometheus, Grafana)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 id="docker-compose-setup">
          <FaDocker className="inline mr-1" /> Quick Start with Docker Compose
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-8">
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            <strong>Fastest way to get started!</strong> This method sets up the entire Kargo stack
            with a single command. Perfect for testing and development.
          </p>

          <div className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">1. Clone and Setup</h5>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                <code>
                  {`# Clone the main repository
git clone https://github.com/gdgvit/kargo.git
cd kargo

# Copy environment configuration
cp .env.example .env

# Start all services
docker-compose up -d`}
                </code>
              </pre>
            </div>

            <div>
              <h5 className="font-semibold mb-2">2. Verify Installation</h5>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                <code>
                  {`# Check all services are running
docker-compose ps

# View logs
docker-compose logs -f

# Access the applications:
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# MongoDB: localhost:27017`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border">
            <p className="text-sm">
              <strong>
                <FaClock className="inline mr-1" /> Setup time:
              </strong>{' '}
              ~3-5 minutes
            </p>
            <p className="text-sm">
              <strong>
                <FaBullseye className="inline mr-1" /> Best for:
              </strong>{' '}
              Quick testing, demos, local development
            </p>
          </div>
        </div>

        <h2 id="development-setup">
          <FaLaptopCode className="inline mr-1" /> Development Environment Setup
        </h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
          <p className="mb-4">
            Set up a full development environment with hot reload, debugging, and development tools.
            Kargo consists of separate frontend and backend repositories for better maintainability.
          </p>

          <h3>Step 1: Prerequisites Installation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-2">🪟 Windows</h5>
              <pre className="text-xs bg-white dark:bg-gray-700 p-2 rounded">
                <code>{`# Install via winget or chocolatey
winget install Node.js
winget install Docker.DockerDesktop
winget install Git.Git

# Or using Chocolatey
choco install nodejs docker-desktop git`}</code>
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-2 flex items-center">
                <FaApple className="mr-1" /> macOS
              </h5>
              <pre className="text-xs bg-white dark:bg-gray-700 p-2 rounded">
                <code>{`# Using Homebrew
brew install node
brew install --cask docker
brew install git

# Verify installations
node --version && docker --version`}</code>
              </pre>
            </div>
          </div>

          <h3>Step 2: Clone Repositories</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <code>
              {`# Create workspace directory
mkdir kargo-workspace && cd kargo-workspace

# Clone frontend repository
git clone https://github.com/gdgvit/kargo-frontend.git
cd kargo-frontend

# Clone backend repository (in parallel directory)
cd ..
git clone https://github.com/gdgvit/kargo-backend.git
cd kargo-backend`}
            </code>
          </pre>

          <h3>Step 3: Backend Setup</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <code>
              {`cd kargo-backend/api

# Install dependencies
npm install

# Copy environment configuration
cp ../example.env ../.env

# Start development database (MongoDB)
docker run -d --name kargo-mongo \\
  -p 27017:27017 \\
  -v kargo-data:/data/db \\
  mongo:5

# Start backend in development mode
npm run dev

# Backend will be available at http://localhost:5000`}
            </code>
          </pre>

          <h3>Step 4: Frontend Setup</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <code>
              {`cd kargo-frontend/app

# Install dependencies
npm install

# Copy environment configuration
cp ../example.env ../.env

# Start frontend in development mode
npm run dev

# Frontend will be available at http://localhost:3000`}
            </code>
          </pre>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mt-4">
            <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              <FaCheck className="inline mr-1" /> Development Environment Ready!
            </h5>
            <p className="text-green-800 dark:text-green-200 text-sm">
              Both services should now be running with hot reload enabled. Changes to your code will
              automatically refresh the application.
            </p>
          </div>
        </div>

        <h2>Environment Configuration</h2>
        <div className="space-y-6 mb-8">
          <div>
            <h3>Frontend Environment Variables</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Configure <code>kargo-frontend/.env</code> with the following variables:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
              <code>
                {`# Application Configuration
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-in-production

# OAuth Providers (Get from respective developer consoles)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Feature Flags
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false`}
              </code>
            </pre>
          </div>

          <div>
            <h3>Backend Environment Variables</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Configure <code>kargo-backend/.env</code> with the following variables:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
              <code>
                {`# Server Configuration
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/kargo
REDIS_URL=redis://localhost:6379

# Authentication & Security
JWT_SECRET=your-jwt-secret-key-change-in-production
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# OAuth Configuration
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Kubernetes & Docker
KUBECONFIG_PATH=/path/to/your/kubeconfig
DOCKER_REGISTRY_URL=docker.io
DOCKER_REGISTRY_USERNAME=your-username
DOCKER_REGISTRY_PASSWORD=your-password

# AI & External Services
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key

# Monitoring & Logging
LOG_LEVEL=debug
ENABLE_METRICS=true
SENTRY_DSN=your-sentry-dsn`}
              </code>
            </pre>
          </div>
        </div>

        <h2 id="production-deployment">
          <FaBuilding className="inline mr-1" /> Production Deployment
        </h2>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6 mb-8">
          <p className="text-purple-800 dark:text-purple-200 mb-4">
            <strong>Enterprise-ready deployment</strong> with high availability, monitoring, and
            scalability. This section covers deploying Kargo to a production Kubernetes cluster.
          </p>

          <h3>Architecture Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded p-3">
              <h5 className="font-semibold mb-1">
                <FaCog className="inline mr-1" /> Control Plane
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Frontend, API server, and management services
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-3">
              <h5 className="font-semibold mb-1">
                <SiKubernetes className="inline mr-1" /> Workload Cluster
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                User applications and container orchestration
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-3">
              <h5 className="font-semibold mb-1 flex items-center">
                <FaChartBar className="mr-1" /> Observability
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Monitoring, logging, and alerting stack
              </p>
            </div>
          </div>
        </div>

        <h3>Prerequisites for Production</h3>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <SiKubernetes className="text-blue-500 mr-2 mt-1" />
              <div>
                <strong>Kubernetes Cluster</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Production-grade cluster (EKS, GKE, AKS, or self-managed) with at least 3 nodes
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <FaDatabase className="text-green-500 mr-2 mt-1" />
              <div>
                <strong>Database</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  MongoDB Atlas, Amazon DocumentDB, or self-hosted MongoDB with replica set
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <FaBox className="text-purple-500 mr-2 mt-1" />
              <div>
                <strong>Container Registry</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Docker Hub, AWS ECR, Google GCR, or Azure ACR for storing container images
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <FaLock className="text-orange-500 mr-2 mt-1" />
              <div>
                <strong>SSL/TLS Certificates</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Valid certificates for your domain (Let&apos;s Encrypt, CloudFlare, or commercial)
                </p>
              </div>
            </li>
          </ul>
        </div>

        <h3>Container-Based Production Deployment</h3>
        <p className="mb-4">
          For production deployment, you&apos;ll need to containerize both the frontend and backend
          applications and deploy them to your Kubernetes cluster or container orchestration
          platform.
        </p>

        <h4>Step 1: Build Production Images</h4>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto mb-4">
          <code>
            {`# Build frontend image
cd kargo-frontend
docker build -t your-registry/kargo-frontend:latest .

# Build backend image
cd ../kargo-backend
docker build -t your-registry/kargo-backend:latest .

# Push to your container registry
docker push your-registry/kargo-frontend:latest
docker push your-registry/kargo-backend:latest`}
          </code>
        </pre>

        <h4>Step 2: Create Kubernetes Deployments</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Create your own Kubernetes manifests based on your infrastructure requirements:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto mb-6">
          <code>
            {`# Example deployment structure
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kargo-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kargo-frontend
  template:
    metadata:
      labels:
        app: kargo-frontend
    spec:
      containers:
      - name: frontend
        image: your-registry/kargo-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_URL
          value: "https://api.yourdomain.com"
        resources:
          requests:
            cpu: "100m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"`}
          </code>
        </pre>

        <h3>Security Best Practices</h3>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center">
            <FaShieldAlt className="mr-2" />
            Critical Security Checklist
          </h4>
          <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
            <li>• Use strong, unique secrets for all JWT tokens and API keys</li>
            <li>• Enable TLS/SSL for all communications (internal and external)</li>
            <li>• Configure proper RBAC (Role-Based Access Control) in Kubernetes</li>
            <li>• Use network policies to restrict pod-to-pod communication</li>
            <li>• Enable pod security standards and admission controllers</li>
            <li>• Regularly update container images and scan for vulnerabilities</li>
            <li>• Configure proper backup and disaster recovery procedures</li>
            <li>• Set up centralized logging and monitoring for security events</li>
          </ul>
        </div>

        <h3>Post-Deployment Verification</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <code>
            {`# Check all pods are running
kubectl get pods -n kargo-system

# Verify services are accessible
kubectl get svc -n kargo-system

# Check ingress configuration
kubectl get ingress -n kargo-system

# View application logs
kubectl logs -f deployment/kargo-backend -n kargo-system

# Test API endpoint
curl https://api.kargo.yourdomain.com/health

# Verify frontend is accessible
curl https://kargo.yourdomain.com`}
          </code>
        </pre>

        <h2>Troubleshooting</h2>
        <div className="space-y-4 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <FaSearch className="mr-1" /> Common Issues
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Port already in use:</strong>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                  <code>lsof -ti:3000 | xargs kill -9 # Kill process on port 3000</code>
                </pre>
              </div>

              <div>
                <strong>MongoDB connection failed:</strong>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                  <code>docker ps | grep mongo # Check if MongoDB container is running</code>
                </pre>
              </div>

              <div>
                <strong>Environment variables not loaded:</strong>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                  <code>ls -la .env # Verify .env file exists and is readable</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <FaFileAlt className="mr-1" /> Getting Help
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              If you encounter issues during installation:
            </p>
            <ul className="space-y-1 text-sm">
              <li>
                • Check our{' '}
                <a
                  href="https://github.com/gdgvit/kargo/discussions"
                  className="text-blue-600 hover:text-blue-700"
                >
                  GitHub Discussions
                </a>
              </li>
              <li>
                • Join our{' '}
                <a href="https://discord.gg/kargo" className="text-blue-600 hover:text-blue-700">
                  Discord Community
                </a>
              </li>
              <li>
                • Review{' '}
                <a
                  href="https://github.com/gdgvit/kargo/issues"
                  className="text-blue-600 hover:text-blue-700"
                >
                  existing issues
                </a>{' '}
                on GitHub
              </li>
              <li>
                • Contact support at{' '}
                <a
                  href="mailto:support@kargo.dscvit.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  support@kargo.dscvit.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
            <FaCheck className="mr-2" />
            Installation Complete!
          </h3>
          <p className="text-green-800 dark:text-green-200 mb-4">
            Congratulations! You now have Kargo running. Here&apos;s what to do next:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold mb-2 flex items-center">
                <FaRocket className="mr-1" /> Next Steps
              </h5>
              <ul className="space-y-1 text-sm">
                <li>
                  •{' '}
                  <a href="/docs/quick-start" className="text-blue-600 hover:text-blue-700">
                    Deploy your first application
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href="/docs/applications/configuration"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Configure advanced settings
                  </a>
                </li>
                <li>
                  •{' '}
                  <a href="/docs/features/ai-setup" className="text-blue-600 hover:text-blue-700">
                    Explore AI-powered features
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-2 flex items-center">
                <FaBook className="mr-1" /> Learn More
              </h5>
              <ul className="space-y-1 text-sm">
                <li>
                  •{' '}
                  <a href="/docs/api/authentication" className="text-blue-600 hover:text-blue-700">
                    API documentation
                  </a>
                </li>
                <li>
                  •{' '}
                  <a href="/docs/admin/users" className="text-blue-600 hover:text-blue-700">
                    User management
                  </a>
                </li>
                <li>
                  •{' '}
                  <a href="/docs/admin/resources" className="text-blue-600 hover:text-blue-700">
                    Resource optimization
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
