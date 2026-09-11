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

export type GiftCategory = "lar" | "viagem" | "experiência" | "cozinha" | "presente";

export interface Gift {
  id: number;
  title: string;
  description: string;
  /** Caminho relativo à pasta /public. Vazio para "presente" — usa um card de valor em vez de foto. */
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
  // Cartões-presente: sem foto, exibidos como um card de valor (ver PresentCard em app/presentes/page.tsx)
  {
    id: 5,
    title: "Cartão Presente de R$100",
    description: "Contribua com esse valor para o começo da nossa vida a dois.",
    imagePath: "",
    priceInCents: 10000,
    category: "presente",
    paymentLink: "",
  },
  {
    id: 6,
    title: "Cartão Presente de R$200",
    description: "Contribua com esse valor para o começo da nossa vida a dois.",
    imagePath: "",
    priceInCents: 20000,
    category: "presente",
    paymentLink: "",
  },
  {
    id: 7,
    title: "Cartão Presente de R$300",
    description: "Contribua com esse valor para o começo da nossa vida a dois.",
    imagePath: "",
    priceInCents: 30000,
    category: "presente",
    paymentLink: "",
  },
  {
    id: 8,
    title: "Cartão Presente de R$400",
    description: "Contribua com esse valor para o começo da nossa vida a dois.",
    imagePath: "",
    priceInCents: 40000,
    category: "presente",
    paymentLink: "",
  },
  // Presentes adicionais (ilustrações próprias em /public/gift_*.svg)
  {
    id: 9,
    title: "Air Fryer Digital 5L",
    description:
      "Fritadeira elétrica sem óleo, para receitas mais leves no dia a dia do casal.",
    imagePath: "/gift_airfryer.svg",
    priceInCents: 34990,
    category: "cozinha",
    paymentLink: "",
  },
  {
    id: 10,
    title: "Jogo de Facas Profissional",
    description:
      "Conjunto de facas em aço inox com suporte de madeira — precisão para o dia a dia na cozinha.",
    imagePath: "/gift_knives.svg",
    priceInCents: 25900,
    category: "cozinha",
    paymentLink: "",
  },
  {
    id: 11,
    title: "Cafeteira Espresso Automática",
    description:
      "Cafezinho fresquinho e bem tirado toda manhã, sem sair de casa.",
    imagePath: "/gift_coffeemaker.svg",
    priceInCents: 89900,
    category: "cozinha",
    paymentLink: "",
  },
  {
    id: 12,
    title: "Aspirador de Pó Robô",
    description:
      "Ajuda a manter a casa nova sempre em ordem, com mais tempo livre para o casal.",
    imagePath: "/gift_vacuum.svg",
    priceInCents: 129900,
    category: "lar",
    paymentLink: "",
  },
  {
    id: 13,
    title: "Kit Jogo de Toalhas de Banho",
    description:
      "Toalhas macias em algodão egípcio, para o banho mais confortável do dia.",
    imagePath: "/gift_towels.svg",
    priceInCents: 18990,
    category: "lar",
    paymentLink: "",
  },
  {
    id: 14,
    title: "Luminária de Mesa Decorativa",
    description: "Um toque de aconchego e estilo para a nova casa do casal.",
    imagePath: "/gift_lamp.svg",
    priceInCents: 12990,
    category: "lar",
    paymentLink: "",
  },
  {
    id: 15,
    title: "Mala de Viagem Executiva",
    description:
      "Resistente e elegante, pronta para as próximas aventuras a dois.",
    imagePath: "/gift_suitcase.svg",
    priceInCents: 44990,
    category: "viagem",
    paymentLink: "",
  },
  {
    id: 16,
    title: "Kit Necessaire de Viagem",
    description:
      "Organização completa para levar o essencial em qualquer viagem.",
    imagePath: "/gift_necessaire.svg",
    priceInCents: 9990,
    category: "viagem",
    paymentLink: "",
  },
  {
    id: 17,
    title: "Jantar Romântico a Dois",
    description:
      "Uma noite especial só para vocês dois, para celebrar o início dessa nova fase.",
    imagePath: "/gift_dinner.svg",
    priceInCents: 35000,
    category: "experiência",
    paymentLink: "",
  },
  {
    id: 18,
    title: "Day Spa para o Casal",
    description:
      "Um dia de relaxamento e cuidado a dois, longe da correria do dia a dia.",
    imagePath: "/gift_spa.svg",
    priceInCents: 48000,
    category: "experiência",
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
  presente: "💳 Presente",
};
