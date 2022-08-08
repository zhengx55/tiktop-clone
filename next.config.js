/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.honghanda.com', 'lh3.googleusercontent.com'],
  },
  swcMinify: true,
}

module.exports = nextConfig
