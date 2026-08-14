import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statik export: `npm run build` -> out/ klasörü. Herhangi bir hostinge
  // (Netlify, cPanel, GitHub Pages) olduğu gibi atılır, Node sunucusu gerekmez.
  output: "export",
  // Statik export'ta Next'in görsel optimizasyon sunucusu çalışmaz;
  // görseller scripts/optimize-images.sh ile derleme öncesi küçültülür.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
