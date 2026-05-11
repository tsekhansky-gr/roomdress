import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  // Prevent OOM during the prerender phase of `next build`
  // (cacheComponents enables source maps there by default)
  enablePrerenderSourceMaps: false,

  // Opt into Turbopack explicitly (default in Next.js 16)
  turbopack: {},

  experimental: {
    // Avoids preloading all route JS modules into memory at server startup
    preloadEntriesOnStart: false,
  },
};

export default nextConfig;
