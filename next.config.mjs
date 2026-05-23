/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    // Allow all local images
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;
