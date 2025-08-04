import { formatTime } from "@/lib/chat-utils";
import type { CounselorInterface } from "@/types/counselor";

interface ChatMessageProps {
  role: string;
  content: string;
  timestamp: Date;
  counselor: CounselorInterface;
  userName: string;
  index: number;
}

export function ChatMessage({
  role,
  content,
  timestamp,
  counselor,
  userName,
  index,
}: ChatMessageProps) {
  return (
    <div
      className={`flex animate-fade-in-up ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div
        className={`flex flex-col max-w-lg ${
          role === "user" ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-3xl px-4 py-2 md:px-6 md:py-3 shadow-sm text-sm md:text-base ${
            role === "user"
              ? "bg-themeColor-violet/70 leading-relaxed whitespace-pre-wrap text-white rounded-br-sm"
              : `${counselor.lightColor} text-neutral-500 rounded-3xl rounded-bl-sm`
          }`}
        >
          <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs md:text-sm">
          <p className="text-neutral-500">
            {role === "user" ? userName : counselor.name}
          </p>
          <p className="text-neutral-400">{formatTime(timestamp)}</p>
        </div>
      </div>
    </div>
  );
}
