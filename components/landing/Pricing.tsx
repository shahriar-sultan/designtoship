import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "per month",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 50 learners",
      "10 courses",
      "Basic analytics",
      "Email support",
      "Mobile app access",
      "Certificate generation"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "per month",
    description: "Ideal for growing businesses",
    features: [
      "Up to 500 learners",
      "Unlimited courses",
      "Advanced analytics",
      "Priority support",
      "Mobile app access",
      "Certificate generation",
      "API access",
      "Custom branding"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations with specific needs",
    features: [
      "Unlimited learners",
      "Unlimited courses",
      "Advanced analytics & AI insights",
      "24/7 dedicated support",
      "Mobile app access",
      "Certificate generation",
      "Full API access",
      "Custom branding",
      "SSO integration",
      "Custom integrations",
      "Dedicated account manager"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 transition-all hover:shadow-xl ${
                plan.popular 
                  ? "border-blue-500 shadow-lg scale-105" 
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period !== "pricing" && (
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
