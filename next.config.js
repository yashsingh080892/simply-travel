/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreBuildErrors: true,
  images: {
    domains: [ 'simply-travel.testsigma.com'],
    loader: "custom"
  },
  assetPrefix: 'http://localhost:8003/'
}

module.exports = nextConfig
