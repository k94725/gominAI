import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CounselorCardProps {
  icon: LucideIcon;
  name: string;
  type: string;
  description: string;
  iconBgColor: string;
}

export function CounselorCard({
  icon: Icon,
  name,
  type,
  description,
  iconBgColor,
}: CounselorCardProps) {
  return (
    <Card className="bg-white border-neutral-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="text-center pb-6 pt-8">
        <div
          className={`w-16 h-16 ${iconBgColor} rounded-3xl flex items-center justify-center mx-auto mb-4`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl font-semibold text-neutral-900">
          {name}
        </CardTitle>
        <CardDescription className="text-neutral-600">{type}</CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <p className="text-sm text-neutral-600 text-center leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
