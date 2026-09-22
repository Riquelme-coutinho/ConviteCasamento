/**
 * components/book/pages/MenuPage.tsx
 *
 * Página de atalhos do livro: um pequeno "sumário visual" com ícones,
 * no estilo dos convites digitais em formato de livro — toque em um
 * ícone para pular direto para aquela página, ou abrir um link externo
 * (mapa, WhatsApp, lista de presentes).
 */
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageShell from "../PageShell";
import {
  BookHeart,
  Images,
  MapPin,
  CalendarCheck,
  Gift,
  MessageCircle,
} from "lucide-react";

interface MenuPageProps {
  bride: string;
  groom: string;
  whatsapp: string;
  mapsLink: string;
  onNavigate: (id: string) => void;
}

export default function MenuPage({ bride, groom, whatsapp, mapsLink, onNavigate }: MenuPageProps) {
  return (
    <PageShell>
      <div className="min-h-full flex flex-col items-center justify-center bg-white px-6 py-16">
        <Reveal className="text-center mb-10">
          <span className="text-rose-400 text-sm font-medium uppercase tracking-[0.3em]">
            ✦ Toque nos ícones ✦
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-gray-800">
            Para interagir
          </h2>
          <p className="mt-3 text-gray-500 text-sm max-w-xs mx-auto">
            {bride} &amp; {groom} preparam cada detalhe com carinho para você
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <MenuIconLink pageId="historia" onNavigate={onNavigate} Icon={BookHeart} label="Nossa história" />
          <MenuIconLink pageId="galeria" onNavigate={onNavigate} Icon={Images} label="Galeria" />
          <MenuIconLink pageId="local" onNavigate={onNavigate} Icon={MapPin} label="Como chegar" />
          <MenuIconLink pageId="confirmar" onNavigate={onNavigate} Icon={CalendarCheck} label="Confirmar presença" />
          <MenuIconLink href="/presentes" Icon={Gift} label="Presentear" external />
          <MenuIconLink
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
            Icon={MessageCircle}
            label="Fale conosco"
            external
          />
        </div>

        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 text-xs text-amber-600 font-medium hover:text-amber-700 transition-colors"
        >
          Ver local no Google Maps →
        </a>
      </div>
    </PageShell>
  );
}

/**
 * Botão de atalho: com `pageId` navega dentro do livro via `onNavigate`;
 * com `href` (+ `external`) é um link externo/rota normal.
 */
function MenuIconLink({
  href,
  pageId,
  onNavigate,
  Icon,
  label,
  external,
}: {
  href?: string;
  pageId?: string;
  onNavigate?: (id: string) => void;
  Icon: typeof MapPin;
  label: string;
  external?: boolean;
}) {
  const commonClasses =
    "group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-rose-100 bg-rose-50/60 py-6 px-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100 hover:bg-rose-50";

  const inner = (
    <>
      <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-rose-500" aria-hidden="true" />
      </div>
      <span className="text-xs font-semibold text-gray-700">{label}</span>
    </>
  );

  if (external && href) {
    return (
      <Link
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={commonClasses}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => pageId && onNavigate?.(pageId)}
      className={commonClasses}
    >
      {inner}
    </button>
  );
}
