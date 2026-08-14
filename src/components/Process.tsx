import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Research & Discovery",
    description: "We start by understanding your users, business goals, and competitive landscape through comprehensive research.",
    step: "01"
  },
  {
    icon: PenTool,
    title: "Design & Ideation",
    description: "Creating wireframes, prototypes, and high-fidelity designs that bring your vision to life.",
    step: "02"
  },
  {
    icon: Code2,
    title: "Testing & Iteration",
    description: "Validating designs with real users and refining based on feedback and data.",
    step: "03"
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description: "Supporting implementation and continuously optimizing based on performance metrics.",
    step: "04"
  }
];

export function Process() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-600 uppercase tracking-wide">Our Process</span>
          <h2 className="mt-2 text-4xl lg:text-5xl text-slate-900">
            How We Work
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            A proven, user-centered design process that delivers results every time.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-sm text-indigo-600 tracking-widest mb-2">
                      STEP {step.step}
                    </div>
                    <h3 className="text-xl text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
