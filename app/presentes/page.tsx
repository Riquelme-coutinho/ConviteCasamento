/**
 * app/presentes/page.tsx
 *
 * Página dedicada à lista de presentes.
 * Rota: /presentes
 *
 * Funcionalidades:
 *   - Grid responsivo de cards de presentes
 *   - Filtro por categoria
 *   - Botão "Adicionar ao carrinho" com feedback visual
 *   - Botão flutuante do carrinho com badge de quantidade
 *   - CartDrawer deslizante com resumo e checkout
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  ArrowLeft,
  Heart,
  CheckCircle2,
  SlidersHorizontal,
  Gift as GiftIcon,
  Home,
  ChefHat,
  Plane,
  Sparkles,
} from "lucide-react";
import { gifts, categoryLabel, formatBRL, type Gift, type GiftCategory } from "@/data/gifts";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Reveal from "@/components/Reveal";

// Categorias disponíveis para o filtro
type FilterValue = GiftCategory | "todas";

const filterOptions: { value: FilterValue; label: string }[] = [
  { value: "todas", label: "🎁 Todos" },
  { value: "lar", label: "🏠 Lar" },
  { value: "cozinha", label: "🍳 Cozinha" },
  { value: "viagem", label: "✈️ Viagem" },
  { value: "experiência", label: "✨ Experiência" },
  { value: "presente", label: "💳 Presente" },
];

export default function PresentesPage() {
  const { addItem, isInCart, totalItems, totalPrice } = useCart();

  // Estado do filtro de categoria
  const [activeFilter, setActiveFilter] = useState<FilterValue>("todas");

  // Estado do carrinho (drawer aberto/fechado)
  const [drawerOpen, setDrawerOpen] = useState(false);

  // IDs dos presentes que acabaram de ser adicionados (para animação de feedback)
  const [justAdded, setJustAdded] = useState<Set<number>>(new Set());

  /**
   * Adiciona ao carrinho e exibe feedback visual por 1.5s.
   */
  const handleAdd = (gift: (typeof gifts)[number]) => {
    addItem(gift);
    setJustAdded((prev) => new Set(prev).add(gift.id));
    setTimeout(() => {
      setJustAdded((prev) => {
        const next = new Set(prev);
        next.delete(gift.id);
        return next;
      });
    }, 1500);
  };

  // Filtra os presentes pela categoria selecionada
  const filteredGifts =
    activeFilter === "todas"
      ? gifts
      : gifts.filter((g) => g.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-white">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm [transform:translateZ(0)] [will-change:transform]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Voltar */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 text-gray-500 hover:text-rose-500 transition-colors text-sm font-medium whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Voltar ao convite</span>
            <span className="sm:hidden">Voltar</span>
          </Link>

          {/* Título */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Heart className="w-4 h-4 shrink-0 text-rose-400 fill-rose-400 hidden sm:block" />
            <h1 className="font-serif text-base sm:text-lg font-bold text-gray-800 whitespace-nowrap truncate">
              Lista de Presentes
            </h1>
          </div>

          {/* Ícone do carrinho */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-3 sm:px-4 py-2 text-sm font-semibold transition-all hover:scale-105 active:scale-95 shrink-0"
            aria-label={`Abrir carrinho com ${totalItems} itens`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {totalItems > 0 && (
              <span className="bg-white text-rose-500 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Hero da página ──────────────────────────────────── */}
      <Reveal className="text-center pt-12 pb-8 px-4">
        <span className="text-rose-400 text-sm font-medium uppercase tracking-[0.3em]">
          ❤ Com carinho
        </span>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-gray-800">
          Escolha um Presente
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-rose-200" />
          <span className="text-rose-300">✦</span>
          <div className="h-px w-12 bg-rose-200" />
        </div>
        <p className="mt-5 text-gray-500 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
          A sua presença já é o maior presente. Mas se quiser nos surpreender,
          escolha um item abaixo — pode pagar via <strong>Pix</strong> ou{" "}
          <strong>cartão de crédito</strong>.
        </p>
      </Reveal>

      {/* ── Filtros ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 mr-1" />
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === opt.value
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200 scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:text-rose-500 hover:scale-105"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid de presentes ───────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {filteredGifts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-serif">Nenhum presente nesta categoria ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGifts.map((gift, index) => {
              const added = justAdded.has(gift.id);
              const inCart = isInCart(gift.id);

              return (
                <Reveal key={gift.id} delay={(index % 4) * 75}>
                <article
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-rose-200/50 transition-all duration-300 hover:-translate-y-1.5 border border-gray-100"
                >
                  {/* Imagem (ou card de valor, para presentes sem foto) */}
                  <div className="relative h-56 bg-gray-50 overflow-hidden">
                    {gift.imagePath ? (
                      <Image
                        src={gift.imagePath}
                        alt={gift.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                      />
                    ) : (
                      <GiftPlaceholderVisual gift={gift} />
                    )}
                    {/* Badge de categoria */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
                      {categoryLabel[gift.category]}
                    </div>
                    {/* Badge "No carrinho" */}
                    {inCart && (
                      <div className="absolute top-3 right-3 bg-rose-500 text-white rounded-full px-2.5 py-1 text-xs font-bold flex items-center gap-1 shadow">
                        <CheckCircle2 className="w-3 h-3" />
                        No carrinho
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-gray-800 leading-tight mb-1">
                      {gift.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {gift.description}
                    </p>

                    {/* Rodapé: preço + botão */}
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs text-gray-400">Valor</p>
                        <p className="text-xl font-bold text-rose-500">
                          {formatBRL(gift.priceInCents)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAdd(gift)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                          added
                            ? "bg-green-500 text-white scale-95"
                            : inCart
                            ? "bg-rose-100 text-rose-600 hover:bg-rose-200"
                            : "bg-rose-500 text-white hover:bg-rose-600 hover:scale-105"
                        }`}
                      >
                        {added ? (
                          <><CheckCircle2 className="w-4 h-4" /> Adicionado!</>
                        ) : inCart ? (
                          <><Plus className="w-4 h-4" /> Adicionar mais</>
                        ) : (
                          <><ShoppingBag className="w-4 h-4" /> Adicionar</>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Botão flutuante do carrinho (mobile) ────────────── */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-30 sm:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-3 bg-rose-500 text-white rounded-2xl px-5 py-3.5 shadow-2xl shadow-rose-300 hover:bg-rose-600 transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-bold text-sm">{totalItems} {totalItems === 1 ? "item" : "itens"}</span>
            <span className="font-semibold text-rose-200 text-sm">
              {formatBRL(totalPrice)}
            </span>
          </button>
        </div>
      )}

      {/* Drawer do carrinho */}
      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

// Componente Plus inline para o botão
function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

// Ícone representativo de cada categoria, usado quando o presente não tem foto própria
const categoryIcon: Record<GiftCategory, typeof GiftIcon> = {
  lar: Home,
  cozinha: ChefHat,
  viagem: Plane,
  experiência: Sparkles,
  presente: GiftIcon,
};

/**
 * Visual usado no lugar da foto para presentes sem imagem própria.
 * Cartões-presente (valor fixo) mostram o valor em destaque; os demais
 * mostram o ícone da categoria + o título do presente.
 */
function GiftPlaceholderVisual({ gift }: { gift: Gift }) {
  const Icon = categoryIcon[gift.category];

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-rose-50 via-rose-100 to-amber-50">
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-amber-200/40 blur-2xl" aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-rose-200/50 blur-2xl" aria-hidden="true" />
      {gift.category === "presente" ? (
        <div className="relative text-center">
          <Icon className="w-6 h-6 text-rose-400 mx-auto mb-2" aria-hidden="true" />
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-1">
            Cartão Presente
          </p>
          <p className="text-4xl font-serif font-bold text-rose-500">
            {formatBRL(gift.priceInCents)}
          </p>
        </div>
      ) : (
        <div className="relative text-center px-6">
          <Icon className="w-8 h-8 text-rose-400 mx-auto mb-3" aria-hidden="true" />
          <p className="font-serif text-base font-semibold text-gray-700 leading-snug">
            {gift.title}
          </p>
        </div>
      )}
    </div>
  );
}
