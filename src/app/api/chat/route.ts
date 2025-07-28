import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 모의 응답 함수
const getMockResponse = (
  counselorType: string,
  userName: string,
  userMessage: string,
) => {
  if (counselorType === "empathetic") {
    return `안녕하세요 ${userName}님! 말씀해주신 내용을 들으니 정말 힘드셨겠어요. 그런 마음이 드실 수 있어요. 충분히 이해됩니다. 

더 자세히 이야기해주시면 함께 생각해보면서 해결방안을 찾아보겠습니다. 편안한 마음으로 말씀해주세요.`;
  } else {
    return `안녕하세요 ${userName}님! 말씀해주신 상황을 분석해보겠습니다.

현재 상황을 정리하면:
1. ${userMessage}
2. 이에 대한 해결책을 단계별로 제시하겠습니다.

먼저 구체적으로 어떤 부분에서 어려움을 겪고 계신지 알려주시면 더 정확한 도움을 드릴 수 있습니다.`;
  }
};

export async function POST(req: NextRequest) {
  try {
    console.log("API 호출됨");
    console.log(
      "OPENAI_API_KEY:",
      process.env.OPENAI_API_KEY ? "설정됨" : "설정되지 않음",
    );

    const { messages, counselorType, userName } = await req.json();
    console.log("받은 데이터:", {
      counselorType,
      userName,
      messagesCount: messages.length,
    });

    // 마지막 사용자 메시지 가져오기
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // 상담사 유형에 따른 시스템 프롬프트 설정
    let systemPrompt = "";

    if (counselorType === "empathetic") {
      systemPrompt = `당신은 감정적 공감과 위로를 중시하는 상담사입니다. 
      
다음 원칙을 따라 상담을 진행해주세요:
1. 사용자의 감정을 깊이 공감하고 이해하는 것에 집중하세요
2. 따뜻하고 위로가 되는 말투를 사용하세요
3. 사용자가 안전하고 받아들여진다고 느끼도록 하세요
4. 감정적 지지를 제공하고, 사용자의 감정을 정당화해주세요
5. 해결책보다는 먼저 감정적 공감과 위로를 우선시하세요
6. "그런 마음이 드실 수 있어요", "충분히 이해됩니다" 같은 공감 표현을 적극 활용하세요

사용자 이름: ${userName}
상담사 이름: 공감 상담사
상담사 역할: 감정적 공감과 위로를 중시하는 상담사

항상 한국어로 답변해주세요.`;
    } else if (counselorType === "analytical") {
      systemPrompt = `당신은 냉철하고 논리적인 분석과 해결책 제시를 중시하는 상담사입니다.
      
다음 원칙을 따라 상담을 진행해주세요:
1. 문제를 객관적이고 논리적으로 분석하세요
2. 구체적이고 실용적인 해결책을 제시하세요
3. 단계별 접근 방법을 제안하세요
4. 사용자가 행동할 수 있는 구체적인 방법을 제시하세요
5. 감정보다는 상황 분석과 해결 방안에 집중하세요
6. 논리적이고 체계적인 사고를 돕는 질문을 하세요

사용자 이름: ${userName}
상담사 이름: 분석 상담사
상담사 역할: 논리적 분석과 해결책 제시를 중시하는 상담사

항상 한국어로 답변해주세요.`;
    }

    console.log("OpenAI API 호출 시작");

    try {
      // OpenAI Chat API 호출 (스트리밍)
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messages,
        ],
        temperature: counselorType === "empathetic" ? 0.7 : 0.5,
        max_tokens: 1000,
        stream: true,
      });

      console.log("OpenAI 스트림 응답 받음");

      // useChat이 기대하는 형식으로 스트리밍 응답 생성
      const stream = new ReadableStream({
        async start(controller) {
          try {
            let accumulatedContent = "";

            for await (const chunk of response) {
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                accumulatedContent += content;

                // useChat이 기대하는 형식: 누적된 전체 텍스트를 전송
                const data = JSON.stringify({
                  role: "assistant",
                  content: accumulatedContent,
                });
                controller.enqueue(
                  new TextEncoder().encode(`data: ${data}\n\n`),
                );
              }
            }
            // 스트림 종료 신호
            controller.enqueue(new TextEncoder().encode(`data: [DONE]\n\n`));
            controller.close();
          } catch (error) {
            console.error("스트리밍 에러:", error);
            controller.error(error);
          }
        },
      });

      console.log("스트리밍 응답 전송 시작");

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } catch (openaiError) {
      console.error("OpenAI API 에러:", openaiError);

      // API 에러 시 모의 응답 사용 (스트리밍이 아닌 일반 응답)
      const mockResponse = getMockResponse(
        counselorType,
        userName,
        lastUserMessage,
      );

      console.log("모의 응답 사용:", mockResponse.substring(0, 50) + "...");

      // 에러 시에는 일반 JSON 응답으로 반환
      return new Response(
        JSON.stringify({
          role: "assistant",
          content: mockResponse,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
