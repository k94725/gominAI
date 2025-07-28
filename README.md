# AI 고민 상담 웹 애플리케이션

이 프로젝트는 AI 상담사를 통한 고민 상담 서비스를 제공하는 Next.js 애플리케이션입니다.

## 기능

- **두 가지 상담사 유형**: 공감형(A)과 해결중심형(B) 상담사
- **실시간 채팅**: OpenAI GPT-4를 활용한 실시간 대화
- **개인화된 상담**: 사용자 이름 기반 맞춤형 상담
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 UI

## 환경 설정

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# OpenAI API 설정
OPENAI_API_KEY=your_openai_api_key_here

# 개발 환경 설정
NODE_ENV=development
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 상담사 유형

### A 상담사 (공감형)

- 감정적 공감과 위로를 중시
- 따뜻하고 이해하는 말투
- 감정적 지지 제공

### B 상담사 (해결중심형)

- 논리적 분석과 해결책 제시
- 구체적이고 실용적인 조언
- 단계별 해결 방안 제시

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
