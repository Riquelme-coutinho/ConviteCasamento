/**
 * components/Story.tsx
 *
 * Seção "Nossa História" com layout de linha do tempo.
 * Alterna o posicionamento (Z-pattern) em desktop.
 * Em mobile, apresenta layout linear com linha vertical.
 *
 * Props:
 *   - events: array de TimelineEvent vindo de data/timeline.ts
 */
import {
  Heart,
  Coffee,
  Play,
  MapPin,
  Star,
  Plane,
  type LucideProps,
} from "lucide-react";
import { TimelineEvent } from "@/data/timeline";

// Mapa de ícones: conecta a string do JSON ao componente Lucide
const IconMap: Record<string, React.ComponentType<LucideProps>> = {
  Heart,
  Coffee,
  MapPin,
  Star,
  Plane,
  Play,
  // "Ring" não existe em lucide, usamos Heart com cor diferente
  Ring: Heart,
};

// Props do componente Story
interface StoryProps {
  events: TimelineEvent[];
}

// Mapa de cores Tailwind para cada evento (usando cores seguras para purging)
const colorClasses: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
    iconBg: "bg-rose-100",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
  },
  pink: {
    bg: "bg-pink-50",
    text: "text-pink-600",
    border: "border-pink-200",
    iconBg: "bg-pink-100",
  },
};

export default function Story({ events }: StoryProps) {
  return (
    <section
      id="historia"
      className="scroll-mt-10 py-10 sm:py-32 bg-gradient-to-b from-white via-rose-50/30 to-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="text-rose-400 text-sm font-medium uppercase tracking-[0.3em]">
            ❤ Nossa Jornada ❤
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-gray-800">
            Nossa História
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose-200" />
            <span className="text-rose-300">✦</span>
            <div className="h-px w-12 bg-rose-200" />
          </div>
          <p className="mt-6 text-gray-500 max-w-xl mx-auto leading-relaxed">
            Cada capítulo dessa história foi escrito com amor, cumplicidade e
            muito riso. Vamos contar um pouquinho de nossos momentos que nos trouxeram até este dia tão especial.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical central — visível apenas em md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-200 to-transparent -translate-x-1/2" />

          <div className="space-y-12 sm:space-y-0">
            {events.map((event, index) => {
              const IconComponent = IconMap[event.icon] ?? Heart;
              const colors = colorClasses[event.color] ?? colorClasses.rose;
              // Em desktop: índices pares ficam à esquerda, ímpares à direita
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={event.id}
                  className={`relative flex md:items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col gap-6 md:gap-0 mb-10 sm:mb-20`}
                >
                  {/* Card de conteúdo */}
                  <div
                    className={`w-full md:w-[calc(50%-3rem)] ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    } ${isLeft ? "md:text-right" : "md:text-left"}`}
                  >
                    <div
                      className={`group ${colors.bg} border ${colors.border} rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                    >
                      {/* Ano */}
                      <span
                        className={`text-xs font-bold ${colors.text} uppercase tracking-widest`}
                      >
                        {event.year}
                      </span>
                      {/* Título */}
                      <h3 className="mt-1 text-xl font-serif font-bold text-gray-800">
                        {event.title}
                      </h3>
                      {/* Descrição */}
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Ícone central da timeline */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <div
                      className={`w-12 h-12 ${colors.iconBg} border-4 border-white rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${colors.text}`}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Ícone mobile (exibido ao lado do card) */}
                  <div
                    className={`md:hidden flex items-center gap-3 ${colors.text}`}
                  >
                    <div
                      className={`w-10 h-10 ${colors.iconBg} rounded-full flex items-center justify-center shadow-sm flex-shrink-0`}
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {event.year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
