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
    <Card className="transition-shadow bg-white shadow-sm border-neutral-200 rounded-3xl hover:shadow-md">
      <CardHeader className="pt-8 pb-6 text-center">
        <div
          className={`w-16 h-16 ${iconBgColor} rounded-3xl flex items-center justify-center mx-auto mb-4`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl font-semibold text-neutral-900">
          {name}
        </CardTitle>
        <CardDescription className="text-neutral-600">{type}</CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <div className="mb-10 space-y-8">
          <p className="text-sm leading-relaxed text-center text-neutral-600">
            {description}
          </p>
          <div className={`rounded-3xl`}>
            <h4 className="font-semibold text-center text-neutral-900">
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
          <div className="p-8 bg-neutral-50 rounded-3xl">
            <h4 className="mb-4 font-semibold text-neutral-900">상담사 성향</h4>
            <p className="text-sm leading-relaxed text-neutral-600">
              {approach}
            </p>
          </div>
          <div className="p-8 bg-neutral-50 rounded-3xl">
            <h4 className="mb-4 font-semibold text-neutral-900">상담 접근법</h4>
            <p className="text-sm leading-relaxed text-neutral-600">
              {personality}
            </p>
          </div>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleStartSession(id);
          }}
          className={`w-full py-4 text-base font-semibold ${iconBgColor} hover:${iconBgColor} hover:scale-105 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group`}
          size="lg"
        >
          {name}에게 상담하기
          <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
