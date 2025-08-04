import { formatDate } from "@/lib/chat-utils";

interface DateSeparatorProps {
  date: Date;
}

export function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <div className="flex justify-center mt-4">
      <div className="px-4 py-2 text-xs font-semibold rounded-full md:text-sm text-neutral-500 bg-neutral-100">
        {formatDate(date)}
      </div>
    </div>
  );
}
