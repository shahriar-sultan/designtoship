import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Shield, 
  Users, 
  BarChart3, 
  Globe, 
  Sparkles,
  Clock,
  Award
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience blazing-fast performance with our optimized platform. Load courses instantly and enjoy seamless navigation."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and security protocols keep your data safe. SOC 2 compliant and GDPR ready."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Built-in collaboration tools let your team work together seamlessly. Share resources, discuss, and learn as one."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track learner progress with detailed analytics. Get insights into engagement, completion rates, and performance."
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Reach a global audience with built-in translation support. Create courses in multiple languages effortlessly."
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Leverage AI to personalize learning paths, recommend content, and identify knowledge gaps automatically."
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Access your courses anytime, anywhere. Our platform is always available, ensuring uninterrupted learning."
  },
  {
    icon: Award,
    title: "Certification System",
    description: "Issue certificates automatically upon course completion. Build credibility and recognize achievements."
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features designed to make learning management simple, effective, and enjoyable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-gray-200 hover:border-blue-300 transition-colors hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
