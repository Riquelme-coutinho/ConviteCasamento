/**
 * app/layout.tsx
 *
 * Layout raiz da aplicação Next.js (App Router).
 * Define as fontes globais, metadata de SEO e a estrutura HTML base.
 */
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

/**
 * Fonte Serif: Playfair Display
 * Usada para títulos e nomes — transmite elegância e tradição.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

/**
 * Fonte Sans-Serif: Inter
 * Usada para corpo de texto — moderna, legível e limpa.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Metadata de SEO — altere com as informações reais do casamento.
 * O Next.js App Router usa este objeto para gerar as meta tags automaticamente.
 */
export const metadata: Metadata = {
  title: "Casamento de Carol & Gabriel — 14 de Novembro de 2026",
  description:
    "Você está convidado para celebrar o amor de Lucas e Beatriz. Confirme sua presença e veja todos os detalhes do nosso grande dia.",
  keywords: ["casamento", "convite", "Lucas e Beatriz", "2026"],
  openGraph: {
    title: "Casamento de Carol & Gabriel",
    description: "14 de novembro de 2026 — Um dia para lembrar para sempre.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-white text-gray-900">
        {/* CartProvider torna o estado do carrinho acessível em toda a aplicação */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
