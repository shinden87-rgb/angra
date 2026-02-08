import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/research-news',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
