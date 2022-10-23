/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.pixabay.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/@:username',
        destination: '/blog/:username',
      },
      {
        source: '/@:username/:id',
        destination: '/post/:id',
      },
    ];
  },
};

module.exports = nextConfig;
