"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { counselors } from "@/lib/data";
import { CounselorDetailCard } from "@/components/CounselorDetailCard";

export default function CounselorSelection() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // 로컬 스토리지에서 사용자 이름 가져오기
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      // 이름이 없으면 메인 페이지로 리다이렉트
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-8 flex items-center gap-3 hover:bg-neutral-100 rounded-3xl px-6 py-3 mx-auto"
          >
            <ArrowLeft className="h-5 w-5" />
            메인으로 돌아가기
          </Button>
          <h1 className="text-4xl font-semibold text-neutral-900 mb-4 tracking-tight">
            안녕하세요, {userName}님
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            어떤 상담사와 함께 이야기를 나누고 싶으신가요?
          </p>
        </div>

        {/* Counselor Cards */}
        <div className="max-w-4xl grid md:grid-cols-2 gap-8 mx-auto">
          {counselors.map((counselor, index) => (
            <CounselorDetailCard key={index} counselor={counselor} />
          ))}
        </div>

        {/* Help Text */}
        <div className="text-center mt-24">
          <div className="bg-white rounded-3xl p-8 max-w-2xl mx-auto shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              상담사 선택 가이드
            </h3>
            <p className="text-neutral-600 leading-relaxed text-sm">
              <strong>공감형 상담사</strong>는 감정적 지지와 위로가 필요할 때,
              <br />
              <strong>해결중심 상담사</strong>는 구체적인 문제 해결이 필요할 때
              추천드립니다.
              <br />
              언제든지 다른 상담사로 변경할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
