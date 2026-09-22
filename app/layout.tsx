/**
 * app/layout.tsx
 *
 * Layout raiz da aplicação Next.js (App Router).
 * Define as fontes globais, metadata de SEO e a estrutura HTML base.
 */
import type { Metadata } from "next";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import MusicPlayer from "@/components/MusicPlayer";
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
 * Fonte Script: Dancing Script
 * Usada em detalhes "manuscritos" — envelope de abertura, selo, acentos.
 */
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

/**
 * Metadata de SEO — altere com as informações reais do casamento.
 * O Next.js App Router usa este objeto para gerar as meta tags automaticamente.
 */
export const metadata: Metadata = {
  title: "Casamento de Carolinne & Gabriel — 10 de Abril de 2027",
  description:
    "Você está convidado para celebrar o amor de Carolinne e Gabriel. Confirme sua presença e veja todos os detalhes do nosso grande dia.",
  keywords: ["casamento", "convite", "Carolinne e Gabriel", "2027"],
  openGraph: {
    title: "Casamento de Carolinne & Gabriel",
    description: "10 de abril de 2027 — Um dia para lembrar para sempre.",
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
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} ${dancingScript.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-white text-gray-900">
        {/* CartProvider torna o estado do carrinho acessível em toda a aplicação */}
        <CartProvider>{children}</CartProvider>
        {/* Música de fundo — fica fora do CartProvider pois não precisa do carrinho */}
        <MusicPlayer />
      </body>
    </html>
  );
}
