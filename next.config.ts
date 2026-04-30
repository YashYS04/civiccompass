import type { NextConfig } from "next";

/**
 * Next.js configuration for Civic Compass AI.
 * - Standalone output for Docker/Cloud Run deployment
 * - Security headers on all responses (CSP, XFO, XCTO, Referrer-Policy)
 * - Gzip compression for reduced payload size
 */
const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,

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
};

export default nextConfig;
