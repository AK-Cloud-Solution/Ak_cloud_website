import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent)] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full">
                Award-Winning UX Design
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl">
              Crafting Digital Experiences That <span className="text-indigo-600">Delight Users</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-xl">
              We design intuitive, user-centered products that solve real problems and drive business growth through research-driven design thinking.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                View Our Work
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-8 border-t border-slate-200">
              <div>
                <div className="text-3xl text-indigo-600">250+</div>
                <div className="text-slate-600">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl text-indigo-600">98%</div>
                <div className="text-slate-600">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl text-indigo-600">15+</div>
                <div className="text-slate-600">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-20" />
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1721714933699-1a7650a79754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVWCUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjIyODY5MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="UX Design Workspace"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
