import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite usar imagens da pasta /public com o componente next/image
  images: {
    remotePatterns: [],
    // Desabilita a otimização de imagens para simplificar o dev local
    // Em produção, remova esta linha para habilitar a otimização
    unoptimized: true,
  },
};

export default nextConfig;
