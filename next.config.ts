import type { NextConfig } from "next";

const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL) : null;
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
      ...(storageUrl ? [{protocol: storageUrl.protocol.replace(":", "") as "https" | "http", hostname: storageUrl.hostname, port: storageUrl.port, pathname: "/storage/v1/object/public/ubuntu-equipment/**"}] : []),
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

    headers.push({source: "/auth/:path*", headers: [{key: "Referrer-Policy", value: "no-referrer"}, {key: "X-Robots-Tag", value: "noindex, nofollow"}]});
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
    serverActions: { bodySizeLimit: "6mb" },
  },
};

export default nextConfig;
