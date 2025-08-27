import { generatePageMetadata } from "../../../lib/metadata";
import Link from "next/link";

const title = "Quick Start Guide";
const description =
  "Get started with Kargo in minutes. Deploy your first application with our step-by-step guide.";

export const metadata = generatePageMetadata({
  title,
  description,
  path: "/docs/quick-start",
  imageAlt: "Kargo Quick Start Guide",
});

export default function QuickStartPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Quick Start Guide</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Deploy your first application on Kargo in just a few steps.
        </p>

        <h2>Prerequisites</h2>
        <ul>
          <li>A GitHub account</li>
          <li>A Docker image or repository with a Dockerfile</li>
          <li>Basic understanding of containerized applications</li>
        </ul>

        <h2>Step 1: Sign Up and Authenticate</h2>
        <ol>
          <li>
            Visit the <a href="/auth">authentication page</a>
          </li>
          <li>Sign in with your GitHub or Google account</li>
          <li>Complete the onboarding process</li>
        </ol>

        <h2>Step 2: Connect Your GitHub Repository</h2>
        <ol>
          <li>
            Navigate to the{" "}
            <Link href="/applications/add">Add Application</Link> page
          </li>
          <li>Click &quot;Connect with GitHub&quot;</li>
          <li>Select the repository containing your application</li>
          <li>Grant necessary permissions</li>
        </ol>

        <h2>Step 3: Configure Your Application</h2>
        <ol>
          <li>Choose your application name and description</li>
          <li>Select the Docker image or let Kargo build from source</li>
          <li>Configure environment variables if needed</li>
          <li>Set resource limits (CPU, memory, storage)</li>
        </ol>

        <h2>Step 4: Deploy</h2>
        <ol>
          <li>Review your configuration</li>
          <li>Click &quot;Save and Deploy&quot;</li>
          <li>Monitor the deployment process in real-time</li>
          <li>Access your application via the provided URL</li>
        </ol>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
            🎉 Congratulations!
          </h3>
          <p className="text-green-800 dark:text-green-200">
            Your application is now live on Kargo. You can view logs, monitor
            performance, and make updates through the dashboard.
          </p>
        </div>

        <h2>Next Steps</h2>
        <ul>
          <li>
            <a href="/docs/applications/configuration">
              Learn about advanced configuration options
            </a>
          </li>
          <li>
            <a href="/docs/features/ai-setup">
              Explore AI-powered setup features
            </a>
          </li>
          <li>
            <Link href="/logs">Monitor your application logs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
