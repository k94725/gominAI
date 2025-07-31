import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CounselorInterface } from "@/types/counselor";
import Image from "next/image";

interface CounselorCardProps {
  counselor: CounselorInterface;
}

export function CounselorCard({ counselor }: CounselorCardProps) {
  const { name, type, description, img } = counselor;
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
      <CardContent className="px-8 pb-8">
        <p className="text-sm leading-relaxed text-center break-keep text-neutral-600">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
