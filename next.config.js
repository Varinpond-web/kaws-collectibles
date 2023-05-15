/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'varinstorage.blob.core.windows.net',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com",'dl.dropboxusercontent.com','www.dropbox.com'],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/precedent",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;