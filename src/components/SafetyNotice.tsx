export function SafetyNotice() {
  return (
    <div className="mt-24 text-center">
      <div className="max-w-3xl p-10 mx-auto bg-white border shadow-sm rounded-3xl border-neutral-200">
        <h3 className="mb-4 text-xl font-semibold text-neutral-900">
          안전한 상담 환경
        </h3>
        <p className="text-sm leading-relaxed break-keep md:text-base text-neutral-600">
          AI 상담사는 전문적인 상담을 제공하지만, <br />
          응급상황이나 심각한 위기 상황에서는
          <br />
          전문 의료진이나 상담사에게 즉시 연락하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}
