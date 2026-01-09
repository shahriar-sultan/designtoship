import { Check } from "lucide-react";

const benefits = [
  "Increase learner engagement by 300%",
  "Reduce training costs by up to 60%",
  "Complete course creation in minutes, not days",
  "Track ROI with comprehensive analytics",
  "Scale from 10 to 10,000 learners effortlessly",
  "Integrate with your existing tools seamlessly"
];

export function Benefits() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of companies that have transformed their learning and development programs with our platform.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Visual/Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
              <div className="text-5xl font-bold text-blue-600 mb-2">300%</div>
              <div className="text-gray-600">Increase in Engagement</div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
              <div className="text-5xl font-bold text-purple-600 mb-2">60%</div>
              <div className="text-gray-600">Cost Reduction</div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
              <div className="text-5xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Learners</div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
              <div className="text-5xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime SLA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
