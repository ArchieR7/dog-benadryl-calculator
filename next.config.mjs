/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 靜態導出
  output: 'export',
  // 圖片優化設定（靜態導出不支援 next/image 優化）
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  // 啟用嚴格模式
  reactStrictMode: true,
  // 移除尾部斜線
  trailingSlash: false,
}

export default nextConfig
