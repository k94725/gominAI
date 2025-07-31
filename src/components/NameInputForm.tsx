"use client";

import { useState } from "react";
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
import Image from "next/image";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50">
      <div className="inline-flex items-center justify-center mx-auto mb-6 w-[250px]">
        <Image
          src="/assets/logo.svg"
          alt="logo"
          width={150}
          height={150}
          className="w-full"
        />
        {/* <User className="w-8 h-8 text-white" /> */}
      </div>
      <div className="container max-w-md px-6 mx-auto">
        <Card className="bg-white shadow-lg border-neutral-200 rounded-3xl">
          <CardHeader className="pt-10 pb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-themeColor-green rounded-3xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="mb-3 text-2xl font-semibold text-neutral-900">
              안녕하세요!
            </CardTitle>
            <CardDescription className="text-neutral-600 ">
              AI 고민 상담소{" "}
              <span className="font-bold text-themeColor-violet">고민아이</span>
              입니다. <br />더 나은 상담을 위해 이름을 알려주세요!
            </CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
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
                  autoFocus
                />
              </div>
              <Button type="submit" disabled={!userName.trim()} size="full">
                시작하기
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="max-w-sm px-4 py-2 mx-auto text-xs break-keep rounded-3xl text-neutral-500 bg-neutral-100">
                입력하신 정보는 상담 중에만 사용되며 안전하게 보호됩니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
