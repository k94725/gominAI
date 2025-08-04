import { formatTime } from "@/lib/chat-utils";
import type { CounselorInterface } from "@/types/counselor";

interface TypingIndicatorProps {
  counselor: CounselorInterface;
}

export function TypingIndicator({ counselor }: TypingIndicatorProps) {
  return (
    <div className="flex justify-start animate-fade-in-up">
      <div className="max-w-lg">
        <div
          className={`${counselor.lightColor} rounded-3xl rounded-bl-sm px-6 py-3 shadow-sm`}
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
          <p className="text-sm text-neutral-500">{counselor.name}</p>
          <p className="text-xs text-neutral-400">{formatTime(new Date())}</p>
        </div>
      </div>
    </div>
  );
}
