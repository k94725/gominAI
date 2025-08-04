import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";

interface PageHeaderProps {
  userName: string;
  onContinue: () => void;
  onNameChange: () => void;
}

export function PageHeader({
  userName,
  onContinue,
  onNameChange,
}: PageHeaderProps) {
  return (
    <div className="mb-20 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-themeColor-green rounded-3xl">
        <MessageCircle className="w-10 h-10 text-white" />
      </div>
      <h1 className="mb-6 text-4xl font-semibold tracking-tight md:text-5xl text-neutral-900">
        AI 심리 상담
      </h1>
      <p className="max-w-2xl mx-auto mb-8 text-base leading-relaxed md:text-xl text-neutral-600">
        {userName}님을 위한 상담사가 준비되었습니다.
        <br />
        <span className="font-bold text-themeColor-violet">고민아이</span>의
        맞춤형 AI 상담으로 마음을 위로받고 고민을 해결해보세요!
      </p>
      <Button onClick={onContinue} size="lg">
        상담 시작하기
        <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" />
      </Button>
      <div className="mt-1">
        <Button
          variant="link"
          onClick={onNameChange}
          // className="text-sm text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-2xl"
        >
          다른 이름으로 시작하기
        </Button>
      </div>
    </div>
  );
}
