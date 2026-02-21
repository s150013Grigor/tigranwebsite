/** @type {import('next').NextConfig} */
const isPreview = process.env.DEPLOY_TARGET === 'preview';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  ...(isPreview && { basePath: '/preview', assetPrefix: '/preview' }),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Exclude admin API routes from static export
  // Admin works only in dev mode
};

module.exports = nextConfig;
