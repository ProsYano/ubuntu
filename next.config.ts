import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* STYLES.md §3.1 — Container 1280px | §6.1 libs autorisées — Config PRO SEO extrême */
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // trailingSlash: false — SEO canonical strict
  trailingSlash: false,
  // Images : optimisation pro — formats modernes, pas de base64 lourd
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "kits.roxthemes.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30j
  },
  // Headers SEO + sécurité + perf
  async headers() {
    const headers: Awaited<ReturnType<NonNullable<NextConfig["headers"]>>> = [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];

    // Never cache development chunks as immutable: Turbopack reuses their URLs
    // while their module graph changes, which otherwise leaves stale factories
    // in the browser after HMR updates.
    if (process.env.NODE_ENV === "production") {
      headers.push({
        source: "/(.*)\\.(js|css|woff|woff2|ttf|otf|webp|avif|png|jpg|jpeg|svg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      });
    }

    return headers;
  },
  // Redirections canoniques SEO (exemple)
  async redirects() {
    return [
      // { source: "/home", destination: "/", permanent: true },
    ];
  },
  // Experimental — perf extrême
  experimental: {
    optimizePackageImports: ["swiper"],
  },
};

export default nextConfig;
