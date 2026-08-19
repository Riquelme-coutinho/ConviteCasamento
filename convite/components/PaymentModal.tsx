/**
 * components/PaymentModal.tsx
 *
 * Modal de pagamento com duas abas: Pix e Cartão.
 *
 * Props:
 *   - isOpen: controla visibilidade
 *   - onClose: callback para fechar
 *   - totalPrice: valor total em centavos
 *   - paymentLink: URL externa para pagamento com cartão (pode ser "")
 *   - onSuccess: callback chamado após o usuário finalizar
 */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  Copy,
  Check,
  CreditCard,
  QrCode,
  ExternalLink,
  ShoppingBag,
} from "lucide-react";
import { formatBRL } from "@/data/gifts";

// ────────────────────────────────────────────────────────────
// CONFIGURAÇÃO — edite aqui
// ────────────────────────────────────────────────────────────

/** Chave Pix dos noivos */
const PIX_KEY = "casamento@emaildosnoivos.com.br";

/**
 * Link de pagamento padrão (fallback).
 * Cada presente pode ter seu próprio link em data/gifts.ts.
 * Se nenhum link for fornecido, este é usado.
 */
const DEFAULT_PAYMENT_LINK = "casamento@emaildosnoivos.com.br";

// ────────────────────────────────────────────────────────────

type PaymentTab = "pix" | "card";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  /** Link de pagamento com cartão — se "", oculta a aba Cartão */
  paymentLink?: string;
  onSuccess?: () => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  totalPrice,
  paymentLink = DEFAULT_PAYMENT_LINK,
  onSuccess,
}: PaymentModalProps) {
  const [activeTab, setActiveTab] = useState<PaymentTab>("pix");
  const [copied, setCopied] = useState(false);

  const hasCardLink = Boolean(paymentLink);

  /** Fecha com tecla ESC */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /** Bloqueia scroll do body enquanto aberto */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyPix = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCardPayment = () => {
    window.open(paymentLink, "_blank", "noopener,noreferrer");
    onSuccess?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <div
        className="relative w-full sm:max-w-md bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Faixa top decorativa */}
        <div className="h-1.5 bg-gradient-to-r from-rose-400 via-rose-300 to-amber-400" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h2 id="payment-modal-title" className="font-serif font-bold text-gray-800 text-lg leading-tight">
                Finalizar Presente
              </h2>
              <p className="text-rose-500 font-bold text-base">{formatBRL(totalPrice)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Abas de pagamento */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("pix")}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all border-b-2 ${
              activeTab === "pix"
                ? "border-rose-500 text-rose-500 bg-rose-50/50"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <QrCode className="w-4 h-4" />
            Pix
          </button>

          {/* Aba Cartão — sempre visível */}
          <button
            onClick={() => setActiveTab("card")}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all border-b-2 ${
              activeTab === "card"
                ? "border-rose-500 text-rose-500 bg-rose-50/50"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Cartão
          </button>
        </div>

        {/* Conteúdo das abas */}
        <div className="p-6">

          {/* ── Aba PIX ─────────────────────────────────── */}
          {activeTab === "pix" && (
            <div className="flex flex-col items-center gap-5">
              {/* QR Code */}
              <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-4 border-rose-100 shadow-lg">
                <Image
                  src="/qr_pix.png"
                  alt="QR Code Pix"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Abra o app do seu banco e escaneie o QR Code
              </p>

              {/* Chave Pix copiável */}
              <div className="w-full">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Ou copie a chave Pix
                </p>
                <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl p-3">
                  <span className="flex-1 text-sm text-gray-700 font-mono truncate">
                    {PIX_KEY}
                  </span>
                  <button
                    onClick={handleCopyPix}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-rose-500 text-white hover:bg-rose-600 active:scale-95"
                    }`}
                  >
                    {copied ? (
                      <><Check className="w-4 h-4" /> Copiado!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copiar</>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center">
                Após o pagamento, envie o comprovante no WhatsApp dos noivos 💕
              </p>
            </div>
          )}

          {/* ── Aba CARTÃO ───────────────────────────── */}
          {activeTab === "card" && (
            <div className="flex flex-col items-center gap-6 py-2">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-rose-500" />
              </div>

              <div className="text-center">
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-2">
                  Pagamento com Cartão
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {hasCardLink
                    ? "Você será redirecionado para a página de pagamento seguro. Aceitamos todas as bandeiras de cartão de crédito."
                    : "Para habilitar esta opção, adicione o link de pagamento no campo paymentLink em data/gifts.ts (Mercado Pago, PagSeguro, Stripe etc.)."
                  }
                </p>
              </div>

              {/* Bandeiras de cartão (decorativo) */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="bg-gray-100 rounded px-2 py-1 font-mono font-bold text-gray-500">VISA</span>
                <span className="bg-gray-100 rounded px-2 py-1 font-mono font-bold text-gray-500">Master</span>
                <span className="bg-gray-100 rounded px-2 py-1 font-mono font-bold text-gray-500">Elo</span>
                <span className="bg-gray-100 rounded px-2 py-1 font-mono font-bold text-gray-500">Amex</span>
              </div>

              <p className="text-xs text-gray-400 text-center flex items-center gap-1">
                🔒 Pagamento processado com segurança
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
