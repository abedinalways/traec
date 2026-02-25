/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ibb.co.com", // Handles any subdomain on ibb.co.com
      },
      {
        protocol: "https",
        hostname: "**.ibb.co", // Handles any subdomain on ibb.co
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
