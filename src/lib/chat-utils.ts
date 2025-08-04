// 시간 포맷팅 함수
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// 날짜 포맷팅 함수
export const formatDate = (date: Date) => {
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
export const isSameDay = (date1: Date, date2: Date) => {
  return date1.toDateString() === date2.toDateString();
};
