"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, ArrowRight } from "lucide-react";

interface NameInputFormProps {
  onNameSubmit: (name: string) => void;
}

export function NameInputForm({ onNameSubmit }: NameInputFormProps) {
  const [userName, setUserName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName.trim()) {
      onNameSubmit(userName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-md">
        <Card className="bg-white border-neutral-200 rounded-3xl shadow-lg">
          <CardHeader className="text-center pb-6 pt-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-900 rounded-3xl mb-6 mx-auto">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold text-neutral-900 mb-3">
              안녕하세요!
            </CardTitle>
            <CardDescription className="text-neutral-600">
              더 나은 상담을 위해 어떻게 불러드리면 될까요?
            </CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-neutral-700"
                >
                  이름 또는 별명
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="예: 고미나"
                  className="border-neutral-300 rounded-3xl px-6 py-4 text-base focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                disabled={!userName.trim()}
                className="w-full py-4 text-base font-semibold bg-neutral-900 hover:bg-neutral-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                시작하기
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-xs text-neutral-500 bg-neutral-100 px-4 py-2 rounded-full inline-block">
                입력하신 정보는 상담 중에만 사용되며 안전하게 보호됩니다
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
