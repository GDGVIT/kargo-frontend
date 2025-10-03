"use client";

import {
  FaSync,
  FaBolt,
  FaGlobe,
  FaBullseye,
  FaCog,
  FaWrench,
  FaChartBar,
  FaRocket,
  FaExclamationTriangle,
  FaLock,
  FaCircle,
  FaRobot,
  FaCheck,
} from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";
import AnimatedButton from "../../../../components/ui/AnimatedButton/AnimatedButton";

export default function KubernetesPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Kubernetes Management</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Kargo provides a powerful abstraction layer over Kubernetes, making
          container orchestration accessible while exposing advanced features
          for production-grade deployments.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
            <SiKubernetes className="mr-2" />
            Kubernetes-Native Architecture
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            Kargo is built from the ground up as a Kubernetes-native platform,
            ensuring your applications benefit from production-grade container
            orchestration, automatic scaling, and enterprise security.
          </p>
        </div>

        <h2>Core Kubernetes Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 className="font-semibold mb-3 flex items-center">
              <FaSync className="text-green-500 mr-2" />
              Auto-Scaling
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                • <strong>Horizontal Pod Autoscaler (HPA)</strong> - Scale pods
                based on CPU, memory, or custom metrics
              </li>
              <li>
                • <strong>Vertical Pod Autoscaler (VPA)</strong> - Right-size
                container resources automatically
              </li>
              <li>
                • <strong>Cluster Autoscaler</strong> - Add/remove nodes based
                on demand
              </li>
              <li>
                • <strong>Custom Metrics</strong> - Scale based on
                application-specific metrics
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 className="font-semibold mb-3 flex items-center">
              <FaBolt className="text-blue-500 mr-2" />
              High Availability
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                • <strong>Multi-Zone Deployment</strong> - Distribute pods
                across availability zones
              </li>
              <li>
                • <strong>Pod Disruption Budgets</strong> - Maintain
                availability during updates
              </li>
              <li>
                • <strong>Health Checks</strong> - Automatic liveness and
                readiness probes
              </li>
              <li>
                • <strong>Rolling Updates</strong> - Zero-downtime deployments
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 className="font-semibold mb-3 flex items-center">
              <FaLock className="text-purple-500 mr-2" />
              Security & Compliance
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                • <strong>RBAC Integration</strong> - Role-based access control
              </li>
              <li>
                • <strong>Network Policies</strong> - Micro-segmentation for
                pods
              </li>
              <li>
                • <strong>Pod Security Standards</strong> - Enforce security
                policies
              </li>
              <li>
                • <strong>Secrets Management</strong> - Encrypted configuration
                storage
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 className="font-semibold mb-3 flex items-center">
              <FaGlobe className="text-orange-500 mr-2" />
              Service Mesh Ready
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                • <strong>Istio Integration</strong> - Advanced traffic
                management
              </li>
              <li>
                • <strong>mTLS</strong> - Automatic mutual TLS between services
              </li>
              <li>
                • <strong>Circuit Breaking</strong> - Fault tolerance patterns
              </li>
              <li>
                • <strong>Distributed Tracing</strong> - Request flow
                visualization
              </li>
            </ul>
          </div>
        </div>

        <h2>Deployment Strategies</h2>
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaSync className="inline mr-1" /> Rolling Updates (Default)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Gradually replace old pods with new ones, ensuring zero downtime
              during deployments.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm">
              <code>
                {`# Kargo automatically configures rolling updates
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 25%        # Extra pods during update
    maxUnavailable: 25%  # Max pods that can be unavailable`}
              </code>
            </pre>
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="text-green-800 dark:text-green-200 text-sm">
                <strong>Best for:</strong> Production applications requiring
                high availability
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <FaCircle className="text-blue-500 mr-2" /> Blue-Green Deployments
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Deploy to a parallel environment, then switch traffic instantly
              for minimal risk deployments.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm">
              <code>
                {`# Enable blue-green deployment in Kargo
deployment:
  strategy: "blue-green"
  blueGreen:
    autoPromotionEnabled: false
    scaleDownDelaySeconds: 30
    prePromotionAnalysis:
      templates:
      - templateName: success-rate`}
              </code>
            </pre>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Best for:</strong> Critical applications where rollback
                speed is essential
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaBullseye className="inline mr-1" /> Canary Deployments
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Gradually shift traffic to new version while monitoring metrics
              and automatically rollback if issues are detected.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm">
              <code>
                {`# Configure canary deployment
deployment:
  strategy: "canary"
  canary:
    steps:
    - setWeight: 10    # Start with 10% traffic
    - pause: {duration: 5m}
    - setWeight: 25    # Increase to 25%
    - pause: {duration: 10m}
    - setWeight: 50    # Half traffic
    - pause: {duration: 15m}`}
              </code>
            </pre>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>Best for:</strong> Testing new features with real
                traffic while minimizing impact
              </p>
            </div>
          </div>
        </div>

        <h2>Resource Management</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4">
            <FaCog className="inline mr-1" /> Intelligent Resource Allocation
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Kargo&apos;s AI analyzes your application to recommend optimal
            resource configurations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">CPU & Memory Requests</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                <code>
                  {`# Auto-generated resource configuration
resources:
  requests:
    cpu: 100m      # Minimum guaranteed
    memory: 256Mi
  limits:
    cpu: 500m      # Maximum allowed
    memory: 512Mi`}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Storage & Networking</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                <code>
                  {`# Persistent storage configuration
volumeClaimTemplates:
- metadata:
    name: app-data
  spec:
    accessModes: ["ReadWriteOnce"]
    resources:
      requests:
        storage: 10Gi`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h5 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              <FaRobot className="mr-2" />
              AI-Powered Optimization
            </h5>
            <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
              <li>• Analyzes application type and framework requirements</li>
              <li>• Monitors runtime metrics to suggest optimizations</li>
              <li>• Automatically adjusts limits based on usage patterns</li>
              <li>• Provides cost optimization recommendations</li>
            </ul>
          </div>
        </div>

        <h2>Monitoring & Observability</h2>
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaChartBar className="inline mr-1" /> Built-in Monitoring Stack
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold mb-2">Prometheus</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Metrics collection and alerting
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Custom application metrics</li>
                  <li>• Resource usage tracking</li>
                  <li>• SLA monitoring</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold mb-2">Grafana</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Visualization and dashboards
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Pre-built dashboards</li>
                  <li>• Custom visualization</li>
                  <li>• Alerting rules</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold mb-2">Jaeger</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Distributed tracing
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Request flow tracking</li>
                  <li>• Performance bottlenecks</li>
                  <li>• Dependency mapping</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>Advanced Kubernetes Features</h2>
        <div className="space-y-4 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <FaWrench className="text-blue-500 mr-2" />
              Custom Resource Definitions (CRDs)
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Kargo extends Kubernetes with custom resources for advanced
              application management.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
              <code>
                {`# Example: KargoApplication CRD
apiVersion: kargo.dev/v1
kind: KargoApplication
metadata:
  name: my-web-app
spec:
  source:
    git:
      url: https://github.com/user/app.git
      branch: main
  build:
    dockerfile: Dockerfile
  deployment:
    replicas: 3
    strategy: rolling-update`}
              </code>
            </pre>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <FaBullseye className="text-green-500 mr-2" />
              Operators & Controllers
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Automated application lifecycle management with custom Kubernetes
              operators.
            </p>
            <ul className="space-y-1 text-sm">
              <li>
                • <strong>Application Operator</strong> - Manages app
                deployments and updates
              </li>
              <li>
                • <strong>Build Operator</strong> - Handles container image
                building
              </li>
              <li>
                • <strong>Scaling Operator</strong> - Intelligent auto-scaling
                decisions
              </li>
              <li>
                • <strong>Backup Operator</strong> - Automated data backup and
                recovery
              </li>
            </ul>
          </div>
        </div>

        <h2>Multi-Cluster Management</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4">
            <FaGlobe className="mr-2" />
            Global Application Deployment
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Deploy applications across multiple Kubernetes clusters for global
            reach and disaster recovery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Cluster Federation</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Multi-Region Deployment</strong> - Deploy to
                  clusters worldwide
                </li>
                <li>
                  • <strong>Traffic Routing</strong> - Intelligent load
                  balancing
                </li>
                <li>
                  • <strong>Failover</strong> - Automatic disaster recovery
                </li>
                <li>
                  • <strong>Data Replication</strong> - Cross-cluster data sync
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Configuration Management</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>GitOps Workflow</strong> - Declarative cluster
                  management
                </li>
                <li>
                  • <strong>Policy Enforcement</strong> - Consistent security
                  policies
                </li>
                <li>
                  • <strong>Compliance Monitoring</strong> - Audit and
                  governance
                </li>
                <li>
                  • <strong>Cost Optimization</strong> - Multi-cloud cost
                  management
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Best Practices</h2>
        <div className="space-y-4 mb-8">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              <FaCheck className="mr-2" />
              Recommended Practices
            </h4>
            <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
              <li>
                • Use resource requests and limits to ensure predictable
                performance
              </li>
              <li>
                • Implement proper health checks for all application containers
              </li>
              <li>• Configure Pod Disruption Budgets for high availability</li>
              <li>• Use namespaces to organize and isolate applications</li>
              <li>
                • Enable monitoring and logging for all deployed applications
              </li>
              <li>
                • Regularly update Kubernetes and node images for security
              </li>
              <li>• Use secrets for sensitive configuration data</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              <FaExclamationTriangle className="inline mr-1" /> Common Pitfalls
              to Avoid
            </h4>
            <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
              <li>
                • Don&apos;t run containers as root unless absolutely necessary
              </li>
              <li>• Avoid using latest tags in production deployments</li>
              <li>
                • Don&apos;t skip resource limits - they prevent resource
                starvation
              </li>
              <li>• Avoid storing state in container filesystems</li>
              <li>• Don&apos;t expose unnecessary ports or services</li>
              <li>• Avoid tight coupling between microservices</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            <FaRocket className="inline mr-1" /> Ready to Deploy on Kubernetes?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Kargo abstracts away Kubernetes complexity while giving you access
            to powerful orchestration features when you need them.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <AnimatedButton
              onClick={() => (window.location.href = "/docs/quick-start")}
              variant="primary"
              className="font-medium px-4 py-2"
            >
              Deploy Your First App
            </AnimatedButton>
            <AnimatedButton
              onClick={() =>
                (window.location.href = "/docs/applications/configuration")
              }
              variant="secondary"
              className="font-medium px-4 py-2"
            >
              Advanced Configuration
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
