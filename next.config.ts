import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['i.ibb.co'], // Add the valid image domain here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
