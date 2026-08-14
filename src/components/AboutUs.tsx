import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Target, Award, Users, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Clients", value: "10,000+" },
  { icon: Award, label: "Industry Awards", value: "25+" },
  { icon: TrendingUp, label: "Growth Rate", value: "300%" },
  { icon: Target, label: "Success Rate", value: "99.9%" }
];

const values = [
  {
    title: "Innovation First",
    description: "We constantly push boundaries to deliver cutting-edge cloud solutions that drive business transformation.",
    icon: "🚀"
  },
  {
    title: "Security Focused",
    description: "Enterprise-grade security is at the core of everything we build, ensuring your data is always protected.",
    icon: "🔒"
  },
  {
    title: "Customer Centric",
    description: "Your success is our success. We provide 24/7 support and dedicated account management.",
    icon: "💙"
  },
  {
    title: "Scalable Solutions",
    description: "From startups to enterprises, our infrastructure grows with your business needs.",
    icon: "📈"
  }
];

export function AboutUs() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 uppercase tracking-wide">About AK Cloud Solutions</span>
          <h2 className="mt-2 text-4xl lg:text-5xl text-slate-900 dark:text-slate-100">
            Empowering Businesses with Cloud Excellence
          </h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Since 2015, we've been pioneering cloud solutions that transform how businesses operate, scale, and innovate.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative order-2 lg:order-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1690264460165-0ff5e1063d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjIyNjcyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Team Collaboration"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <h3 className="text-3xl text-slate-900 dark:text-slate-100 mb-4">Our Mission</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                To democratize enterprise-grade cloud infrastructure and make advanced technology accessible to businesses of all sizes. We believe that every organization deserves world-class tools to compete in the digital economy.
              </p>
            </div>

            <div>
              <h3 className="text-3xl text-slate-900 dark:text-slate-100 mb-4">Our Vision</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                To be the world's most trusted cloud solutions provider, known for innovation, reliability, and exceptional customer success. We're building the infrastructure that powers tomorrow's digital experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl text-center text-slate-900 dark:text-slate-100 mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl text-slate-900 dark:text-slate-100 mb-3">{value.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Image */}
        <div className="relative rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/flagged/photo-1579274216947-86eaa4b00475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwc2VydmVyc3xlbnwxfHx8fDE3NjIyODc3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Data Center Infrastructure"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-cyan-900/90 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h3 className="text-4xl mb-4">World-Class Infrastructure</h3>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Our global network of data centers ensures your applications run fast, secure, and reliable 24/7/365
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
