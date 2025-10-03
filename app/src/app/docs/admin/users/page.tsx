"use client";

import {
  FaUsers,
  FaTheaterMasks,
  FaCircle,
  FaCog,
  FaLock,
  FaEnvelope,
  FaClipboardList,
} from "react-icons/fa";
import AnimatedButton from "../../../../components/ui/AnimatedButton/AnimatedButton";

export default function UserManagementPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">User Management</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Comprehensive user and team management with role-based access control,
          single sign-on integration, and audit logging for enterprise security.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
            <FaUsers className="mr-2" />
            Enterprise-Grade Access Control
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            Kargo provides fine-grained access control with support for teams,
            custom roles, and integration with your existing identity providers.
          </p>
        </div>

        <h2>User Roles & Permissions</h2>
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaTheaterMasks className="inline mr-1" /> Built-in Roles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                      <FaCircle className="inline mr-1 text-red-500" />{" "}
                      Organization Owner
                    </h4>
                    <p className="text-red-800 dark:text-red-200 text-sm mb-2">
                      Full administrative access
                    </p>
                    <ul className="text-xs space-y-1 text-red-700 dark:text-red-300">
                      <li>• Manage billing and plans</li>
                      <li>• Add/remove users and teams</li>
                      <li>• Configure organization settings</li>
                      <li>• Access all applications and resources</li>
                      <li>• Audit logs and compliance reports</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                      <FaCircle className="inline mr-1 text-orange-500" />{" "}
                      Administrator
                    </h4>
                    <p className="text-orange-800 dark:text-orange-200 text-sm mb-2">
                      Administrative access without billing
                    </p>
                    <ul className="text-xs space-y-1 text-orange-700 dark:text-orange-300">
                      <li>• Manage users and teams</li>
                      <li>• Configure organization settings</li>
                      <li>• Access all applications</li>
                      <li>• View audit logs</li>
                      <li>• Manage integrations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                      <FaCircle className="inline mr-1 text-green-500" />{" "}
                      Developer
                    </h4>
                    <p className="text-green-800 dark:text-green-200 text-sm mb-2">
                      Full application development access
                    </p>
                    <ul className="text-xs space-y-1 text-green-700 dark:text-green-300">
                      <li>• Create and deploy applications</li>
                      <li>• Manage environment variables</li>
                      <li>• Access logs and metrics</li>
                      <li>• Configure CI/CD pipelines</li>
                      <li>• Collaborate with team members</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      <FaCircle className="inline mr-1 text-blue-500" /> Viewer
                    </h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm mb-2">
                      Read-only access for monitoring
                    </p>
                    <ul className="text-xs space-y-1 text-blue-700 dark:text-blue-300">
                      <li>• View application status</li>
                      <li>• Access logs and metrics</li>
                      <li>• View deployment history</li>
                      <li>• Generate reports</li>
                      <li>• Monitor performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">
              <FaCog className="inline mr-1" /> Custom Roles
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create custom roles with specific permissions tailored to your
              organization&apos;s needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Permission Categories</h4>
                <div className="space-y-2">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                    <h5 className="font-semibold text-sm mb-1">Applications</h5>
                    <div className="text-xs space-y-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked
                          readOnly
                        />
                        <span>Create applications</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked
                          readOnly
                        />
                        <span>Deploy applications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" readOnly />
                        <span>Delete applications</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                    <h5 className="font-semibold text-sm mb-1">Resources</h5>
                    <div className="text-xs space-y-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked
                          readOnly
                        />
                        <span>View metrics</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" readOnly />
                        <span>Modify limits</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example Custom Role</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                  <code>
                    {`{
  "name": "QA Engineer",
  "description": "Testing and quality assurance",
  "permissions": [
    "applications:read",
    "applications:deploy",
    "logs:read",
    "metrics:read",
    "environments:manage",
    "tests:execute"
  ],
  "restrictions": {
    "environments": ["staging", "qa"],
    "applications": ["web-*", "api-*"]
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <h2>Team Management</h2>
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <FaUsers className="mr-2" /> Teams & Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Organize users into teams with shared access to applications and
              resources.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Team Structure</h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                        Frontend Team
                      </h5>
                      <span className="text-xs bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">
                        5 members
                      </span>
                    </div>
                    <p className="text-xs text-blue-800 dark:text-blue-200 mb-2">
                      Responsible for web applications and user interfaces
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                        React
                      </span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                        Next.js
                      </span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                        UI/UX
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-green-900 dark:text-green-100 text-sm">
                        Backend Team
                      </h5>
                      <span className="text-xs bg-green-200 dark:bg-green-800 px-2 py-1 rounded">
                        8 members
                      </span>
                    </div>
                    <p className="text-xs text-green-800 dark:text-green-200 mb-2">
                      APIs, databases, and backend services
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                        Node.js
                      </span>
                      <span className="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                        Python
                      </span>
                      <span className="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                        Database
                      </span>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-purple-900 dark:text-purple-100 text-sm">
                        DevOps Team
                      </h5>
                      <span className="text-xs bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">
                        3 members
                      </span>
                    </div>
                    <p className="text-xs text-purple-800 dark:text-purple-200 mb-2">
                      Infrastructure, CI/CD, and deployment automation
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">
                        Kubernetes
                      </span>
                      <span className="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">
                        Docker
                      </span>
                      <span className="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">
                        CI/CD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Team Permissions</h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <h5 className="font-semibold text-sm mb-2">
                      Application Access
                    </h5>
                    <ul className="text-xs space-y-1">
                      <li>• Teams can be assigned to specific applications</li>
                      <li>• Inherited permissions from team role</li>
                      <li>• Environment-specific access controls</li>
                      <li>• Automatic access for new team members</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <h5 className="font-semibold text-sm mb-2">
                      Resource Sharing
                    </h5>
                    <ul className="text-xs space-y-1">
                      <li>• Shared secrets and configurations</li>
                      <li>• Team-specific resource quotas</li>
                      <li>• Collaborative monitoring dashboards</li>
                      <li>• Team activity logs and notifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2>Single Sign-On (SSO) Integration</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4 flex items-center">
            <FaLock className="mr-2" /> Enterprise Identity Integration
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Integrate with your existing identity providers for seamless
            authentication and user provisioning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3">Supported Providers</h4>
              <div className="space-y-2">
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <FaCircle className="text-blue-600 mr-3 text-xl" />
                  <div>
                    <h5 className="font-semibold text-sm">SAML 2.0</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Enterprise SSO standard
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <FaCircle className="text-green-600 mr-3 text-xl" />
                  <div>
                    <h5 className="font-semibold text-sm">
                      OAuth 2.0 / OpenID Connect
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Modern authentication protocol
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <FaCircle className="text-purple-600 mr-3 text-xl" />
                  <div>
                    <h5 className="font-semibold text-sm">
                      LDAP / Active Directory
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Directory service integration
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Popular Integrations</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                  <span className="text-xs font-semibold">Okta</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                  <span className="text-xs font-semibold">Auth0</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                  <span className="text-xs font-semibold">Azure AD</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                  <span className="text-xs font-semibold">
                    Google Workspace
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                  <span className="text-xs font-semibold">Ping Identity</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-center">
                  <span className="text-xs font-semibold">OneLogin</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              <FaCog className="inline mr-1" /> Automatic User Provisioning
            </h4>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Automatic user creation on first login</li>
              <li>• Role mapping based on identity provider groups</li>
              <li>• Real-time user attribute synchronization</li>
              <li>• Automatic deprovisioning when users are removed</li>
            </ul>
          </div>
        </div>

        <h2>User Invitation & Onboarding</h2>
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <FaEnvelope className="mr-2" /> Invitation Workflow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Invite New Users</h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <h5 className="font-semibold text-sm mb-2">
                      Single Invitation
                    </h5>
                    <div className="space-y-2 text-xs">
                      <input
                        type="email"
                        placeholder="user@company.com"
                        className="w-full p-2 border rounded text-gray-900"
                        readOnly
                      />
                      <select
                        className="w-full p-2 border rounded text-gray-900"
                        disabled
                      >
                        <option>Developer</option>
                        <option>Administrator</option>
                        <option>Viewer</option>
                      </select>
                      <select
                        className="w-full p-2 border rounded text-gray-900"
                        disabled
                      >
                        <option>Frontend Team</option>
                        <option>Backend Team</option>
                        <option>DevOps Team</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <h5 className="font-semibold text-sm mb-2">
                      Bulk Invitation
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Upload CSV file with user details and assignments
                    </p>
                    <div className="text-xs bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                      <code>email,role,team,applications</code>
                      <br />
                      <code>john@company.com,developer,frontend,web-app</code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Onboarding Process</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                      1
                    </div>
                    <span className="text-sm">Email invitation sent</span>
                  </div>

                  <div className="flex items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                      2
                    </div>
                    <span className="text-sm">User clicks invitation link</span>
                  </div>

                  <div className="flex items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                      3
                    </div>
                    <span className="text-sm">
                      Account setup and verification
                    </span>
                  </div>

                  <div className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                      4
                    </div>
                    <span className="text-sm">Guided platform tour</span>
                  </div>

                  <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                      5
                    </div>
                    <span className="text-sm">
                      Access granted to assigned resources
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2>Audit Logging & Compliance</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4 flex items-center">
            <FaClipboardList className="mr-2" /> Activity Monitoring
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Comprehensive audit logging for security, compliance, and
            operational visibility.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Tracked Activities</h4>
              <div className="space-y-2">
                <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                  <span className="text-red-600 text-sm font-semibold">
                    Security Events
                  </span>
                  <ul className="text-xs mt-1 space-y-1">
                    <li>• User login/logout</li>
                    <li>• Permission changes</li>
                    <li>• Failed authentication attempts</li>
                    <li>• API key generation/rotation</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <span className="text-blue-600 text-sm font-semibold">
                    Application Events
                  </span>
                  <ul className="text-xs mt-1 space-y-1">
                    <li>• Application deployments</li>
                    <li>• Configuration changes</li>
                    <li>• Resource modifications</li>
                    <li>• Environment variable updates</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <span className="text-green-600 text-sm font-semibold">
                    Administrative Events
                  </span>
                  <ul className="text-xs mt-1 space-y-1">
                    <li>• User invitations/removals</li>
                    <li>• Team management</li>
                    <li>• Organization settings</li>
                    <li>• Billing changes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Audit Log Example</h4>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <div className="text-xs font-mono space-y-2">
                  <div className="pb-2 border-b border-gray-300 dark:border-gray-600">
                    <span className="text-green-600">2025-01-02 14:30:25</span>{" "}
                    -<span className="text-blue-600"> USER_LOGIN</span>
                    <br />
                    <span className="text-gray-600 dark:text-gray-400">
                      user: john@company.com, ip: 192.168.1.100
                    </span>
                  </div>

                  <div className="pb-2 border-b border-gray-300 dark:border-gray-600">
                    <span className="text-green-600">2025-01-02 14:32:10</span>{" "}
                    -<span className="text-purple-600"> APP_DEPLOY</span>
                    <br />
                    <span className="text-gray-600 dark:text-gray-400">
                      app: web-frontend, version: v2.1.0, user: john@company.com
                    </span>
                  </div>

                  <div className="pb-2 border-b border-gray-300 dark:border-gray-600">
                    <span className="text-green-600">2025-01-02 14:45:33</span>{" "}
                    -<span className="text-orange-600"> PERMISSION_CHANGE</span>
                    <br />
                    <span className="text-gray-600 dark:text-gray-400">
                      target: sarah@company.com, role: developer→admin, by:
                      john@company.com
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  <strong>Retention:</strong> Audit logs are retained for 1 year
                  (configurable)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            <FaUsers className="mr-2" />
            Ready to Manage Your Team?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Kargo&apos;s user management system scales from small teams to large
            enterprises with comprehensive security and compliance features.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <AnimatedButton
              onClick={() => (window.location.href = "/settings/users")}
              variant="primary"
              className="font-medium px-4 py-2"
            >
              Manage Users
            </AnimatedButton>
            <AnimatedButton
              onClick={() => (window.location.href = "/docs/admin/plans")}
              variant="secondary"
              className="font-medium px-4 py-2"
            >
              Plans & Billing
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
