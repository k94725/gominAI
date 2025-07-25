import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { CounselorInterface } from "@/types/counselor";

interface CounselorDetailCardProps {
  counselor: CounselorInterface;
}

export function CounselorDetailCard({ counselor }: CounselorDetailCardProps) {
  const {
    id,
    icon: Icon,
    name,
    type,
    description,
    iconBgColor,
    features,
    approach,
    personality,
  } = counselor;
  const router = useRouter();
  const handleStartSession = (counselorId: string) => {
    router.push(`/chat/${counselorId}`);
  };

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
        <div className="space-y-8 mb-10">
          <p className="text-sm text-neutral-600 text-center leading-relaxed">
            {description}
          </p>
          <div className={`rounded-3xl`}>
            <h4 className="font-semibold text-neutral-900 text-center">
              #키워드
            </h4>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className={`${iconBgColor} bg-opacity-10 rounded-full px-2 py-1 text-sm font-medium text-center text-neutral-700 shadow-sm`}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-50 rounded-3xl p-8">
            <h4 className="font-semibold mb-4 text-neutral-900">상담사 성향</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {approach}
            </p>
          </div>
          <div className="bg-neutral-50 rounded-3xl p-8">
            <h4 className="font-semibold mb-4 text-neutral-900">상담 접근법</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {personality}
            </p>
          </div>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleStartSession(id);
          }}
          className={`w-full py-4 text-base font-semibold ${iconBgColor} hover:opacity-90 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group`}
          size="lg"
        >
          {name}에게 상담하기
          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
