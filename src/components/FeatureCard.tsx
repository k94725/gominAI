import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconBgColor,
  iconColor,
}: FeatureCardProps) {
  return (
    <div className="text-center">
      <div
        className={`inline-flex items-center justify-center w-12 h-12 ${iconBgColor} rounded-2xl mb-4`}
      >
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h3 className="font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  );
}
