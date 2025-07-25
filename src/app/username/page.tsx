"use client";

import { NameInputForm } from "@/components/NameInputForm";
import { useRouter } from "next/navigation";

export default function UsernamePage() {
  const router = useRouter();

  const handleNameSubmit = (name: string) => {
    localStorage.setItem("userName", name);
    router.push("/home");
  };

  return <NameInputForm onNameSubmit={handleNameSubmit} />;
}
