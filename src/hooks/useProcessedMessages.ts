import { useMemo } from "react";
import type { Message } from "ai";
import { type MessageItem } from "@/types/chat";
import { isSameDay } from "@/lib/chat-utils";
import type { CounselorInterface } from "@/types/counselor";

interface UseProcessedMessagesProps {
  messages: Message[];
  currentCounselor: CounselorInterface | undefined;
  userName: string;
}

export function useProcessedMessages({
  messages,
  currentCounselor,
  userName,
}: UseProcessedMessagesProps) {
  return useMemo(() => {
    const messagesWithDateSeparators: MessageItem[] = [];
    let lastDate: Date | null = null;

    // 초기 인사말 추가 (항상 표시)
    if (currentCounselor) {
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

    return messagesWithDateSeparators;
  }, [messages, currentCounselor, userName]);
}
