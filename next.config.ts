import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel에서는 자동으로 최적화됨
  images: {
    domains: [], // 필요시 외부 이미지 도메인 추가
  },
};

export default nextConfig;
