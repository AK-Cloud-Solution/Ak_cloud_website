import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "FinTech Mobile App",
    category: "Mobile App Design",
    description: "Redesigned banking experience that increased user engagement by 150% and reduced task completion time by 40%.",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYyMjc2NzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["iOS", "Android", "Mobile Banking"]
  },
  {
    title: "E-Commerce Platform",
    category: "Web Design",
    description: "Complete UX overhaul of an e-commerce platform resulting in 85% increase in conversion rate.",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYyMzMxMjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["E-Commerce", "Web", "Responsive"]
  },
  {
    title: "Healthcare Dashboard",
    category: "Product Design",
    description: "Intuitive dashboard for healthcare professionals to manage patient data efficiently and securely.",
    image: "https://images.unsplash.com/photo-1683818051102-dd1199d163b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJvZHVjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NjIzMDM2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Healthcare", "Dashboard", "B2B"]
  },
  {
    title: "Social Media App",
    category: "Mobile App Design",
    description: "Creative social platform focused on authentic connections and meaningful interactions.",
    image: "https://images.unsplash.com/photo-1630852722702-3e2ec1eaa751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcmVzZWFyY2glMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjIzMDc1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Social", "Community", "iOS"]
  },
  {
    title: "SaaS Platform",
    category: "Web Application",
    description: "Enterprise design system and interface for a project management SaaS serving 50K+ users.",
    image: "https://images.unsplash.com/photo-1742440710226-450e3b85c100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NjIzMjUwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["SaaS", "Enterprise", "Design System"]
  },
  {
    title: "Educational Platform",
    category: "EdTech",
    description: "Interactive learning platform designed to engage students and improve learning outcomes.",
    image: "https://images.unsplash.com/photo-1721714933699-1a7650a79754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVWCUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjIyODY5MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Education", "Web", "Mobile"]
  }
];

export function Portfolio() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-600 uppercase tracking-wide">Our Work</span>
          <h2 className="mt-2 text-4xl lg:text-5xl text-slate-900">
            Featured Case Studies
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            Explore how we've helped companies transform their digital products and deliver exceptional user experiences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-slate-200"
            >
              <div className="relative overflow-hidden aspect-video">
                <ImageWithFallback 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-indigo-600 mb-2">{project.category}</div>
                <h3 className="text-xl text-slate-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="bg-slate-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
