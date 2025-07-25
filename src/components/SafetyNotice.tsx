export function SafetyNotice() {
  return (
    <div className="text-center mt-24">
      <div className="bg-white rounded-3xl p-10 max-w-3xl mx-auto shadow-sm border border-neutral-200">
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">
          안전한 상담 환경
        </h3>
        <p className="text-neutral-600 leading-relaxed">
          AI 상담사는 전문적인 심리 지원을 제공하지만, 응급상황이나 심각한 위기
          상황에서는
          <br />
          전문 의료진이나 상담사에게 즉시 연락하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}
