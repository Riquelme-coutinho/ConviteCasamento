/**
 * components/Gallery.tsx
 *
 * Seção de Galeria de Fotos com layout "bento" (fotos em destaque
 * ocupam duas colunas) e lightbox em tela cheia ao clicar.
 *
 * Layout:
 *   - Mobile: 1 coluna
 *   - Tablet (md): 2 colunas
 *   - Desktop (lg): 3 colunas, fotos "featured" ocupam 2 colunas
 *
 * Efeitos:
 *   - hover:scale-105 com transition suave
 *   - Overlay com legenda ao fazer hover
 *   - Reveal on scroll (fade + slide) escalonado por item
 *   - Clique abre lightbox com a imagem em tamanho grande
 */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Reveal from "./Reveal";

// Interface de cada foto da galeria
interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  caption: string;
  // Define fotos que ocupam mais espaço no grid
  featured?: boolean;
}

// Dados das fotos — mova para data/ se preferir
const photos: GalleryPhoto[] = [
  {
    id: 1,
    src: "/gallery_1.png",
    alt: "Casal ao pôr do sol na praia",
    caption: "Nosso primeiro pôr do sol juntos",
    featured: true,
  },
  {
    id: 2,
    src: "/gallery_2.png",
    alt: "Pedido de casamento no jardim florido",
    caption: "O momento do sim",
  },
  {
    id: 3,
    src: "/gallery_3.png",
    alt: "Mesa decorada para o evento",
    caption: "Nossa mesa dos sonhos",
  },
  {
    id: 4,
    src: "/gallery_4.png",
    alt: "Primeira dança do casal",
    caption: "Nossa primeira dança",
    featured: true,
  },
  {
    id: 5,
    src: "/gallery_5.png",
    alt: "Alianças de casamento",
    caption: "Os símbolos da nossa união",
  },
  {
    id: 6,
    src: "/gallery_6.png",
    alt: "Cerimônia ao ar livre",
    caption: "O altar dos nossos sonhos",
  },
];

export default function Gallery() {
  // Foto aberta no lightbox (null = fechado)
  const [openPhoto, setOpenPhoto] = useState<GalleryPhoto | null>(null);

  // Fecha com ESC e bloqueia o scroll do body enquanto o lightbox está aberto
  useEffect(() => {
    if (!openPhoto) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPhoto(null);
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [openPhoto]);

  return (
    <section
      id="galeria"
      className="scroll-mt-16 py-20 sm:py-32 bg-gray-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho da seção */}
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-rose-400 text-sm font-medium uppercase tracking-[0.3em]">
              ✦ Memórias
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white">
              Nossa Galeria
            </h2>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-rose-800" />
              <span className="text-rose-500">✦</span>
              <div className="h-px w-12 bg-rose-800" />
            </div>
            <p className="mt-6 text-gray-400 max-w-xl mx-auto leading-relaxed">
              Cada foto conta um trecho da nossa história. Momentos eternizados
              que carregamos no coração. Clique para ampliar.
            </p>
          </div>
        </Reveal>

        {/* Grid "bento" — fotos featured ocupam 2 colunas em telas sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <Reveal
              key={photo.id}
              delay={(index % 3) * 100}
              className={photo.featured ? "sm:col-span-2" : ""}
            >
              <div
                onClick={() => setOpenPhoto(photo)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer h-full"
                style={{ aspectRatio: photo.featured ? "2/1" : "1/1" }}
              >
                {/* Imagem com zoom suave no hover */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay gradiente que aparece no hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Legenda que desliza de baixo para cima no hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{photo.caption}</p>
                </div>

                {/* Borda brilhante sutil no hover */}
                <div className="absolute inset-0 border-2 border-rose-400/0 group-hover:border-rose-400/30 rounded-2xl transition-colors duration-300" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox — exibe a foto selecionada em tamanho grande */}
      {openPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style={{ backgroundColor: "rgba(5,8,12,0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setOpenPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={openPhoto.caption}
        >
          <button
            onClick={() => setOpenPhoto(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div
            className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={openPhoto.src}
              alt={openPhoto.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <p className="absolute bottom-6 left-0 right-0 text-center text-white/80 text-sm font-medium px-4">
            {openPhoto.caption}
          </p>
        </div>
      )}
    </section>
  );
}
