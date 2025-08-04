"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
      <div className="container max-w-6xl px-6 py-16 mx-auto">
        {/* Header */}
        <div className="mb-32 text-center">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl text-neutral-900">
            안녕하세요,{" "}
            <span className="font-bold text-themeColor-violet">{userName}</span>
            님
          </h1>
          <p className="max-w-2xl mx-auto text-base leading-relaxed md:text-xl text-neutral-600">
            어떤 상담사와 함께 이야기를 나누고 싶으신가요?
          </p>
          <Button variant="link" onClick={() => router.push("/")}>
            메인으로 돌아가기
          </Button>
        </div>

        {/* Counselor Cards */}
        <div className="grid max-w-4xl gap-32 mx-auto md:gap-8 md:grid-cols-2">
          {counselors.map((counselor, index) => (
            <CounselorDetailCard key={index} counselor={counselor} />
          ))}
        </div>

        {/* Help Text */}
        <div className="mt-24 text-center">
          <div className="max-w-2xl p-8 mx-auto bg-white border shadow-sm rounded-3xl border-neutral-200">
            <h3 className="mb-3 text-lg font-semibold text-neutral-900">
              상담사 선택 가이드
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              필요에 맞게 원하는 상담사를 선택해주세요.
              <br />
              <span className="font-bold text-pink-500">AGENT | GONG</span>은
              감정적 지지와 위로가 필요할 때,
              <br />
              <span className="font-bold text-blue-500">AGENT | SOL</span>은
              구체적인 문제 해결이 필요할 때 추천드립니다.
              <br />
              <br />
              언제든지 다른 상담사로 변경할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
