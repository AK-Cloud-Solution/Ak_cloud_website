import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Database,
  Server,
  Lock,
  BarChart3,
  FileCode,
  Container,
  Network,
  HardDrive,
  Activity,
  GitBranch,
  Boxes,
  Cloud
} from "lucide-react";

const tools = [
  {
    icon: Database,
    name: "Cloud Database",
    category: "Database",
    description: "Managed relational and NoSQL databases with automatic backups, scaling, and high availability.",
    features: ["PostgreSQL, MySQL, MongoDB", "Automatic backups", "Point-in-time recovery", "Read replicas"],
    pricing: "Starting at $15/mo",
    image: "https://images.unsplash.com/photo-1744865310523-8584c0f85604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMHN0b3JhZ2UlMjBkYXRhYmFzZXxlbnwxfHx8fDE3NjIzNTg5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "text-purple-600 bg-purple-50"
  },
  {
    icon: Server,
    name: "Virtual Machines",
    category: "Compute",
    description: "Scalable virtual servers with SSD storage, flexible configurations, and pay-as-you-go pricing.",
    features: ["Multiple OS options", "Custom configurations", "Auto-scaling", "Load balancing"],
    pricing: "Starting at $5/mo",
    image: "https://images.unsplash.com/flagged/photo-1579274216947-86eaa4b00475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwc2VydmVyc3xlbnwxfHx8fDE3NjIyODc3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "text-blue-600 bg-blue-50"
  },
  {
    icon: Lock,
    name: "Security Suite",
    category: "Security",
    description: "Enterprise-grade security tools including DDoS protection, WAF, and SSL certificates.",
    features: ["DDoS protection", "Web Application Firewall", "SSL/TLS certificates", "Security monitoring"],
    pricing: "Starting at $20/mo",
    image: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NjIyNDg3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "text-red-600 bg-red-50"
  },
  {
    icon: BarChart3,
    name: "Analytics Platform",
    category: "Analytics",
    description: "Real-time analytics and monitoring with customizable dashboards and alerting.",
    features: ["Real-time metrics", "Custom dashboards", "Alert management", "Log aggregation"],
    pricing: "Starting at $25/mo",
    image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIyODY5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "text-green-600 bg-green-50"
  },
  {
    icon: Container,
    name: "Container Service",
    category: "DevOps",
    description: "Kubernetes-powered container orchestration for modern cloud-native applications.",
    features: ["Kubernetes clusters", "Docker support", "CI/CD integration", "Service mesh"],
    pricing: "Starting at $30/mo",
    image: "https://images.unsplash.com/photo-1667984390553-7f439e6ae401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYyMzE4ODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "text-cyan-600 bg-cyan-50"
  },
  {
    icon: HardDrive,
    name: "Object Storage",
    category: "Storage",
    description: "Scalable object storage for backups, media files, and static assets with CDN integration.",
    features: ["Unlimited scalability", "CDN integration", "Versioning", "S3 compatible"],
    pricing: "Starting at $0.02/GB",
    image: "https://images.unsplash.com/photo-1744865310523-8584c0f85604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMHN0b3JhZ2UlMjBkYXRhYmFzZXxlbnwxfHx8fDE3NjIzNTg5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "text-orange-600 bg-orange-50"
  }
];

const additionalTools = [
  { icon: Network, name: "VPC Networking", description: "Private network infrastructure" },
  { icon: Activity, name: "Monitoring", description: "24/7 infrastructure monitoring" },
  { icon: GitBranch, name: "CI/CD Pipeline", description: "Automated deployment workflows" },
  { icon: Boxes, name: "Backup Service", description: "Automated backup solutions" },
  { icon: FileCode, name: "API Gateway", description: "Manage and secure your APIs" },
  { icon: Cloud, name: "CDN", description: "Global content delivery network" }
];

export function Tools() {
  return (
    <section id="tools" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 uppercase tracking-wide">Our Tools & Services</span>
          <h2 className="mt-2 text-4xl lg:text-5xl text-slate-900 dark:text-slate-100">
            Complete Cloud Infrastructure Suite
          </h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Everything you need to build, deploy, and scale your applications in the cloud.
          </p>
        </div>

        {/* Main Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-slate-200 dark:border-slate-800 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-white text-slate-900">
                    {tool.category}
                  </Badge>
                </div>

                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-2xl text-slate-900 dark:text-slate-100 mb-2">
                    {tool.name}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {tool.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="text-blue-600 mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-slate-900 dark:text-slate-100">{tool.pricing}</span>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Tools */}
        <div>
          <h3 className="text-3xl text-center text-slate-900 dark:text-slate-100 mb-8">Additional Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg text-slate-900 dark:text-slate-100 mb-1">{tool.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{tool.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="p-12 bg-gradient-to-br from-blue-600 to-cyan-600 border-0">
            <h3 className="text-3xl text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your 30-day free trial today. No credit card required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
