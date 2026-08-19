/**
 * components/Gallery.tsx
 *
 * Seção de Galeria de Fotos com grid responsivo.
 *
 * Layout:
 *   - Mobile: 1 coluna
 *   - Tablet (md): 2 colunas
 *   - Desktop (lg): 3 colunas
 *
 * Efeitos:
 *   - hover:scale-105 com transition suave
 *   - Overlay com legenda ao fazer hover
 */
import Image from "next/image";

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
  return (
    <section
      id="galeria"
      className="scroll-mt-16 py-20 sm:py-32 bg-gray-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho da seção */}
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
            que carregamos no coração.
          </p>
        </div>

        {/* Grid de fotos responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`
                group relative overflow-hidden rounded-2xl cursor-pointer
                ${photo.featured ? "md:row-span-1 lg:row-span-1" : ""}
              `}
              style={{ aspectRatio: photo.featured ? "4/3" : "1/1" }}
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
          ))}
        </div>
      </div>
    </section>
  );
}
