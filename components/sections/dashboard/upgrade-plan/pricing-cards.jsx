import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FeatureList from "./feature-list";

export default function PricingCards() {
  const plans = [
    {
      id: "basic",
      name: "Integrity Report",
      description: "Best for personal use",
      price: 19,
      borderColor: "border-blue-300",
      buttonVariant: "current",
      isPopular: false,
      features: [
        "Deep Layered Analysis",
        "Fallacy Detection",
        "Instant Results",
      ],
      current: true,
    },
    {
      id: "standard",
      name: "Profile Unlock",
      description: "Advanced report for HR and Personal Use",
      price: 500,
      borderColor: "border-[#069AEE]",
      buttonVariant: "default",
      isPopular: true,
      features: [
        "Includes Background Check",
        "Profile Access",
        "Aggregated Content",
        "Instant Results",
        "Unparalleled Research",
        "Privacy Built-in",
      ],
    },
    {
      id: "enterprise",
      name: "10 Profiles",
      description: "Team access for recruiters & finance",
      price: 2500,
      borderColor: "border-yellow-400",
      buttonVariant: "default",
      isPopular: false,
      features: [
        "Profile Access",
        "Aggregated Content",
        "Instant Results",
        "Unparalleled Research",
        "Privacy Built-in",
      ],
    },
    {
      id: "unlimited",
      name: "Unlimited Access",
      description: "Unlimited reports for enterprise & agencies",
      price: 9500,
      borderColor: "border-purple-400",
      buttonVariant: "default",
      isPopular: false,
      features: [
        "Exclusive Access",
        "Aggregated Content",
        "Instant Results",
        "Unparalleled Research",
        "Privacy Built-in",
      ],
    },
    {
      id: "contact",
      name: "Custom API Access",
      description: "Need API integration? Let’s talk!",
      price: null,
      borderColor: "border-gray-400",
      buttonVariant: "default",
      isPopular: false,
      features: [
        "Integration",
        "Fallacy Detection",
        "Streaming Results",
        "Unparalleled Research",
        "Privacy Built-in",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            "flex flex-col h-fit border-2 transition-all duration-200 hover:border-blue-500 hover:shadow-md",
            plan.borderColor,
            plan.isPopular && "relative shadow-lg"
          )}
        >
          {plan.isPopular && (
            <div className="absolute top-0 inset-x-0 flex justify-center">
              <div className="bg-[#069AEE] w-full justify-center text-white text-sm font-semibold py-1 px-3 rounded-tl-[8px] rounded-tr-[8px] flex items-center gap-1.5">
                Most Popular
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
          )}

          <CardHeader className={cn("flex-1", plan.isPopular && "pt-8")}>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <CardDescription className="text-sm">
              {plan.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="mt-4 mb-8">
              {plan.price ? (
                <span className="text-5xl font-bold">${plan.price}</span>
              ) : (
                <span className="text-2xl font-semibold">
                  Contact for Pricing
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <h4 className="font-medium">What you get</h4>
              <FeatureList features={plan.features} />
            </div>
          </CardContent>

          <CardFooter>
            <Button variant={plan.buttonVariant} className="w-full mt-4 group">
              <span>{plan.price ? "Upgrade" : "Inquire Now"}</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
