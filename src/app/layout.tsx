import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 고민 상담소 - 고민아이",
  description: "AI 고민 상담소 - 고민아이",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased font-pretendard">{children}</body>
    </html>
  );
}
