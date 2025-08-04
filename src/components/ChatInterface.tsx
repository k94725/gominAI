"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RefreshCcw, Send } from "lucide-react";
import { counselors } from "@/lib/data";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Image from "next/image";
import { Modal } from "./modal";

// 시간 포맷팅 함수
const formatTime = (date: Date) => {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// 날짜 포맷팅 함수
const formatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "오늘";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "어제";
  } else {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

// 같은 날인지 확인하는 함수
const isSameDay = (date1: Date, date2: Date) => {
  return date1.toDateString() === date2.toDateString();
};

interface ChatInterfaceProps {
  counselorType: string;
}

export function ChatInterface({ counselorType }: ChatInterfaceProps) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmit(e);
  };

  const handleCounselorChange = () => {
    setShowConfirmDialog(false);
    router.push("/counselors");
  };

  if (!currentCounselor || !userName) {
    return <LoadingSpinner />;
  }

  // 메시지 타입 정의
  type MessageItem =
    | { type: "date-separator"; date: Date; key: string }
    | { type: "greeting"; content: string; timestamp: Date; key: string }
    | {
        type: "message";
        role: string;
        content: string;
        timestamp: Date;
        key: string;
        id: string;
      };

  // 메시지에 날짜 구분선 추가
  const messagesWithDateSeparators: MessageItem[] = [];
  let lastDate: Date | null = null;

  // 초기 인사말 추가
  if (messages.length === 0 && currentCounselor) {
    const greetingDate = new Date();
    messagesWithDateSeparators.push({
      type: "date-separator",
      date: greetingDate,
      key: `date-${greetingDate.toDateString()}`,
    });
    messagesWithDateSeparators.push({
      type: "greeting",
      content: currentCounselor.greeting(userName),
      timestamp: greetingDate,
      key: "greeting",
    });
    lastDate = greetingDate;
  }

  messages.forEach((message) => {
    const messageDate = message.createdAt || new Date();

    // 날짜가 바뀌었으면 날짜 구분선 추가
    if (!lastDate || !isSameDay(messageDate, lastDate)) {
      messagesWithDateSeparators.push({
        type: "date-separator",
        date: messageDate,
        key: `date-${messageDate.toDateString()}`,
      });
    }

    messagesWithDateSeparators.push({
      type: "message",
      role: message.role,
      content: message.content,
      timestamp: messageDate,
      key: message.id,
      id: message.id,
    });

    lastDate = messageDate;
  });

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
              {messagesWithDateSeparators.map((item, index) => {
                if (item.type === "date-separator") {
                  return (
                    <div key={item.key} className="flex justify-center mt-4">
                      <div className="px-4 py-2 text-xs font-semibold rounded-full md:text-sm text-neutral-500 bg-neutral-100">
                        {formatDate(item.date)}
                      </div>
                    </div>
                  );
                }

                if (item.type === "greeting") {
                  return (
                    <div
                      key={item.key}
                      className="flex justify-start animate-fade-in-up"
                    >
                      <div className="max-w-lg">
                        <div
                          className={`rounded-3xl px-4 py-2 md:px-6 md:py-3 shadow-sm text-sm md:text-base ${currentCounselor.lightColor} text-neutral-500 rounded-3xl rounded-bl-sm`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap md:text-base text-neutral-500">
                            {item.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs md:text-sm">
                          <p className="text-neutral-500">
                            {currentCounselor.name}
                          </p>
                          <p className="text-neutral-400">
                            {formatTime(item.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }

                // 일반 메시지
                return (
                  <div
                    key={item.key}
                    className={`flex animate-fade-in-up ${
                      item.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div
                      className={`flex flex-col max-w-lg ${
                        item.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-3xl px-4 py-2 md:px-6 md:py-3 shadow-sm text-sm md:text-base ${
                          item.role === "user"
                            ? "bg-themeColor-violet/70 leading-relaxed whitespace-pre-wrap text-white rounded-br-sm"
                            : `${currentCounselor.lightColor} text-neutral-500 rounded-3xl rounded-bl-sm`
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">
                          {item.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs md:text-sm">
                        <p className="text-neutral-500">
                          {item.role === "user"
                            ? userName
                            : currentCounselor.name}
                        </p>
                        <p className="text-neutral-400">
                          {formatTime(item.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading &&
                (messages.length === 0 ||
                  messages[messages.length - 1].role === "user") && (
                  <div className="flex justify-start animate-fade-in-up">
                    <div className="max-w-lg">
                      <div
                        className={`${currentCounselor.lightColor} rounded-3xl rounded-bl-sm px-6 py-3 shadow-sm`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"></div>
                            <div
                              className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm text-neutral-500">
                            답변을 작성하고 있습니다
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-neutral-500">
                          {currentCounselor.name}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {formatTime(new Date())}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={onSubmit} className="flex gap-4 p-4">
              <Input
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
