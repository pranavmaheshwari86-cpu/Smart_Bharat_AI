import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Linting & Type-checking ──────────────────────────────────────────────
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ─── Compiler Options ─────────────────────────────────────────────────────
  // Remove dead code & console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // ─── Image Optimization ───────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google profile photos
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
    // Reduce layout shift — define default sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ─── Bundle Optimizations ─────────────────────────────────────────────────
  // Tree-shake specific large packages to import only what's used
  experimental: {
    optimizePackageImports: [
      "lucide-react",        // ~1400 icons — only import what's used
      "framer-motion",       // Large animation library
      "@react-three/drei",   // Three.js helpers
    ],
  },

  // ─── Headers for Performance ──────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
