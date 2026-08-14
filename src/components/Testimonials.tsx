import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    avatar: "SJ",
    content: "The team's attention to detail and user-centered approach transformed our product. Our user engagement increased by 200% within the first month of launch.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Product Manager, FinanceHub",
    avatar: "MC",
    content: "Outstanding work! They didn't just design our app, they helped us understand our users better. The research phase was invaluable.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, HealthTech Pro",
    avatar: "ER",
    content: "Professional, creative, and efficient. They delivered a design system that has become the foundation of all our digital products.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-200 uppercase tracking-wide">Testimonials</span>
          <h2 className="mt-2 text-4xl lg:text-5xl text-white">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-6 text-white/90">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-indigo-500 text-white">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white">{testimonial.name}</div>
                  <div className="text-sm text-indigo-200">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
