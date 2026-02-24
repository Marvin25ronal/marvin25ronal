import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/marvin25ronal',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/marvin25ronal',
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
