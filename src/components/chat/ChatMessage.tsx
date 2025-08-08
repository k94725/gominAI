import { formatTime } from "@/lib/chat-utils";
import type { CounselorInterface } from "@/types/counselor";
import { createElement } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: string;
  content: string;
  timestamp: Date;
  counselor: CounselorInterface;
  userName: string;
  index: number;
}

const mdStyles = {
  p: "mb-2 last:mb-0",
  strong: "font-semibold text-neutral-700",
  em: "italic text-neutral-600",
  ul: "ml-4 list-disc",
  ol: "ml-4 list-decimal",
  li: "mb-1",
  h1: "mb-2 text-xl font-bold",
  h2: "mb-2 text-lg font-semibold",
  h3: "mb-1 text-base font-medium",
  blockquote: "pl-4 italic border-l-2 border-neutral-300 text-neutral-600",
  code: "px-1 py-0.5 bg-neutral-100 rounded text-sm font-mono",
  pre: "p-3 overflow-x-auto rounded-lg bg-neutral-100",
};

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
          {role === "user" ? (
            <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="leading-relaxed prose-sm prose max-w-none prose-neutral prose-strong:text-neutral-700 prose-em:text-neutral-600">
              <ReactMarkdown
                components={Object.fromEntries(
                  Object.entries(mdStyles).map(([tag, className]) => [
                    tag,
                    ({ children }: { children: React.ReactNode }) =>
                      createElement(tag, { className }, children),
                  ]),
                )}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
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
