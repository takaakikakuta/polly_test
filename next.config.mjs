/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // ビルド時に ESLint エラーがあっても処理を中断しない
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;