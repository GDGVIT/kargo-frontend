"use client";

import {
  FaRocket,
  FaRobot,
  FaBolt,
  FaBrain,
  FaLink,
  FaChartLine,
  FaGlobe,
  FaCog,
  FaChartBar,
  FaRunning,
  FaTools,
  FaSearch,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";
import AnimatedButton from "../../components/ui/AnimatedButton/AnimatedButton";

export default function DocsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Kargo Documentation</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Welcome to Kargo, a comprehensive, AI-augmented deployment platform
          that empowers developers to deploy containerized applications with
          unprecedented ease and intelligence. Experience the future of cloud
          deployment with Kubernetes-native scaling and AI-powered optimization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
            <div className="text-blue-600 dark:text-blue-400 text-2xl mb-3">
              <FaRocket />
            </div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Quick Deploy
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Deploy your first app in under 5 minutes with our streamlined
              workflow.
            </p>
            <a
              href="/docs/quick-start"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium mt-2 inline-block"
            >
              Get Started →
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-6">
            <div className="text-purple-600 dark:text-purple-400 text-2xl mb-3">
              <FaRobot />
            </div>
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              AI-Powered
            </h3>
            <p className="text-purple-800 dark:text-purple-200 text-sm">
              Let AI optimize your configurations and suggest best practices
              automatically.
            </p>
            <a
              href="/docs/features/ai-setup"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium mt-2 inline-block"
            >
              Learn More →
            </a>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-lg p-6">
            <div className="text-green-600 dark:text-green-400 text-2xl mb-3">
              <FaBolt />
            </div>
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              Enterprise Ready
            </h3>
            <p className="text-green-800 dark:text-green-200 text-sm">
              Production-grade Kubernetes infrastructure with monitoring and
              scaling.
            </p>
            <a
              href="/docs/installation"
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium mt-2 inline-block"
            >
              Deploy →
            </a>
          </div>
        </div>

        <h2>What is Kargo?</h2>
        <p>
          Kargo is a next-generation deployment platform that bridges the gap
          between traditional deployment complexity and modern developer
          productivity. By combining the robust foundation of Kubernetes with
          intelligent AI-driven automation, Kargo makes container deployment
          accessible to developers of all skill levels.
        </p>

        <p>
          Whether you&apos;re a startup deploying your first MVP, a growing
          company scaling microservices, or an enterprise managing complex
          distributed systems, Kargo provides the tools, intelligence, and
          reliability you need to succeed.
        </p>

        <h2>Core Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="flex items-center mb-3">
              <span className="text-blue-500 mr-2">
                <FaBrain />
              </span>
              AI-Powered Intelligence
            </h3>
            <ul className="space-y-2">
              <li>• Automatic Dockerfile generation and optimization</li>
              <li>• Smart resource allocation and scaling recommendations</li>
              <li>• Security best practices enforcement</li>
              <li>• Performance tuning suggestions</li>
            </ul>
          </div>

          <div>
            <h3 className="flex items-center mb-3">
              <span className="text-green-500 mr-2">
                <FaLink />
              </span>
              Seamless Integration
            </h3>
            <ul className="space-y-2">
              <li>• Direct GitHub repository deployment</li>
              <li>• Automated CI/CD pipeline creation</li>
              <li>• Container registry integration</li>
              <li>• Third-party service connections</li>
            </ul>
          </div>

          <div>
            <h3 className="flex items-center mb-3">
              <span className="text-purple-500 mr-2">
                <SiKubernetes />
              </span>
              Kubernetes Native
            </h3>
            <ul className="space-y-2">
              <li>• Production-grade container orchestration</li>
              <li>• Auto-scaling and load balancing</li>
              <li>• High availability and fault tolerance</li>
              <li>• Service mesh integration ready</li>
            </ul>
          </div>

          <div>
            <h3 className="flex items-center mb-3">
              <span className="text-orange-500 mr-2">
                <FaChartLine />
              </span>
              Observability & Control
            </h3>
            <ul className="space-y-2">
              <li>• Real-time application monitoring</li>
              <li>• Comprehensive logging and metrics</li>
              <li>• Resource usage analytics</li>
              <li>• Cost optimization insights</li>
            </ul>
          </div>
        </div>

        <h2>Popular Use Cases</h2>
        <div className="space-y-4 mb-8">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              <FaGlobe className="inline mr-2" />
              Full-Stack Web Applications
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Deploy React, Vue, or Angular frontends with Node.js, Python, or
              Go backends. Automatic HTTPS, CDN integration, and database
              connections.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              <FaTools className="inline mr-2" />
              Microservices Architecture
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Orchestrate complex microservices with intelligent service
              discovery, load balancing, and inter-service communication.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              <FaRobot className="inline mr-2" />
              AI/ML Model Deployment
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Deploy machine learning models with auto-scaling inference
              endpoints, GPU support, and model versioning.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              <FaChartBar className="inline mr-2" />
              High-Traffic Applications
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Handle millions of requests with horizontal pod autoscaling,
              intelligent caching, and global load distribution.
            </p>
          </div>
        </div>

        <h2>Getting Started Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="font-semibold mb-3 flex items-center">
              <FaRunning className="mr-2" />
              Quick Start (5 minutes)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Perfect for trying Kargo with an existing project
            </p>
            <ol className="space-y-2 text-sm">
              <li>1. Connect your GitHub repository</li>
              <li>2. Let AI analyze and configure your app</li>
              <li>3. Deploy with one click</li>
              <li>4. Access your live application</li>
            </ol>
            <AnimatedButton
              onClick={() => (window.location.href = "/docs/quick-start")}
              variant="primary"
              className="mt-4"
            >
              Start Quick Tutorial
            </AnimatedButton>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="font-semibold mb-3">
              <FaTools className="inline mr-2" />
              Complete Setup (15 minutes)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Comprehensive guide for production deployments
            </p>
            <ol className="space-y-2 text-sm">
              <li>1. Install and configure Kargo</li>
              <li>2. Set up development environment</li>
              <li>3. Configure production settings</li>
              <li>4. Deploy your first application</li>
            </ol>
            <AnimatedButton
              onClick={() => (window.location.href = "/docs/installation")}
              variant="success"
              className="mt-4"
            >
              Full Installation Guide
            </AnimatedButton>
          </div>
        </div>

        <h2>Architecture Overview</h2>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2 justify-center flex">
                <FaCog />
              </div>
              <h4 className="font-semibold mb-2">Control Plane</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Web dashboard, API server, and AI engine for intelligent
                deployment management
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2 justify-center flex">
                <SiKubernetes />
              </div>
              <h4 className="font-semibold mb-2">Kubernetes Cluster</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Production-grade container orchestration with auto-scaling and
                high availability
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2 justify-center flex">
                <FaSearch />
              </div>
              <h4 className="font-semibold mb-2">Observability Stack</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive monitoring, logging, and alerting for all your
                applications
              </p>
            </div>
          </div>
        </div>

        <h2>Community & Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="font-semibold mb-2 flex items-center">
              <FaBook className="mr-2" />
              Documentation
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Comprehensive guides, tutorials, and API references
            </p>
            <ul className="space-y-1 text-sm">
              <li>
                •{" "}
                <a
                  href="/docs/quick-start"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Quick Start Guide
                </a>
              </li>
              <li>
                •{" "}
                <a
                  href="/docs/api/authentication"
                  className="text-blue-600 hover:text-blue-700"
                >
                  API Documentation
                </a>
              </li>
              <li>
                •{" "}
                <a
                  href="/docs/applications/creating"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Best Practices
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 flex items-center">
              <FaUsers className="mr-2" />
              Community
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Join our growing community of developers
            </p>
            <ul className="space-y-1 text-sm">
              <li>• GitHub Discussions</li>
              <li>• Discord Community</li>
              <li>• Stack Overflow Tag</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            <FaRocket className="inline mr-2" />
            Ready to Deploy?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Join thousands of developers who trust Kargo for their production
            deployments. Start with our free tier and scale as you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <AnimatedButton
              onClick={() => (window.location.href = "/docs/quick-start")}
              variant="primary"
              className="font-medium"
            >
              Deploy Your First App
            </AnimatedButton>
            <AnimatedButton
              onClick={() => (window.location.href = "/docs/installation")}
              variant="secondary"
              className="font-medium"
            >
              Read Full Documentation
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
