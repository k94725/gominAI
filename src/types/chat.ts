// 메시지 타입 정의
export type MessageItem =
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
