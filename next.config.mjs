/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dm9oqqqsa/image/upload/**", // Update to match your Cloudinary account path
      },
    ],
  },
};

export default nextConfig;
