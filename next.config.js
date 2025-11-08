/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    
    // Exclude the astro-blog directory from webpack processing
    config.module.rules.push({
      test: /astro-blog\/.*\.(ts|tsx|js|jsx|astro)$/,
      use: 'ignore-loader',
    });
    
    return config;
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  outputFileTracingExcludes: {
    '*': ['./astro-blog/**/*'],
  },
  async rewrites() {
    return [
      {
        source: '/blog-old',
        destination: '/blog-old/index.html',
      },
      {
        source: '/blog-old/:path*',
        destination: '/blog-old/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
