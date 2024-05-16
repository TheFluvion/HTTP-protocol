/** @type {import('next').NextConfig} */

const basePath = '/request';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    basePath: basePath,
  },
  basePath: basePath,
  assetPrefix: basePath,
  eslint: { dirs: ['.'] },
  output: 'standalone',
};

module.exports = nextConfig;
