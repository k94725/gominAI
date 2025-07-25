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
    <div className="text-center mb-20">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-900 rounded-3xl mb-8">
        <MessageCircle className="h-10 w-10 text-white" />
      </div>
      <h1 className="text-5xl font-semibold text-neutral-900 mb-6 tracking-tight">
        AI 심리 상담
      </h1>
      <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
        안녕하세요, {userName}님
        <br />
        전문적인 AI 상담사와 함께하는 개인 맞춤형 심리 상담 서비스
      </p>
      <Button
        onClick={onContinue}
        className="bg-neutral-900 hover:bg-neutral-800 rounded-3xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        상담 시작하기
        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
      </Button>
      <div className="mt-4">
        <Button
          variant="ghost"
          onClick={onNameChange}
          className="text-sm text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-2xl"
        >
          다른 이름으로 시작하기
        </Button>
      </div>
    </div>
  );
}
