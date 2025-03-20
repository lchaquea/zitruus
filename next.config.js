/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    // Speed up build by not checking types during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Speed up build by not running eslint during build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['dl.airtable.com'],
    unoptimized: true, // Required for static export
  },
  // Add any other domains you need to load images from
  // Specify that the app is in the src directory
  distDir: '.next'
}

module.exports = nextConfig 