import { generatePageMetadata } from "../../../../lib/metadata";

const title = "AI-Powered Setup";
const description =
  "Discover how Kargo's AI features help optimize and automate your application deployments.";

export const metadata = generatePageMetadata({
  title,
  description,
  path: "/docs/features/ai-setup",
  imageAlt: "Kargo AI-Powered Setup",
});

export default function AISetupPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">AI-Powered Setup</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Kargo&apos;s AI features help you optimize configurations, automate
          deployments, and follow best practices.
        </p>

        <h2>Automated Dockerization</h2>
        <p>
          Kargo can automatically generate Docker configurations for your
          projects:
        </p>
        <ul>
          <li>Analyzes your codebase and dependencies</li>
          <li>Generates optimized Dockerfiles</li>
          <li>Suggests multi-stage builds for production</li>
          <li>Recommends security best practices</li>
        </ul>

        <h2>Resource Optimization</h2>
        <p>AI-powered resource allocation ensures optimal performance:</p>
        <ul>
          <li>Automatic CPU and memory recommendations</li>
          <li>Storage optimization based on application type</li>
          <li>Scaling suggestions for traffic patterns</li>
          <li>Cost optimization recommendations</li>
        </ul>

        <h2>Configuration Intelligence</h2>
        <p>Smart configuration suggestions help you avoid common pitfalls:</p>
        <ul>
          <li>Environment variable recommendations</li>
          <li>Security policy suggestions</li>
          <li>Performance tuning advice</li>
          <li>Health check configurations</li>
        </ul>

        <h2>Using the Dockerize Feature</h2>
        <ol>
          <li>Browse your GitHub repositories</li>
          <li>Click the &quot;Dockerize&quot; button on any repository</li>
          <li>Wait for AI analysis to complete</li>
          <li>Review and customize the generated configuration</li>
          <li>Deploy with one click</li>
        </ol>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
            🤖 AI Features
          </h3>
          <p className="text-purple-800 dark:text-purple-200">
            Kargo&apos;s AI is continuously learning and improving. The more you
            use it, the better it becomes at understanding your preferences and
            requirements.
          </p>
        </div>

        <h2>Supported Frameworks</h2>
        <p>Kargo&apos;s AI recognizes and optimizes for popular frameworks:</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4>Frontend</h4>
            <ul>
              <li>React</li>
              <li>Next.js</li>
              <li>Vue.js</li>
              <li>Angular</li>
            </ul>
          </div>
          <div>
            <h4>Backend</h4>
            <ul>
              <li>Node.js</li>
              <li>Python</li>
              <li>Go</li>
              <li>Java</li>
            </ul>
          </div>
        </div>

        <h2>Smart Deployment Suggestions</h2>
        <p>
          AI analyzes your application to suggest optimal deployment strategies:
        </p>

        <h3>Application Analysis</h3>
        <ul>
          <li>Code complexity analysis</li>
          <li>Dependency scanning</li>
          <li>Performance pattern recognition</li>
          <li>Security vulnerability detection</li>
        </ul>

        <h3>Deployment Recommendations</h3>
        <ul>
          <li>Optimal replica counts</li>
          <li>Resource allocation suggestions</li>
          <li>Health check configurations</li>
          <li>Scaling policies</li>
        </ul>

        <h2>Continuous Learning</h2>
        <p>Kargo&apos;s AI system continuously improves through:</p>
        <ul>
          <li>Deployment success/failure analysis</li>
          <li>Performance metric correlation</li>
          <li>User feedback integration</li>
          <li>Industry best practice updates</li>
        </ul>
      </div>
    </div>
  );
}
