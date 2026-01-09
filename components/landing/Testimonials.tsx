import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Head of Learning & Development",
    company: "TechCorp Inc.",
    content: "This platform has completely transformed how we deliver training. Our team engagement has skyrocketed, and the analytics help us make data-driven decisions.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "StartupXYZ",
    content: "The ease of use is incredible. We went from concept to live courses in just a few days. The ROI has been outstanding.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Training Manager",
    company: "Global Solutions",
    content: "Best investment we've made in our L&D program. The AI-powered insights have helped us personalize learning like never before.",
    rating: 5,
    avatar: "ER"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Loved by Teams Worldwide
          </h2>
          <p className="text-lg text-gray-600">
            See what our customers are saying about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="mb-4 h-8 w-8 text-blue-600 opacity-50" />
                <p className="mb-6 text-gray-700 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
