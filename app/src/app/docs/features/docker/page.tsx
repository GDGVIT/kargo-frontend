"use client";

import {
  FaDocker,
  FaShieldAlt,
  FaBullseye,
  FaWrench,
  FaBolt,
  FaChartBar,
  FaBuilding,
  FaSearch,
  FaStore,
  FaAws,
  FaGlobe,
  FaGitlab,
  FaLock,
  FaCheckCircle,
  FaCheck,
  FaTimes,
  FaClipboardList,
  FaBug,
} from "react-icons/fa";
import { HiSparkles, HiCloud } from "react-icons/hi";
import AnimatedButton from "../../../../components/ui/AnimatedButton/AnimatedButton";

export default function DockerPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Docker Support</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Kargo provides comprehensive Docker support with AI-powered
          containerization, multi-stage builds, security scanning, and
          intelligent optimization for production deployments.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
            <FaDocker className="mr-2" />
            Docker-First Platform
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            Built with containers at its core, Kargo understands Docker deeply
            and provides intelligent automation for building, optimizing, and
            deploying containerized applications.
          </p>
        </div>

        <h2>Intelligent Dockerfile Generation</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Kargo&apos;s AI analyzes your codebase and automatically generates
            optimized Dockerfiles tailored to your application&apos;s specific
            requirements and best practices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">
                <FaBullseye className="inline mr-1" /> Framework Detection
              </h4>
              <div className="space-y-3">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <h5 className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">
                    Node.js Projects
                  </h5>
                  <p className="text-green-800 dark:text-green-200 text-xs">
                    Detects package.json, optimizes npm/yarn installs, handles
                    node_modules efficiently
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <h5 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
                    Python Applications
                  </h5>
                  <p className="text-blue-800 dark:text-blue-200 text-xs">
                    Recognizes requirements.txt/Pipfile, optimizes pip installs,
                    handles virtual environments
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                  <h5 className="font-semibold text-purple-900 dark:text-purple-100 text-sm mb-1">
                    Java/Spring
                  </h5>
                  <p className="text-purple-800 dark:text-purple-200 text-xs">
                    Detects Maven/Gradle, optimizes build processes, handles
                    JAR/WAR deployments
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                <FaWrench className="inline mr-1" /> Auto-Generated Dockerfile
              </h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                <code>
                  {`# Multi-stage build for Node.js app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
USER node
CMD ["npm", "start"]`}
                </code>
              </pre>
              <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <p className="text-yellow-800 dark:text-yellow-200 text-xs">
                  <HiSparkles className="inline mr-1" /> Generated automatically
                  based on your project structure
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2>Multi-Stage Build Optimization</h2>
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaBuilding className="inline mr-1" /> Build Stage Separation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Kargo automatically creates multi-stage builds to minimize final
              image size and improve security.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  1. Build Stage
                </h5>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Install build dependencies</li>
                  <li>• Compile/transpile code</li>
                  <li>• Run tests</li>
                  <li>• Generate assets</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  2. Runtime Stage
                </h5>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <li>• Minimal base image</li>
                  <li>• Copy only runtime files</li>
                  <li>• Runtime dependencies only</li>
                  <li>• Security hardening</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  3. Final Image
                </h5>
                <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                  <li>• 50-80% smaller size</li>
                  <li>• Reduced attack surface</li>
                  <li>• Faster deployment</li>
                  <li>• Lower costs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaChartBar className="inline mr-1" /> Size Optimization Results
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="font-medium">
                  Traditional Single-Stage Build
                </span>
                <div className="flex items-center">
                  <div className="w-32 h-4 bg-red-300 rounded mr-2"></div>
                  <span className="text-sm">~800MB</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="font-medium">Kargo Multi-Stage Optimized</span>
                <div className="flex items-center">
                  <div className="w-12 h-4 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm">~150MB</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="text-green-800 dark:text-green-200 text-sm">
                <strong>Result:</strong> 81% smaller images leading to faster
                deployments, reduced bandwidth costs, and improved security.
              </p>
            </div>
          </div>
        </div>

        <h2>Container Registry Integration</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4 flex items-center">
            <FaStore className="mr-2" /> Multi-Registry Support
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Connect to any container registry for storing and managing your
            Docker images.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Supported Registries</h4>
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <FaDocker className="text-blue-600 mr-2" />
                  <span className="text-sm">
                    <strong>Docker Hub</strong> - Public and private
                    repositories
                  </span>
                </div>
                <div className="flex items-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <FaAws className="text-orange-600 mr-2" />
                  <span className="text-sm">
                    <strong>AWS ECR</strong> - Elastic Container Registry
                  </span>
                </div>
                <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <HiCloud className="text-blue-600 mr-2" />
                  <span className="text-sm">
                    <strong>Google GCR</strong> - Google Container Registry
                  </span>
                </div>
                <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <FaGlobe className="text-blue-600 mr-2" />
                  <span className="text-sm">
                    <strong>Azure ACR</strong> - Azure Container Registry
                  </span>
                </div>
                <div className="flex items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <FaGitlab className="text-purple-600 mr-2" />
                  <span className="text-sm">
                    <strong>GitLab Registry</strong> - Integrated with GitLab
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Registry Configuration</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                <code>
                  {`# Configure registry in Kargo
registry:
  provider: "docker-hub"  # or ecr, gcr, acr
  url: "docker.io"
  username: "your-username"
  # Password/token stored securely
  
image:
  repository: "your-org/app-name"
  tag: "v1.0.0"
  pullPolicy: "IfNotPresent"`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <h2>Security & Vulnerability Scanning</h2>
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaLock className="mr-2" />
              Automated Security Scanning
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Every container image is automatically scanned for vulnerabilities
              before deployment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Scanning Process</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm">
                      Base image vulnerability scan
                    </span>
                  </div>
                  <div className="flex items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm">Package dependency analysis</span>
                  </div>
                  <div className="flex items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm">Secret detection scan</span>
                  </div>
                  <div className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm">Policy compliance check</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Security Report</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-600">Critical:</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-600">High:</span>
                      <span className="font-semibold">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-600">Medium:</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Low:</span>
                      <span className="font-semibold">12</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-green-600">
                      <FaCheckCircle className="mr-2 text-green-500" />
                      Deployment approved - No critical vulnerabilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaShieldAlt className="inline mr-1" /> Security Hardening
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Automatic Hardening</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    • <strong>Non-root user:</strong> Containers run as
                    non-privileged user
                  </li>
                  <li>
                    • <strong>Read-only filesystem:</strong> Immutable container
                    filesystem
                  </li>
                  <li>
                    • <strong>Minimal base images:</strong> Distroless or Alpine
                    Linux
                  </li>
                  <li>
                    • <strong>Capability dropping:</strong> Remove unnecessary
                    Linux capabilities
                  </li>
                  <li>
                    • <strong>Security contexts:</strong> Proper Kubernetes
                    security contexts
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  Generated Security Config
                </h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs">
                  <code>
                    {`securityContext:
  runAsNonRoot: true
  runAsUser: 1001
  runAsGroup: 1001
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <h2>Build Optimization Features</h2>
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaBolt className="inline mr-1" /> Layer Caching
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Intelligent layer caching reduces build times by reusing unchanged
              layers across builds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Cache Strategy</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <strong>Base image caching:</strong> Shared across all
                    applications
                  </div>
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <strong>Dependency caching:</strong> npm/pip/maven
                    dependencies cached
                  </div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <strong>Build artifact caching:</strong> Compiled code and
                    assets
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Performance Impact</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-sm">First build:</span>
                    <span className="text-sm font-semibold">~5-10 minutes</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <span className="text-sm">Cached build:</span>
                    <span className="text-sm font-semibold text-green-600">
                      ~30-60 seconds
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaBullseye className="inline mr-1" /> Build Optimization Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-green-600">
                  <FaCheck className="mr-2" />
                  Best Practices
                </h4>
                <ul className="space-y-1 text-sm">
                  <li>• Copy package files before source code</li>
                  <li>• Use .dockerignore to exclude unnecessary files</li>
                  <li>• Leverage multi-stage builds for size reduction</li>
                  <li>
                    • Use specific base image tags, not &quot;latest&quot;
                  </li>
                  <li>• Combine RUN instructions to reduce layers</li>
                  <li>• Clean up package caches in the same RUN command</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-red-600">
                  <FaTimes className="mr-2" />
                  Avoid These
                </h4>
                <ul className="space-y-1 text-sm">
                  <li>• Installing development dependencies in production</li>
                  <li>• Copying unnecessary files (logs, cache, etc.)</li>
                  <li>• Running package managers as root</li>
                  <li>• Using overly broad COPY commands</li>
                  <li>• Forgetting to set proper file permissions</li>
                  <li>• Including secrets in the image layers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>Docker Compose Integration</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4 flex items-center">
            <FaClipboardList className="mr-2" /> Local Development
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Automatically generate Docker Compose files for local development
            and testing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">
                Generated docker-compose.yml
              </h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                <code>
                  {`version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - database
      
  database:
    image: postgres:14
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
    volumes:
      - db_data:/var/lib/postgresql/data
      
volumes:
  db_data:`}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Development Features</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  <span>
                    <strong>Hot reload:</strong> Code changes reflected
                    instantly
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  <span>
                    <strong>Service dependencies:</strong> Database, Redis, etc.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  <span>
                    <strong>Volume mounting:</strong> Persistent data storage
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  <span>
                    <strong>Environment variables:</strong> Development
                    configuration
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  <span>
                    <strong>Network isolation:</strong> Container communication
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Monitoring & Debugging</h2>
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaSearch className="inline mr-1" /> Container Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Resource Usage
                </h5>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• CPU utilization</li>
                  <li>• Memory consumption</li>
                  <li>• Disk I/O metrics</li>
                  <li>• Network statistics</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Container Health
                </h5>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <li>• Health check status</li>
                  <li>• Restart count</li>
                  <li>• Exit codes</li>
                  <li>• Uptime tracking</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Logs & Events
                </h5>
                <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                  <li>• Real-time log streaming</li>
                  <li>• Container events</li>
                  <li>• Error tracking</li>
                  <li>• Log aggregation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <FaBug className="mr-2" /> Debug Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Container Shell Access</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                  <code>
                    {`# Access running container shell
kubectl exec -it pod/app-xyz -- /bin/sh

# View container logs
kubectl logs -f pod/app-xyz

# Debug container startup
kubectl describe pod/app-xyz`}
                  </code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Common Debug Commands</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                  <code>
                    {`# Check container processes
ps aux

# View environment variables
env | grep -i app

# Check network connectivity
wget -qO- http://service:8080/health

# View file system
ls -la /app/`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            <FaDocker className="inline mr-1" /> Ready to Containerize?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Kargo&apos;s intelligent Docker support makes containerization
            effortless while ensuring production-grade security, performance,
            and reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <AnimatedButton
              onClick={() => (window.location.href = "/docs/quick-start")}
              variant="primary"
              className="font-medium px-4 py-2"
            >
              Deploy Your First Container
            </AnimatedButton>
            <AnimatedButton
              onClick={() =>
                (window.location.href = "/docs/applications/creating")
              }
              variant="secondary"
              className="font-medium px-4 py-2"
            >
              Learn More About Applications
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
