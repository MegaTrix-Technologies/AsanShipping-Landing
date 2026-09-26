/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
        ],
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/developer-api',
        destination: '/developers',
        permanent: true,
      },
      {
        source: '/api-docs',
        destination: '/developers',
        permanent: true,
      },
      {
        source: '/docs/api',
        destination: '/developers',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
