import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: NextRequest) {
  try {
    const { messages, counselorType, userName } = await req.json();

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

    const temperature = counselorType === "empathetic" ? 0.7 : 0.5;

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      system: systemPrompt,
      messages,
      temperature,
      maxTokens: 1000,
    });

    return result.toDataStreamResponse();
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
