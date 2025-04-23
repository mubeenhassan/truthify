import { Check } from "lucide-react";

export default function FeatureList({ features }) {
  return (
    <ul className="space-y-3 mt-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3">
          <Check className="h-5 w-5 text-blue-600 mt-0.5" />
          <span className="text-sm text-muted-foreground">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
