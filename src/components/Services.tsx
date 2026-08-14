import { Card } from "./ui/card";
import { Lightbulb, Palette, Code, Users, BarChart, Smartphone } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "User Research",
    description: "Deep dive into user behavior, needs, and pain points through interviews, surveys, and usability testing.",
    color: "text-yellow-600 bg-yellow-50"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that balance aesthetics with functionality and accessibility.",
    color: "text-pink-600 bg-pink-50"
  },
  {
    icon: Users,
    title: "User Testing",
    description: "Validate designs with real users to ensure optimal usability and user satisfaction.",
    color: "text-blue-600 bg-blue-50"
  },
  {
    icon: Smartphone,
    title: "Mobile Design",
    description: "Native iOS and Android app designs optimized for touch interactions and mobile contexts.",
    color: "text-green-600 bg-green-50"
  },
  {
    icon: Code,
    title: "Design Systems",
    description: "Scalable design systems that ensure consistency across all your digital products.",
    color: "text-purple-600 bg-purple-50"
  },
  {
    icon: BarChart,
    title: "Analytics & Optimization",
    description: "Data-driven insights to continuously improve user experience and conversion rates.",
    color: "text-orange-600 bg-orange-50"
  }
];

export function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-600 uppercase tracking-wide">Our Services</span>
          <h2 className="mt-2 text-4xl lg:text-5xl text-slate-900">
            End-to-End UX Design Solutions
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            From initial research to final implementation, we provide comprehensive design services tailored to your needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="p-8 hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-indigo-300"
              >
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
