/**
 * components/book/pages/CoverPage.tsx
 *
 * Primeira página do livro — "capa" do convite: nomes do casal,
 * data, local e contagem regressiva. Equivalente ao antigo Hero,
 * adaptado para caber em uma única tela do livro (com scroll interno
 * caso necessário em telas baixas).
 */
import CountDown from "@/components/CountDown";
import Reveal from "@/components/Reveal";
import PageShell from "../PageShell";
import { MapPin, Calendar, ChevronRight } from "lucide-react";

interface CoverPageProps {
  bride: string;
  groom: string;
  weddingDate: string;
  weddingLocation: string;
  weddingTime: string;
}

export default function CoverPage({
  bride,
  groom,
  weddingDate,
  weddingLocation,
  weddingTime,
}: CoverPageProps) {
  const formattedDate = new Date(weddingDate + "T12:00:00").toLocaleDateString(
    "pt-BR",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <PageShell>
      <section className="relative min-h-full flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero_bg.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,10,10,0.35) 0%, rgba(30,10,15,0.55) 50%, rgba(20,5,10,0.75) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-rose-300/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-16 right-8 w-48 h-48 rounded-full bg-amber-300/10 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-rose-300 text-lg">❤</span>
              <span className="text-white/80 text-xs font-medium uppercase tracking-[0.2em]">
                Convite de Casamento
              </span>
              <span className="text-rose-300 text-lg">❤</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-names text-6xl font-normal text-white leading-tight mb-4 drop-shadow-2xl">
              {bride}
              <span className="font-serif text-gradient block text-2xl font-light italic my-2">
                &amp;
              </span>
              {groom}
            </h1>
          </Reveal>

          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300/60" />
            <span className="text-rose-300 text-xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300/60" />
          </div>

          <Reveal delay={200}>
            <div className="flex flex-col items-center justify-center gap-3 text-white/90 mb-6">
              <div className="flex items-center gap-2 max-w-full px-2">
                <Calendar className="w-4 h-4 shrink-0 text-rose-300" />
                <span className="text-sm font-medium">
                  {formattedDate} • {weddingTime}
                </span>
              </div>
              <div className="flex items-center gap-2 max-w-full px-2">
                <MapPin className="w-4 h-4 shrink-0 text-rose-300" />
                <span className="text-sm font-medium text-center">
                  {weddingLocation}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <CountDown targetDate={weddingDate} />
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 inline-flex items-center gap-1.5 text-white/70 text-sm font-medium">
              Deslize para continuar
              <ChevronRight className="w-4 h-4 animate-pulse" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
