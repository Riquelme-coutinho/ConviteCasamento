/**
 * app/layout.tsx
 *
 * Layout raiz da aplicação Next.js (App Router).
 * Define as fontes globais, metadata de SEO e a estrutura HTML base.
 */
import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Pinyon_Script } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import MusicPlayer from "@/components/MusicPlayer";
import "./globals.css";

/**
 * Fonte Serif: Cormorant Garamond
 * Usada para títulos — serifada clássica e delicada, combina com a caligrafia.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/**
 * Fonte Sans-Serif: Montserrat
 * Usada para corpo de texto — leve, elegante e legível.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Fonte Script: Pinyon Script
 * Caligrafia clássica (copperplate) — nomes do casal e detalhes "manuscritos".
 */
const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
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
    <html lang="pt-BR" className={`${cormorant.variable} ${montserrat.variable} ${pinyonScript.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-white text-gray-900">
        {/* CartProvider torna o estado do carrinho acessível em toda a aplicação */}
        <CartProvider>{children}</CartProvider>
        {/* Música de fundo — fica fora do CartProvider pois não precisa do carrinho */}
        <MusicPlayer />
      </body>
    </html>
  );
}
