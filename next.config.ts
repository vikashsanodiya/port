// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dz6kwsk7wp/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
