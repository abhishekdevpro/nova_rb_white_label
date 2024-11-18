/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
    remotePatterns:[{
      protocol:'https',
      hostname: 'novajobs.us'
    }]
  }
}

module.exports = nextConfig


