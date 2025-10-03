"use client";

import Link from "next/link";
import {
  FaClock,
  FaCheck,
  FaFileAlt,
  FaLightbulb,
  FaGithub,
  FaSearch,
  FaRocket,
  FaBuilding,
  FaComments,
  FaRobot,
  FaGlobe,
  FaChartBar,
  FaSync,
  FaChartLine,
  FaWrench,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import AnimatedButton from "../../../components/ui/AnimatedButton/AnimatedButton";

export default function QuickStartPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Quick Start Guide</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Deploy your first application on Kargo in under 5 minutes. This guide
          will walk you through deploying a sample Node.js application from
          GitHub to production.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
            <FaClock className="mr-2" />
            Estimated Time: 5 minutes
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            By the end of this guide, you&apos;ll have a live application
            running on Kargo with HTTPS, monitoring, and automatic scaling
            configured.
          </p>
        </div>

        <h2>What You&apos;ll Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              Required
            </h4>
            <ul className="space-y-1 text-sm">
              <li>• GitHub account</li>
              <li>• A repository with your application code</li>
              <li>• Basic knowledge of your application&apos;s requirements</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <FaFileAlt className="text-yellow-500 mr-2" />
              Optional but Helpful
            </h4>
            <ul className="space-y-1 text-sm">
              <li>• Dockerfile in your repository</li>
              <li>• Environment variables list</li>
              <li>• Custom domain name</li>
            </ul>
          </div>
        </div>

        <h2>Step 1: Create Your Kargo Account</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                1
              </span>
              <div>
                <p className="font-medium">Visit the sign-up page</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Navigate to{" "}
                  <a href="/auth" className="text-blue-600 hover:text-blue-700">
                    kargo.dscvit.com/auth
                  </a>{" "}
                  and click &quot;Sign Up&quot;
                </p>
              </div>
            </li>

            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                2
              </span>
              <div>
                <p className="font-medium">Choose your authentication method</p>
                <div className="mt-2 space-y-2">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                    <p className="font-medium text-sm">
                      <FaGithub className="inline mr-1" /> GitHub (Recommended)
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Seamless repository access and automatic permissions
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                    <p className="font-medium text-sm">
                      <FaSearch className="inline mr-1" /> Google
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Quick setup with Google account integration
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                3
              </span>
              <div>
                <p className="font-medium">Complete onboarding</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Answer a few questions about your use case to personalize your
                  experience
                </p>
              </div>
            </li>
          </ol>
        </div>

        <h2>Step 2: Prepare Your Application</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <div className="mb-4">
            <h4 className="font-semibold mb-2">
              Option A: Use Your Existing Repository
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              If you have a project ready, make sure it includes:
            </p>
            <ul className="space-y-1 text-sm ml-4">
              <li>• Application code that runs in a container</li>
              <li>• A Dockerfile (or we&apos;ll generate one with AI)</li>
              <li>• A port that your application listens on</li>
            </ul>
          </div>
        </div>

        <h2>Step 3: Deploy Your Application</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <ol className="space-y-6">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                1
              </span>
              <div className="flex-1">
                <p className="font-medium">Navigate to Applications</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-3">
                  From your dashboard, click{" "}
                  <Link
                    href="/applications/add"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    &quot;Add Application&quot;
                  </Link>{" "}
                  or use the &quot;+&quot; button
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <FaLightbulb className="inline mr-1" /> You&apos;ll see
                    options for GitHub, Docker Registry, or manual configuration
                  </p>
                </div>
              </div>
            </li>

            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                2
              </span>
              <div className="flex-1">
                <p className="font-medium">Connect your GitHub repository</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-3">
                  Click &quot;Deploy from GitHub&quot; and authorize Kargo to
                  access your repositories
                </p>
                <div className="space-y-2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                    <p className="text-sm">
                      <strong>Select Repository:</strong> Choose from your list
                      of repositories
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                    <p className="text-sm">
                      <strong>Choose Branch:</strong> Usually &quot;main&quot;
                      or &quot;master&quot;
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                    <p className="text-sm">
                      <strong>Auto-Detection:</strong> Kargo will scan for
                      Dockerfile and suggest configuration
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                3
              </span>
              <div className="flex-1">
                <p className="font-medium">Configure with AI assistance</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-3">
                  Let Kargo&apos;s AI analyze your code and suggest optimal
                  settings
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-900 dark:text-purple-100 mb-2 flex items-center">
                    <FaRobot className="mr-2" />
                    AI will automatically configure:
                  </h5>
                  <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
                    <li>• Application name and description</li>
                    <li>• Resource requirements (CPU, memory)</li>
                    <li>• Environment variables detection</li>
                    <li>• Port configuration</li>
                    <li>• Health check endpoints</li>
                    <li>• Scaling parameters</li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                4
              </span>
              <div className="flex-1">
                <p className="font-medium">Review and deploy</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-3">
                  Verify the configuration and click &quot;Deploy
                  Application&quot;
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <FaRocket className="inline mr-1" /> Deployment typically
                    takes 2-3 minutes for most applications
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </div>

        <h2>Step 4: Monitor Your Deployment</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <p className="mb-4">
            Watch your application come to life in real-time:
          </p>

          <div className="space-y-4">
            <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm">Building container image...</span>
            </div>

            <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm">
                Deploying to Kubernetes cluster...
              </span>
            </div>

            <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm">
                <FaCheck className="inline mr-1" /> Application is live!
              </span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h5 className="font-semibold mb-2">Your application will have:</h5>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <FaGlobe className="mr-2 text-blue-500" /> Public HTTPS URL
                (e.g., https://your-app-abc123.kargo.app)
              </li>
              <li className="flex items-center">
                <FaChartBar className="mr-2 text-blue-500" /> Real-time
                monitoring dashboard
              </li>
              <li>
                • <FaFileAlt className="inline mr-1" /> Live application logs
              </li>
              <li className="flex items-center">
                <FaSync className="mr-2 text-blue-500" /> Automatic health
                checks
              </li>
              <li className="flex items-center">
                <FaChartLine className="mr-2 text-blue-500" /> Performance
                metrics
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center">
            <HiSparkles className="mr-2" />
            Congratulations! Your App is Live
          </h3>
          <p className="text-green-800 dark:text-green-200 mb-4">
            Your application is now running on production-grade infrastructure
            with automatic scaling, monitoring, and HTTPS enabled by default.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <h6 className="font-semibold text-sm mb-1 flex items-center">
                <FaGlobe className="mr-1" /> Access Your App
              </h6>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Click the generated URL to see your live application
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <h6 className="font-semibold text-sm mb-1 flex items-center">
                <FaChartBar className="mr-1" /> View Metrics
              </h6>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Monitor performance, requests, and resource usage
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <h6 className="font-semibold text-sm mb-1">
                <FaFileAlt className="inline mr-1" /> Check Logs
              </h6>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Debug issues with real-time application logs
              </p>
            </div>
          </div>
        </div>

        <h2>What&apos;s Next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 className="font-semibold mb-3 flex items-center">
              <FaWrench className="mr-2" /> Level Up Your Deployment
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/docs/applications/configuration"
                  className="text-blue-600 hover:text-blue-700"
                >
                  • Advanced Configuration Options
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/applications/environment"
                  className="text-blue-600 hover:text-blue-700"
                >
                  • Environment Variables & Secrets
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/applications/deployment"
                  className="text-blue-600 hover:text-blue-700"
                >
                  • Custom Domains & SSL
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/features/ai-setup"
                  className="text-blue-600 hover:text-blue-700"
                >
                  • AI-Powered Optimization
                </Link>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 className="font-semibold mb-3">
              <FaBuilding className="inline mr-1" /> Production Ready Features
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/docs/features/github"
                  className="text-blue-600 hover:text-blue-700"
                >
                  • Automated CI/CD Pipelines
                </Link>
              </li>
              <li>
                <a
                  href="/docs/admin/resources"
                  className="text-blue-600 hover:text-blue-700"
                >
                  • Resource Management & Scaling
                </a>
              </li>
              <li>
                <a
                  href="/docs/features/kubernetes"
                  className="text-blue-600 hover:text-blue-700"
                >
                  • Kubernetes Advanced Features
                </a>
              </li>
              <li>
                <Link
                  href="/docs/api/applications"
                  className="text-blue-600 hover:text-blue-700"
                >
                  • API Integration & Automation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            <FaComments className="inline mr-1" /> Need Help?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-3">
            Join our community or reach out if you encounter any issues during
            deployment.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnimatedButton
              onClick={() => window.open("https://discord.gg/kargo", "_blank")}
              variant="primary"
              className="text-sm px-3 py-1"
            >
              Discord Community
            </AnimatedButton>
            <AnimatedButton
              onClick={() =>
                window.open(
                  "https://github.com/kargo-dev/kargo/discussions",
                  "_blank"
                )
              }
              variant="secondary"
              className="text-sm px-3 py-1"
            >
              GitHub Discussions
            </AnimatedButton>
            <AnimatedButton
              onClick={() => (window.location.href = "/support")}
              variant="secondary"
              className="text-sm px-3 py-1"
            >
              Support Center
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
