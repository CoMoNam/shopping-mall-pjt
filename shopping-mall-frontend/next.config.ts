import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL + "/api/:path*", // Spring Boot 백엔드로 프록시
      },
    ];
  },
};

export default nextConfig;
