import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 꼭 필요: static export
  images: {
    unoptimized: true, // static export 시 필수
  },
  basePath: "/gominAI", // GitHub Pages 하위 경로 대응
  assetPrefix: "/gominAI/", // static 파일 prefix
};

export default nextConfig;
