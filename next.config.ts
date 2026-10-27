import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // YouTube video thumbnails
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
  turbopack: {
    // Pin the project root so a stray lockfile in the home folder isn't picked up.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
