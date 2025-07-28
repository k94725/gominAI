import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/gominAI" : "";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(isProd && {
    output: "export",
    trailingSlash: true,
    basePath: basePath,
    assetPrefix: basePath + "/",
  }),
};

export default nextConfig;
