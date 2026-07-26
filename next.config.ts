import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    // Allow any local images from public/
    remotePatterns: [],
  },
  // Compress responses
  compress: true,
}

export default nextConfig
