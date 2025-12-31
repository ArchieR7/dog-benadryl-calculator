/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 優化設定
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // 啟用嚴格模式
  reactStrictMode: true,
}

export default nextConfig
