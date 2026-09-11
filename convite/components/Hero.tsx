/**
 * components/Hero.tsx
 *
 * Seção principal (Hero) do convite de casamento.
 * Exibe o fundo fotográfico com overlay, nomes dos noivos,
 * data, local e um countdown regressivo.
 *
 * É um Server Component — sem hooks React aqui.
 * O countdown é isolado no CountDown.tsx (Client Component).
 */
import CountDown from "./CountDown";
import Reveal from "./Reveal";
import { MapPin, Calendar } from "lucide-react";

// Props da seção Hero — edite os valores em app/page.tsx
interface HeroProps {
  bride: string;
  groom: string;
  // Formato ISO: "YYYY-MM-DD"
  weddingDate: string;
  weddingLocation: string;
  weddingTime: string;
}

export default function Hero({
  bride,
  groom,
  weddingDate,
  weddingLocation,
  weddingTime,
}: HeroProps) {
  // Formata a data para exibição em português
  const formattedDate = new Date(weddingDate + "T12:00:00").toLocaleDateString(
    "pt-BR",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Imagem de fundo via CSS background para melhor performance */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero_bg.jpg')" }}
        aria-hidden="true"
      />

      {/* Overlay gradiente multicamada para legibilidade e drama visual */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,10,10,0.35) 0%, rgba(30,10,15,0.55) 50%, rgba(20,5,10,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Partículas decorativas (pseudo-elementos via inline SVG blur) */}
      <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-rose-300/10 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-16 right-8 w-48 h-48 rounded-full bg-amber-300/10 blur-3xl" aria-hidden="true" />

      {/* Conteúdo principal — z-index garante posicionamento sobre o overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Tag decorativa */}
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="text-rose-300 text-lg">❤</span>
            <span className="text-white/80 text-xs font-medium uppercase tracking-[0.2em]">
              Convite de Casamento
            </span>
            <span className="text-rose-300 text-lg">❤</span>
          </div>
        </Reveal>

        {/* Nomes dos noivos — fonte serif para elegância */}
        <Reveal delay={100}>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight mb-4 drop-shadow-2xl">
            {bride}
            <span className="text-gradient block text-3xl sm:text-4xl md:text-5xl font-light italic my-2">
              &amp;
            </span>
            {groom}
          </h1>
        </Reveal>

        {/* Divisor decorativo */}
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-rose-300/60" />
          <span className="text-rose-300 text-xl">✦</span>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-rose-300/60" />
        </div>

        {/* Data e local */}
        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/90 mb-10">
            <div className="flex items-center gap-2 max-w-full px-2">
              <Calendar className="w-4 h-4 shrink-0 text-rose-300" />
              <span className="text-sm sm:text-base font-medium">
                {formattedDate} • {weddingTime}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="flex items-center justify-center gap-4 my-4">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-rose-300/60" />
          <span className="text-rose-300 text-xl">✦</span>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-rose-300/60" />
        </div>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/90 mb-10">
            <div className="flex items-center gap-2 max-w-full px-2">
              <MapPin className="w-4 h-4 shrink-0 text-rose-300" />
              <span className="text-sm sm:text-base font-medium text-center">
                {weddingLocation}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Countdown regressivo — Client Component */}
        <Reveal delay={400}>
          <CountDown targetDate={weddingDate} />
        </Reveal>

        {/* CTA Scroll */}
        <Reveal delay={500}>
          <a
            href="#historia"
            className="mt-10 mb-8 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            Nossa História
            <span className="animate-bounce">↓</span>
          </a>
        </Reveal>
      </div>

      {/*
       * Degradê que dissolve a imagem para branco, sempre logo ABAIXO do
       * conteúdo (fica no fluxo normal da section — como irmão do bloco de
       * texto, e não dentro dele — nunca sobrepõe o botão, e usa w-full
       * em vez de w-screen para não gerar overflow horizontal por causa
       * da largura da barra de rolagem).
       */}
      <div
        className="relative z-10 w-full h-16 bg-gradient-to-b from-transparent to-white pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
