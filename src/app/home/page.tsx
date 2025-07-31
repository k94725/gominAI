"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { FeatureCard } from "@/components/FeatureCard";
import { CounselorCard } from "@/components/CounselorCard";
import { SafetyNotice } from "@/components/SafetyNotice";
import { counselors, features } from "@/lib/data";

// 아이콘 매핑
const iconMap = {
  Shield,
  Clock,
  CheckCircle2,
};

// 특징 데이터에 아이콘 컴포넌트 추가
const featuresWithIcons = features.map((feature) => ({
  ...feature,
  icon: iconMap[feature.icon as keyof typeof iconMap],
}));

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
      <div className="container max-w-6xl px-6 py-16 mx-auto">
        <PageHeader
          userName={userName}
          onContinue={handleContinue}
          onNameChange={handleNameChange}
        />

        {/* Features */}
        <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto mb-32 md:grid-cols-3">
          {featuresWithIcons.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Counselor Preview */}
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-32 text-3xl font-semibold text-center text-neutral-900">
            상담사 에이전트 소개
          </h2>
          <div className="grid gap-32 md:gap-8 md:grid-cols-2">
            {counselors.map((counselor, index) => (
              <CounselorCard key={index} counselor={counselor} />
            ))}
          </div>
        </div>
        <SafetyNotice />
      </div>
    </div>
  );
}
