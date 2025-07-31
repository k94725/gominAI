import { Heart, Brain } from "lucide-react";
import { CounselorInterface } from "@/types/counselor";

// 상담사 데이터
export const counselors: CounselorInterface[] = [
  {
    id: "empathetic",
    name: "AGENT | GONG",
    title: "공감형 상담사",
    type: "공감형 상담사",
    description:
      "감정을 이해하고 공감하며, 따뜻한 지지와 위로를 제공하는 상담 방식입니다.",
    icon: Heart,
    color: "bg-empathetic",
    lightColor: "bg-empathetic-light",
    borderColor: "border-empathetic/20",
    iconBgColor: "bg-pink-500",
    features: ["감정 공감", "심리적 지지", "스트레스 완화", "정서적 안정"],
    approach:
      "안전하고 따뜻한 환경에서 자유롭게 감정을 표현할 수 있도록 돕습니다.",
    personality:
      "따뜻하고 공감적인 성향으로, 내담자의 감정을 깊이 이해하고 위로를 제공합니다.",
    greeting: (name: string) =>
      `안녕하세요 ${name}님, AGENT | GONG입니다. 편안한 마음으로 이야기를 나누어 보세요. 오늘은 어떤 일로 상담을 원하시나요?`,
    img: "/assets/counselor_empathetic.png",
  },
  {
    id: "analytical",
    name: "AGENT | SOL",
    title: "해결중심 상담사",
    type: "해결중심 상담사",
    description:
      "논리적 분석을 통해 구체적이고 실행 가능한 해결책을 제시하는 상담 방식입니다.",
    icon: Brain,
    color: "bg-analytical",
    lightColor: "bg-analytical-light",
    borderColor: "border-analytical/20",
    iconBgColor: "bg-blue-500",
    features: ["문제 분석", "해결책 제시", "목표 설정", "실행 계획"],
    approach:
      "체계적인 방법으로 문제를 분석하고 단계별 해결 방안을 제시합니다.",
    personality:
      "논리적이고 체계적인 성향으로, 명확한 분석과 실용적인 해결책을 제공합니다.",
    greeting: (name: string) =>
      `안녕하세요 ${name}님, AGENT | SOL입니다. 오늘 어떤 문제에 대해 함께 이야기해볼까요? 구체적으로 말씀해 주시면 도움이 되겠습니다.`,
    img: "/assets/counselor_analytical.png",
  },
];

// 특징 데이터
export const features = [
  {
    icon: "Shield",
    title: "완전한 개인정보 보호",
    description: "모든 대화는 안전하게 보호됩니다",
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: "Clock",
    title: "24시간 이용 가능",
    description: "언제든지 필요할 때 상담받으세요",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: "CheckCircle2",
    title: "전문적인 상담",
    description: "검증된 상담 기법을 적용합니다",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];
