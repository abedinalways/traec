/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "traec.apphero.agency",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
