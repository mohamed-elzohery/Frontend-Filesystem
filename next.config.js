/** @type {import('next').NextConfig} */
const nextConfig = {
     experimental: {
    serverActions: {
      bodySizeLimit: process.env.NEXT_PUBLIC_MAX_FILE_SIZE || "5mb",
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = nextConfig;
