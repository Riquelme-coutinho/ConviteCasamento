/**
 * components/GiftList.tsx
 *
 * Seção de Lista de Presentes.
 * Renderiza os presentes dinamicamente com .map() a partir de data/gifts.ts.
 *
 * É um Client Component pois gerencia o estado do modal com useState.
 *
 * Hooks utilizados:
 *   - useState<Gift | null>: armazena qual presente foi selecionado.
 *     Quando null → modal fechado. Quando Gift → modal aberto com aquele presente.
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Gift as LucideGift, ShoppingBag } from "lucide-react";
import { gifts, Gift, formatBRL } from "@/data/gifts";
import Modal from "./Modal";

// Mapa de ícones de categoria para cada tipo de presente
const categoryLabel: Record<Gift["category"], string> = {
  lar: "🏠 Lar",
  viagem: "✈️ Viagem",
  experiência: "✨ Experiência",
  cozinha: "🍳 Cozinha",
};

export default function GiftList() {
  /**
   * useState: controla qual presente está selecionado.
   *
   * - selectedGift === null  → modal fechado (estado inicial)
   * - selectedGift === Gift  → modal aberto exibindo aquele presente
   *
   * Passar o objeto Gift completo para o Modal evita a necessidade
   * de uma segunda busca pelo id.
   */
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  return (
    <section
      id="presentes"
      className="scroll-mt-16 py-20 sm:py-32 bg-gradient-to-b from-rose-50/50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-rose-400 text-sm font-medium uppercase tracking-[0.3em]">
            ❤ Com carinho
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-gray-800">
            Lista de Presentes
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose-200" />
            <span className="text-rose-300">✦</span>
            <div className="h-px w-12 bg-rose-200" />
          </div>
          <p className="mt-6 text-gray-500 max-w-xl mx-auto leading-relaxed">
            A sua presença já é o maior presente. Mas se quiser nos presentear,
            escolha um item abaixo e pague via Pix de forma simples e segura.
          </p>
        </div>

        {/* Grid de cards de presentes */}
        {/* Renderização dinâmica via .map() — os dados vêm de data/gifts.ts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gifts.map((gift) => (
            <article
              key={gift.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Imagem do presente */}
              <div className="relative h-52 overflow-hidden bg-gray-50">
                <Image
                  src={gift.imagePath}
                  alt={gift.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Badge da categoria */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                  {categoryLabel[gift.category]}
                </div>
              </div>

              {/* Informações do presente */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-lg font-bold text-gray-800 leading-tight">
                    {gift.title}
                  </h3>
                  <LucideGift
                    className="w-5 h-5 text-rose-300 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {gift.description}
                </p>

                {/* Rodapé do card: valor + botão */}
                <div className="flex items-center justify-between">
                  {/* Valor formatado em BRL usando o utilitário de data/gifts.ts */}
                  <span className="text-2xl font-bold text-rose-500">
                    {formatBRL(gift.priceInCents)}
                  </span>

                  {/* Botão "Presentear" — ao clicar, abre o Modal com este presente */}
                  <button
                    onClick={() => setSelectedGift(gift)}
                    className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                    aria-label={`Presentear com ${gift.title}`}
                  >
                    <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                    Presentear
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Nota de rodapé */}
        <p className="text-center mt-10 text-sm text-gray-400">
          🔒 Pagamentos processados com segurança via Pix
        </p>
      </div>

      {/*
       * Modal de pagamento via Pix.
       * Passamos selectedGift (pode ser null) e o callback onClose.
       * O Modal se auto-gerencia: renderiza apenas quando gift !== null.
       */}
      <Modal
        gift={selectedGift}
        onClose={() => setSelectedGift(null)}
      />
    </section>
  );
}
