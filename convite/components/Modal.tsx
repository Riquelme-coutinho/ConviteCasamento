/**
 * components/Modal.tsx
 *
 * Componente de Modal reutilizável para o pagamento via Pix.
 * Recebe o presente selecionado e exibe a chave Pix + QR Code.
 *
 * Props:
 *   - gift: o presente selecionado (ou null quando fechado)
 *   - onClose: callback para fechar o modal
 */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Copy, Check, Heart } from "lucide-react";
import { Gift, formatBRL } from "@/data/gifts";

// Interface de props do Modal
interface ModalProps {
  gift: Gift | null;
  onClose: () => void;
}

// Chave Pix fictícia — substitua pela chave real do casal
const PIX_KEY = "casamento@emaildosnoivos.com.br";

export default function Modal({ gift, onClose }: ModalProps) {
  // Estado para controlar o feedback visual de "copiado!"
  const [copied, setCopied] = useState(false);

  /**
   * useEffect: fecha o modal ao pressionar ESC.
   * O array de dependências [onClose] garante que o event listener
   * sempre referencie a versão mais atual do callback.
   */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    // Cleanup: remove o listener ao desmontar o componente
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  /**
   * useEffect: bloqueia o scroll do body enquanto o modal está aberto.
   * Essencial para UX em mobile.
   */
  useEffect(() => {
    if (gift) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [gift]);

  // Se não há presente selecionado, não renderiza o modal
  if (!gift) return null;

  /**
   * Copia a chave Pix para o clipboard e exibe feedback visual por 2s.
   */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // Overlay: cobre toda a tela com backdrop blur
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose} // Fecha ao clicar fora do modal
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Conteúdo do modal — stopPropagation evita que o click feche ao clicar dentro */}
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Faixa decorativa superior */}
        <div className="h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400" />

        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Cabeçalho do modal */}
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span className="text-sm font-medium text-rose-500 uppercase tracking-widest">
              Presentear
            </span>
          </div>
          <h2
            id="modal-title"
            className="text-2xl font-serif font-bold text-gray-800 mb-1"
          >
            {gift.title}
          </h2>
          <p className="text-3xl font-bold text-rose-500 mb-6">
            {formatBRL(gift.priceInCents)}
          </p>

          {/* QR Code Pix */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-48 h-48 relative rounded-2xl overflow-hidden border-4 border-rose-100 shadow-lg">
              <Image
                src="/qr_pix.png"
                alt="QR Code Pix"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              Escaneie o QR Code com o app do seu banco
            </p>
          </div>

          {/* Campo de chave Pix copiável */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
              Chave Pix (e-mail)
            </p>
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl p-3">
              <span className="flex-1 text-sm text-gray-700 font-mono truncate">
                {PIX_KEY}
              </span>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-rose-500 text-white hover:bg-rose-600"
                }`}
                aria-label="Copiar chave Pix"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mensagem de gratidão */}
          <p className="text-center text-sm text-gray-500 leading-relaxed">
            Após o pagamento, é só mandar o comprovante para o WhatsApp dos
            noivos.{" "}
            <span className="text-rose-400">Muito obrigado! ❤️</span>
          </p>
        </div>
      </div>
    </div>
  );
}
