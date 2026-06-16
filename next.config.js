/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/image",
      },
      {
        pathname: "/images/**",
      },
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "traec.apphero.agency",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "10.10.9.53",
        port: "8000",
        
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
