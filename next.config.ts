import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: ['https://jedel-jardem.space'],
};

export default nextConfig;
