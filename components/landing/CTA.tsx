import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of companies already using our platform to deliver exceptional learning experiences.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              variant="secondary"
              className="h-14 px-8 text-base font-semibold bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 px-8 text-base font-semibold border-2 border-white text-white hover:bg-white/10"
            >
              Schedule a Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
