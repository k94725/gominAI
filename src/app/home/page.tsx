"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Clock, CheckCircle2, Heart, Brain } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { FeatureCard } from "@/components/FeatureCard";
import { CounselorCard } from "@/components/CounselorCard";
import { SafetyNotice } from "@/components/SafetyNotice";

// 특징 데이터
const features = [
  {
    icon: Shield,
    title: "완전한 개인정보 보호",
    description: "모든 대화는 안전하게 보호됩니다",
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Clock,
    title: "24시간 이용 가능",
    description: "언제든지 필요할 때 상담받으세요",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: CheckCircle2,
    title: "전문적인 상담",
    description: "검증된 상담 기법을 적용합니다",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

// 상담사 데이터
const counselors = [
  {
    icon: Heart,
    name: "AGENT | GONG",
    type: "공감형 상담사",
    description:
      "감정을 이해하고 공감하며, 따뜻한 지지와 위로를 제공하는 상담 방식입니다.",
    iconBgColor: "bg-pink-500",
  },
  {
    icon: Brain,
    name: "AGENT | SOL",
    type: "해결중심 상담사",
    description:
      "논리적 분석을 통해 구체적이고 실행 가능한 해결책을 제시하는 상담 방식입니다.",
    iconBgColor: "bg-blue-500",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const handleContinue = () => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      router.push("/counselors");
    } else {
      router.push("/username");
    }
  };

  const handleNameChange = () => {
    router.push("/username");
  };

  // 사용자 이름 확인 및 리다이렉트
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      router.push("/username");
      return;
    }
    setUserName(storedName);
  }, [router]);

  // 로딩 중이거나 리다이렉트 중일 때
  if (!userName) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <PageHeader
          userName={userName}
          onContinue={handleContinue}
          onNameChange={handleNameChange}
        />

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Counselor Preview */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-neutral-900 text-center mb-12">
            상담사 에이전트 소개
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {counselors.map((counselor, index) => (
              <CounselorCard key={index} {...counselor} />
            ))}
          </div>
        </div>

        <SafetyNotice />
      </div>
    </div>
  );
}
