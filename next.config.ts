import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security: Set strict security headers for all responses
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src https://www.google.com;",
          },
        ],
      },
    ];
  },
  // Performance: Compress output for smaller payloads
  compress: true,
};

export default nextConfig;
