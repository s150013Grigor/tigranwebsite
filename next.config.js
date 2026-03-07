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
  // Cache static assets for 1 year
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf|otf|js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
