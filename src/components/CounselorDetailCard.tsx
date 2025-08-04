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
import Image from "next/image";

interface CounselorDetailCardProps {
  counselor: CounselorInterface;
}

export function CounselorDetailCard({ counselor }: CounselorDetailCardProps) {
  const {
    id,
    name,
    type,
    description,
    iconBgColor,
    features,
    approach,
    personality,
    img,
  } = counselor;
  const router = useRouter();
  const handleStartSession = (counselorId: string) => {
    router.push(`/chat/${counselorId}`);
  };

  return (
    <Card className="relative transition-shadow bg-white shadow-sm border-neutral-200 rounded-3xl hover:shadow-md">
      <CardHeader className="pt-40 pb-6 text-center">
        <div className="w-[250px] h-[250px] absolute left-[50%] -translate-x-1/2 -top-[90px]">
          <Image
            src={img}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full"
          />
        </div>
        <CardTitle className="text-xl font-semibold text-neutral-900">
          {name}
        </CardTitle>
        <CardDescription className="text-neutral-600">{type}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 md:p-8">
        <div className="mb-10 space-y-8">
          <div className="relative">
            <p
              className="pt-3 text-sm leading-relaxed text-center text-neutral-600 break-keep"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="absolute top-0 right-[50%] translate-x-[50%] flex flex-row items-center justify-between w-full max-w-[280px]">
              <Image
                src="/assets/icon_ quotes_open.svg"
                alt={name}
                width={20}
                height={20}
              />
              <Image
                src="/assets/icon_ quotes_close.svg"
                alt={name}
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className={`rounded-3xl`}>
            <h4 className="font-semibold text-center text-neutral-900">
              #키워드
            </h4>
            <div className="grid grid-cols-2 gap-3 mt-3">
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
          <div className="p-6 text-center md:p-8 bg-neutral-50 rounded-3xl">
            <h4 className="mb-4 font-semibold text-neutral-900">상담 접근법</h4>
            <p
              className="text-sm leading-relaxed text-neutral-600 break-keep"
              dangerouslySetInnerHTML={{ __html: approach }}
            />
          </div>
          <div className="p-6 text-center md:p-8 bg-neutral-50 rounded-3xl">
            <h4 className="mb-4 font-semibold text-neutral-900">상담가 성향</h4>
            <p
              className="text-sm leading-relaxed text-neutral-600 break-keep"
              dangerouslySetInnerHTML={{ __html: personality }}
            />
          </div>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleStartSession(id);
          }}
          className={`w-full py-4 text-base font-semibold ${iconBgColor} hover:${iconBgColor} hover:scale-105 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group`}
        >
          {name}에게 상담하기
        </Button>
      </CardContent>
    </Card>
  );
}
