/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.honghanda.com'],
  },
  swcMinify: true,
}

module.exports = nextConfig
