"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, MessageCircle } from "lucide-react";
import { counselors } from "@/lib/data";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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

// 메시지 타입 정의
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const router = useRouter();
  const params = useParams();
  const counselorType = params.counselor as string;
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentCounselor = counselors.find(
    (counselor) => counselor.id === counselorType,
  );
  const IconComponent = currentCounselor?.icon || MessageCircle;

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

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsStreaming(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          counselorType,
          userName,
        }),
      });

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let hasReceivedData = false;
        let assistantMessageId = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") {
                break;
              }

              try {
                const parsed = JSON.parse(data);
                if (parsed.role === "assistant" && parsed.content) {
                  // 첫 번째 데이터를 받으면 assistant 메시지 생성
                  if (!hasReceivedData) {
                    assistantMessageId = (Date.now() + 1).toString();
                    const assistantMessage: Message = {
                      id: assistantMessageId,
                      role: "assistant",
                      content: parsed.content,
                      timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, assistantMessage]);
                    setIsStreaming(true);
                    hasReceivedData = true;
                  } else {
                    // 이후 데이터는 기존 메시지 업데이트
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMessageId
                          ? { ...msg, content: parsed.content }
                          : msg,
                      ),
                    );
                  }
                }
              } catch (e) {
                console.error("JSON 파싱 오류:", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      // 에러 시 assistant 메시지 생성
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "죄송합니다. 메시지 전송에 실패했습니다. 다시 시도해주세요.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
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
    const messageDate = message.timestamp;

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
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <Card className="mb-8 bg-white border-neutral-200 rounded-3xl shadow-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => router.push("/counselors")}
                className="flex items-center gap-3 hover:bg-neutral-100 rounded-3xl px-6 py-3"
              >
                <ArrowLeft className="h-5 w-5" />
                상담사 변경
              </Button>
              <Badge
                variant="secondary"
                className="bg-green-50 text-green-700 rounded-full px-6 py-2 border-green-200"
              >
                상담 진행 중
              </Badge>
            </div>
            <div className="flex items-center gapx-6 py-3">
              <div
                className={`w-16 h-16 ${currentCounselor.color} rounded-3xl flex items-center justify-center`}
              >
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold text-neutral-900 mb-1">
                  {currentCounselor.name}
                </CardTitle>
                <p className="text-neutral-600">{currentCounselor.title}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">
                    온라인
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-8 bg-white border-neutral-200 rounded-3xl shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[70vh] overflow-y-auto p-8 space-y-6">
              {messagesWithDateSeparators.map((item, index) => {
                if (item.type === "date-separator") {
                  return (
                    <div key={item.key} className="flex justify-center my-8">
                      <div className="bg-neutral-100 px-4 py-2 rounded-full">
                        <span className="text-xs text-neutral-500 font-medium">
                          {formatDate(item.date)}
                        </span>
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
                          className={`${currentCounselor.lightColor} border border-neutral-200 rounded-3xl rounded-bl-sm px-6 py-3 shadow-sm`}
                        >
                          <p className="text-neutral-800 leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <p className="text-sm text-neutral-500">
                            {currentCounselor.name}
                          </p>
                          <p className="text-xs text-neutral-400">
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
                        className={`rounded-3xl px-6 py-3 shadow-sm ${
                          item.role === "user"
                            ? "bg-neutral-900 text-white rounded-br-sm"
                            : `${currentCounselor.lightColor} border border-neutral-200 rounded-3xl rounded-bl-sm px-6 py-3 shadow-sm`
                        }`}
                      >
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <p className="text-sm text-neutral-500">
                          {item.role === "user"
                            ? userName
                            : currentCounselor.name}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {formatTime(item.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator - 스트리밍 중에는 숨김 */}
              {isLoading && !isStreaming && (
                <div className="flex justify-start animate-fade-in-up">
                  <div className="max-w-lg">
                    <div
                      className={`${currentCounselor.lightColor} border border-neutral-200 rounded-3xl rounded-bl-sm px-6 py-3 shadow-sm`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-neutral-500">
                          답변을 작성하고 있습니다
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
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
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card className="bg-white border-neutral-200 rounded-3xl shadow-sm">
          <CardContent className="p-8">
            <form onSubmit={onSubmit} className="flex gap-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요"
                className="flex-1 border-neutral-300 rounded-3xl px-6 py-4 text-base focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-neutral-900 hover:bg-neutral-800 rounded-3xl px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <div className="flex items-center justify-center mt-6">
              <p className="text-sm text-neutral-500 bg-neutral-100 px-6 py-3 rounded-full">
                AI 상담사와 대화 중 • 응급상황 시 전문기관에 연락하세요
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
