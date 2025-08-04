"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Send } from "lucide-react";
import { counselors } from "@/lib/data";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Image from "next/image";
import { Modal } from "./modal";
import { useProcessedMessages } from "@/hooks/useProcessedMessages";
import { DateSeparator } from "@/components/chat/DateSeparator";
import { GreetingMessage } from "@/components/chat/GreetingMessage";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { TypingIndicator } from "@/components/chat/TypingIndicator";

interface ChatInterfaceProps {
  counselorType: string;
}

export function ChatInterface({ counselorType }: ChatInterfaceProps) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: { counselorType, userName },
    });

  const currentCounselor = counselors.find(
    (counselor) => counselor.id === counselorType,
  );

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 메시지가 변경될 때마다 input에 포커스 유지
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isLoading]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    handleSubmit(e);

    // 메시지 전송 후 포커스 유지
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleCounselorChange = () => {
    setShowConfirmDialog(false);
    router.push("/counselors");
  };

  const processedMessages = useProcessedMessages({
    messages,
    currentCounselor,
    userName,
  });

  if (!currentCounselor || !userName) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container max-w-4xl px-6 py-8 mx-auto">
        {/* Header */}
        <Card className="mb-8 bg-white shadow-sm border-neutral-200 rounded-3xl">
          <CardHeader className="pb-6 md:p-8">
            <div className="flex items-center gap-4 md:gap-6">
              <div
                className={`shrink-0 flex items-end justify-center w-20 h-20 overflow-hidden rounded-full md:w-32 md:h-32 ${currentCounselor.iconBgColor}`}
              >
                <Image
                  src={currentCounselor.profileImg}
                  alt={currentCounselor.name}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col justify-between w-full h-20 md:py-4 md:h-32">
                <div>
                  <CardTitle className="flex items-center w-full gap-2 text-lg font-semibold md:text-2xl text-neutral-900">
                    {currentCounselor.name}
                    <Button
                      variant="ghost"
                      onClick={() => setShowConfirmDialog(true)}
                      className="gap-1 p-1 w-fit h-fit text-neutral-400"
                    >
                      <RefreshCcw className="w-5 h-5" />
                      <span className="hidden md:block">상담사변경</span>
                    </Button>
                  </CardTitle>
                  <p className="text-sm md:text-base text-neutral-600">
                    {currentCounselor.title}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="px-2 py-1 text-green-700 border-green-200 rounded-full w-fit bg-green-50"
                >
                  <div className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></div>
                  상담 중
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-8 overflow-hidden bg-white shadow-sm border-neutral-200 rounded-3xl">
          <CardContent className="p-0">
            <div className="h-[70vh] overflow-y-auto p-6 md:p-8 space-y-6">
              {processedMessages.map((item, index) => {
                if (item.type === "date-separator") {
                  return <DateSeparator key={item.key} date={item.date} />;
                }

                if (item.type === "greeting") {
                  return (
                    <GreetingMessage
                      key={item.key}
                      content={item.content}
                      timestamp={item.timestamp}
                      counselor={currentCounselor}
                    />
                  );
                }

                return (
                  <ChatMessage
                    key={item.key}
                    role={item.role}
                    content={item.content}
                    timestamp={item.timestamp}
                    counselor={currentCounselor}
                    userName={userName}
                    index={index}
                  />
                );
              })}

              {/* Typing indicator */}
              {isLoading &&
                (messages.length === 0 ||
                  messages[messages.length - 1].role === "user") && (
                  <TypingIndicator counselor={currentCounselor} />
                )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={onSubmit} className="flex gap-4 p-4">
              <Input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="메시지를 입력하세요"
                disabled={isLoading}
                autoFocus
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="transition-all duration-300 shadow-none sm:p-4 md:px-8 md:py-4 bg-themeColor-green hover:bg-themeColor-green/80 rounded-3xl hover:shadow-none"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="flex items-center justify-center mt-6">
          <p className="px-6 py-3 text-sm text-center rounded-full text-neutral-500 bg-neutral-100">
            • AI 상담사와 대화 중 •<br />
            응급상황 시 전문기관에 연락하세요
          </p>
        </div>

        {/* 상담사 변경 확인 모달 */}
        <Modal
          open={showConfirmDialog}
          content="상담사를 변경하시겠습니까?<br/>상담 내용은 저장되지 않습니다."
          onOpenChange={setShowConfirmDialog}
          onClickCancel={() => setShowConfirmDialog(false)}
          onClickConfirm={handleCounselorChange}
        />
      </div>
    </div>
  );
}
