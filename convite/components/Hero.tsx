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
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <span className="text-rose-300 text-lg">❤</span>
          <span className="text-white/80 text-xs font-medium uppercase tracking-[0.2em]">
            Convite de Casamento
          </span>
          <span className="text-rose-300 text-lg">❤</span>
        </div>

        {/* Nomes dos noivos — fonte serif para elegância */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight mb-4 drop-shadow-2xl">
          {bride}
          <span className="block text-rose-400 text-3xl sm:text-4xl md:text-5xl font-light italic my-2">
            &amp;
          </span>
          {groom}
        </h1>

        {/* Divisor decorativo */}
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-rose-300/60" />
          <span className="text-rose-300 text-xl">✦</span>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-rose-300/60" />
        </div>

        {/* Data e local */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/90 mb-10">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-300" />
            <span className="text-sm sm:text-base font-medium">
              {formattedDate} • {weddingTime}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 my-4">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-rose-300/60" />
          <span className="text-rose-300 text-xl">✦</span>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-rose-300/60" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/90 mb-10">
          <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rose-300" />
          <span className="text-sm sm:text-base font-medium">
            {weddingLocation}
          </span>
        </div>
          
        </div>

        {/* Countdown regressivo — Client Component */}
        <CountDown targetDate={weddingDate} />

        {/* CTA Scroll */}
        <a
          href="#historia"
          className="mt-10 mb-1 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
        >
          Nossa História
          <span className="animate-bounce">↓</span>
        </a>
      </div>

      {/* Seta de scroll decorativa no fundo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
