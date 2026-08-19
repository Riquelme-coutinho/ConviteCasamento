/**
 * data/gifts.ts
 *
 * Dados estáticos da lista de presentes.
 *
 * Para ADICIONAR um presente:
 *   1. Copie um bloco { id, title, ... } e cole abaixo
 *   2. Coloque uma imagem em /public/ e aponte no campo imagePath
 *   3. Preencha paymentLink com seu link do Mercado Pago, PagSeguro, etc.
 *
 * Para EDITAR o link de pagamento:
 *   - Preencha o campo `paymentLink` de cada presente com a URL real
 *   - Deixe "" para mostrar apenas Pix naquele item
 */

// ────────────────────────────────────────────────────────────
// TIPOS
// ────────────────────────────────────────────────────────────

export type GiftCategory = "lar" | "viagem" | "experiência" | "cozinha";

export interface Gift {
  id: number;
  title: string;
  description: string;
  /** Caminho relativo à pasta /public */
  imagePath: string;
  /** Valor em centavos — evita problemas de ponto flutuante (ex: 35000 = R$350,00) */
  priceInCents: number;
  category: GiftCategory;
  /**
   * Link externo de pagamento (Mercado Pago, PagSeguro, Stripe, etc.)
   * Deixe "" para exibir apenas a opção Pix no modal.
   */
  paymentLink: string;
}

// ────────────────────────────────────────────────────────────
// DADOS — edite aqui!
// ────────────────────────────────────────────────────────────

export const gifts: Gift[] = [
  {
    id: 1,
    title: "Conjunto de Taças de Cristal",
    description:
      "Taças de cristal lapidado para os brindes mais especiais da nossa nova vida.",
    imagePath: "/gift_chalice.png",
    priceInCents: 35000,
    category: "lar",
    // Cole aqui o link do seu Mercado Pago / PagSeguro para este item:
    paymentLink: "",
  },
  {
    id: 2,
    title: "Jogo de Cama King Premium",
    description:
      "Lençóis de algodão 400 fios, maciez hoteleira para cada manhã a dois.",
    imagePath: "/gift_sheets.png",
    priceInCents: 52000,
    category: "lar",
    paymentLink: "",
  },
  {
    id: 3,
    title: "Kit de Panelas Inox",
    description:
      "Bateria completa de panelas em aço inoxidável para cozinharmos com amor.",
    imagePath: "/gift_kitchen.png",
    priceInCents: 89000,
    category: "cozinha",
    paymentLink: "",
  },
  {
    id: 4,
    title: "Lua de Mel dos Sonhos",
    description:
      "Contribuição para nossa viagem inesquecível a Maldivas — o melhor presente é a memória!",
    imagePath: "/gift_honeymoon.png",
    priceInCents: 150000,
    category: "viagem",
    paymentLink: "",
  },
];

// ────────────────────────────────────────────────────────────
// UTILITÁRIOS
// ────────────────────────────────────────────────────────────

/** Formata centavos para BRL. Ex: 35000 → "R$ 350,00" */
export function formatBRL(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

/** Labels de categoria para exibição nos badges */
export const categoryLabel: Record<GiftCategory, string> = {
  lar: "🏠 Lar",
  viagem: "✈️ Viagem",
  experiência: "✨ Experiência",
  cozinha: "🍳 Cozinha",
};
