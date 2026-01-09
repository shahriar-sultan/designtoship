import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-2 text-sm font-medium text-blue-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></span>
            New: AI-Powered Learning Analytics
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Transform Your Learning Experience with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart LMS Platform
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-xl text-gray-600 sm:text-2xl">
            Empower your team with cutting-edge learning management. 
            Create, deliver, and track courses that drive real results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="group h-14 px-8 text-base font-semibold shadow-lg transition-all hover:shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 text-base font-semibold"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="hidden h-12 w-px bg-gray-300 sm:block"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
            <div className="hidden h-12 w-px bg-gray-300 sm:block"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-1/4 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl"></div>
      <div className="absolute right-1/4 top-40 h-96 w-96 translate-x-1/2 rounded-full bg-purple-400/20 blur-3xl"></div>
    </section>
  );
}
