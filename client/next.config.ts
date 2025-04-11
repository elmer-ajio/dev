import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  devIndicators: false,
  env: {
    API_HOST: process.env.API_HOST,
  
  },
};

export default nextConfig;
