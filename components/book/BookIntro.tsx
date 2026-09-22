/**
 * components/book/BookIntro.tsx
 *
 * Tela de abertura do convite: um envelope de papel com um selo de cera
 * (monograma do casal). Ao tocar no selo, a aba do envelope dobra para
 * trás revelando o convite, que então transiciona para o livro.
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

interface BookIntroProps {
  bride: string;
  groom: string;
  onOpen: () => void;
}

export default function BookIntro({ bride, groom, onOpen }: BookIntroProps) {
  const [opening, setOpening] = useState(false);
  const initials = `${bride[0]}${groom[0]}`.toUpperCase();

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 950);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-100 via-amber-50 to-rose-50 transition-opacity duration-500 ${
        opening ? "opacity-0 pointer-events-none delay-500" : "opacity-100"
      }`}
    >
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-rose-200/30 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-16 right-10 w-56 h-56 rounded-full bg-amber-200/30 blur-3xl" aria-hidden="true" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <p className="font-script text-2xl sm:text-3xl text-rose-500 mb-6">
          Você foi convidado(a)
        </p>

        {/* Envelope */}
        <div
          className="relative w-64 h-44 sm:w-72 sm:h-48"
          style={{ perspective: "1200px" }}
        >
          {/* Corpo do envelope */}
          <div className="absolute inset-0 rounded-md bg-white shadow-xl shadow-rose-900/10 border border-rose-100 overflow-hidden">
            {/* "carta" que espia por dentro, sugerindo o conteúdo */}
            <div className="absolute inset-x-3 bottom-3 top-10 rounded-sm bg-gradient-to-b from-rose-50 to-white border border-rose-100/70 flex items-start justify-center pt-3">
              <span className="font-names text-xl sm:text-2xl text-gray-500">
                {bride} &amp; {groom}
              </span>
            </div>
            {/* Dobras laterais inferiores do envelope */}
            <div
              className="absolute left-0 bottom-0 w-1/2 h-1/2 border-b-[88px] border-l-[128px] border-b-transparent border-l-rose-50"
              aria-hidden="true"
            />
            <div
              className="absolute right-0 bottom-0 w-1/2 h-1/2 border-b-[88px] border-r-[128px] border-b-transparent border-r-rose-50"
              style={{ transform: "scaleX(-1)" }}
              aria-hidden="true"
            />
          </div>

          {/* Aba triangular (dobra do topo) — gira para trás ao abrir */}
          <div
            className={`absolute inset-x-0 top-0 h-1/2 envelope-flap ${
              opening ? "envelope-flap-open" : ""
            }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background:
                "linear-gradient(155deg, var(--color-rose-100), var(--color-amber-100))",
            }}
            aria-hidden="true"
          />

          {/* Selo — botão de abrir, com o monograma do casal */}
          <button
            onClick={handleOpen}
            aria-label="Abrir convite"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full overflow-hidden shadow-lg shadow-rose-900/30 border-2 border-rose-300/50 animate-seal-pulse bg-[#faf3ec]"
          >
            <Image
              src="/monograma_cg.png"
              alt={`Monograma ${initials}`}
              fill
              className="object-cover"
              sizes="72px"
              priority
            />
          </button>
        </div>

        <p className="mt-8 flex items-center gap-2 text-rose-400 text-sm font-medium">
          <Heart className="w-3.5 h-3.5 fill-rose-400" aria-hidden="true" />
          Toque no selo para abrir
          <Heart className="w-3.5 h-3.5 fill-rose-400" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
