/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [],
    // Allow all local images
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;
