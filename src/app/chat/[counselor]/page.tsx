import { ChatInterface } from "@/components/ChatInterface";

interface PageProps {
  params: Promise<{
    counselor: string;
  }>;
}

export default async function ChatPage({ params }: PageProps) {
  const { counselor } = await params;
  return <ChatInterface counselorType={counselor} />;
}

export async function generateStaticParams() {
  return [{ counselor: "empathetic" }, { counselor: "analytical" }];
}
