import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Video, Lock } from "lucide-react";
import { Button } from "./ui/button";

export function UserDashboard() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-blue-600 mb-4">User Dashboard</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Your personalized workspace. Access your authorized applications below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Zoom - Accessible */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200"
            onClick={() => window.open('https://zoom.us', '_blank')}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="bg-blue-500 p-3 rounded-lg text-white group-hover:scale-110 transition-transform">
                  <Video className="h-6 w-6" />
                </div>
              </div>
              <CardTitle className="mt-4">Zoom</CardTitle>
              <CardDescription>Video conferencing and meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Launch Zoom
              </Button>
            </CardContent>
          </Card>

          {/* Locked Applications */}
          {[
            "Slack",
            "Azure DevOps",
            "Jira Board",
            "Dashboards",
            "Tailgate",
          ].map((appName, index) => (
            <Card 
              key={index}
              className="opacity-60 border-2 border-slate-200 bg-slate-50"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="bg-slate-400 p-3 rounded-lg text-white">
                    <Lock className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="mt-4 text-slate-500">{appName}</CardTitle>
                <CardDescription className="text-slate-400">
                  Access restricted - Admin only
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-400">
                  🔒 Requires admin access
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-amber-900 mb-2">User Access Level</h3>
          <p className="text-slate-600 text-sm">
            You currently have user-level access. You can use Zoom for video conferencing and meetings. 
            For access to additional applications, please contact your administrator.
          </p>
        </div>
      </div>
    </section>
  );
}
