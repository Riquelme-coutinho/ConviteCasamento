/**
 * components/CartDrawer.tsx
 *
 * Gaveta lateral do carrinho de presentes.
 * Desliza da direita ao clicar no botão flutuante.
 *
 * Usa o hook useCart() para ler e modificar o estado global.
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Gift,
  HeartHandshake,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBRL } from "@/data/gifts";
import PaymentModal from "./PaymentModal";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, totalPrice, removeItem, increment, decrement, clearCart } =
    useCart();

  // Controla se o modal de pagamento está aberto
  const [paymentOpen, setPaymentOpen] = useState(false);

  /**
   * Pega o paymentLink do primeiro item do carrinho como fallback.
   * Idealmente o usuário escolhe um link por compra.
   */
  const paymentLink = items[0]?.gift.paymentLink ?? "";

  const handleCheckout = () => {
    setPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentOpen(false);
    clearCart();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrinho de presentes"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-rose-500" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <h2 className="font-serif text-xl font-bold text-gray-800">
              Meu Carrinho
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            // Estado vazio
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center">
                <Gift className="w-10 h-10 text-rose-300" />
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-gray-700">
                  Carrinho vazio
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Adicione presentes para o casal e surpreenda!
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 text-rose-500 text-sm font-semibold hover:underline"
              >
                Ver presentes →
              </button>
            </div>
          ) : (
            // Lista de itens
            <ul className="divide-y divide-gray-50 px-5 py-3">
              {items.map(({ gift, quantity }) => (
                <li key={gift.id} className="py-4 flex gap-4">
                  {/* Imagem */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50">
                    <Image
                      src={gift.imagePath}
                      alt={gift.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm leading-tight truncate">
                      {gift.title}
                    </p>
                    <p className="text-rose-500 font-bold text-base mt-1">
                      {formatBRL(gift.priceInCents * quantity)}
                    </p>
                    {quantity > 1 && (
                      <p className="text-xs text-gray-400">
                        {formatBRL(gift.priceInCents)} × {quantity}
                      </p>
                    )}

                    {/* Controles de quantidade */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decrement(gift.id)}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="text-sm font-bold text-gray-700 w-5 text-center tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => increment(gift.id)}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>

                      <button
                        onClick={() => removeItem(gift.id)}
                        className="ml-auto w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer com total e botão de checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 bg-white space-y-4">
            {/* Resumo */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                {totalItems} {totalItems === 1 ? "presente" : "presentes"}
              </span>
              <div className="text-right">
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatBRL(totalPrice)}
                </p>
              </div>
            </div>

            {/* Botão principal */}
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-xl py-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-rose-200"
            >
              <HeartHandshake className="w-5 h-5" />
              Presentear os Noivos
            </button>

            {/* Limpar carrinho */}
            <button
              onClick={clearCart}
              className="w-full text-xs text-gray-400 hover:text-red-400 transition-colors py-1"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </aside>

      {/* Modal de pagamento */}
      <PaymentModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        totalPrice={totalPrice}
        paymentLink={paymentLink}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
}
