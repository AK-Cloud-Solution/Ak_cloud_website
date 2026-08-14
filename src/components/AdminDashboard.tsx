import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  MessageSquare, 
  Video, 
  ShieldCheck, 
  Puzzle, 
  GitBranch, 
  KanbanSquare,
  BarChart3,
  ExternalLink
} from "lucide-react";

const applications = [
  {
    name: "Slack",
    description: "Team collaboration and messaging platform",
    icon: MessageSquare,
    url: "https://slack.com",
    color: "bg-purple-500",
  },
  {
    name: "Zoom",
    description: "Video conferencing and meetings",
    icon: Video,
    url: "https://zoom.us",
    color: "bg-blue-500",
  },
  {
    name: "Tailscale",
    description: "Security and access management",
    icon: ShieldCheck,
    url: "https://tailscale.com",
    color: "bg-green-500",
  },
  {
    name: "Parsec",
    description: "Remote desktop and gaming",
    icon: Puzzle,
    url: "https://parsec.app",
    color: "bg-pink-500",
  },
  {
    name: "Azure DevOps",
    description: "CI/CD and DevOps platform",
    icon: GitBranch,
    url: "https://dev.azure.com",
    color: "bg-blue-600",
  },
  {
    name: "Jira Board",
    description: "Project management and issue tracking",
    icon: KanbanSquare,
    url: "https://atlassian.com/software/jira",
    color: "bg-indigo-500",
  },
  {
    name: "Dashboards",
    description: "Analytics and reporting dashboards",
    icon: BarChart3,
    url: "https://grafana.com",
    color: "bg-orange-500",
  },
];

export function AdminDashboard() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-blue-600 mb-4">Admin Dashboard</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Access all applications and tools. Manage your DevOps infrastructure with comprehensive access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200"
                onClick={() => window.open(app.url, '_blank')}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`${app.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="mt-4">{app.name}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-blue-600 group-hover:text-blue-700">
                    Launch Application →
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-blue-900 mb-2">Admin Access Level</h3>
          <p className="text-slate-600 text-sm">
            You have full administrative access to all applications and services. Use these tools to manage your DevOps operations, collaborate with your team, and monitor your infrastructure.
          </p>
        </div>
      </div>
    </section>
  );
}
