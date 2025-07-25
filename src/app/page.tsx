"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");

    if (storedName) {
      // 유저네임이 있으면 /home으로 이동
      router.push("/home");
    } else {
      // 유저네임이 없으면 /username으로 이동
      router.push("/username");
    }
  }, [router]);

  // 리다이렉트 중일 때 로딩 화면
  return <LoadingSpinner text="상담소로 가는 중" />;
}
