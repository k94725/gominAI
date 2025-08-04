import { formatTime } from "@/lib/chat-utils";
import type { CounselorInterface } from "@/types/counselor";

interface GreetingMessageProps {
  content: string;
  timestamp: Date;
  counselor: CounselorInterface;
}

export function GreetingMessage({
  content,
  timestamp,
  counselor,
}: GreetingMessageProps) {
  return (
    <div className="flex justify-start animate-fade-in-up">
      <div className="max-w-lg">
        <div
          className={`rounded-3xl px-4 py-2 md:px-6 md:py-3 shadow-sm text-sm md:text-base ${counselor.lightColor} text-neutral-500 rounded-3xl rounded-bl-sm`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap md:text-base text-neutral-500">
            {content}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs md:text-sm">
          <p className="text-neutral-500">{counselor.name}</p>
          <p className="text-neutral-400">{formatTime(timestamp)}</p>
        </div>
      </div>
    </div>
  );
}
