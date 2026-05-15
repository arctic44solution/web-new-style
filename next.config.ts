import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Forces Next.js to generate static HTML/CSS/JS
  images: {
    unoptimized: true,
  },
  basePath: '/web-new-style',
};

export default nextConfig;
