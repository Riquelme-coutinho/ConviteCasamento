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
  PawPrint,
  Home,
  type LucideProps,
} from "lucide-react";
import { TimelineEvent } from "@/data/timeline";
import Reveal from "./Reveal";

// Mapa de ícones: conecta a string do JSON ao componente Lucide
const IconMap: Record<string, React.ComponentType<LucideProps>> = {
  Heart,
  Coffee,
  MapPin,
  Star,
  Plane,
  Play,
  PawPrint,
  Home,
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
      className="scroll-mt-10 py-10 bg-gradient-to-b from-white via-rose-50/30 to-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16">
          <span className="text-rose-400 text-sm font-medium uppercase tracking-[0.3em]">
            ❤ Nossa Jornada ❤
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-gray-800">
            Nossa História
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose-200" />
            <span className="text-rose-300">✦</span>
            <div className="h-px w-12 bg-rose-200" />
          </div>
          <p className="mt-6 text-gray-500 max-w-xl mx-auto leading-relaxed">
            Uma história de amor, companheirismo e superação — duas pessoas
            que cresceram juntas e aprenderam que amar também é caminhar
            lado a lado, especialmente nos dias difíceis.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="space-y-12">
            {events.map((event, index) => {
              const IconComponent = IconMap[event.icon] ?? Heart;
              const colors = colorClasses[event.color] ?? colorClasses.rose;
              // Alterna o lado de onde cada card entra na animação
              const isLeft = index % 2 === 0;

              return (
                <Reveal key={event.id} from={isLeft ? "left" : "right"}>
                <div className="relative flex flex-col gap-6 mb-10">
                  {/* Card de conteúdo */}
                  <div className="w-full">
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

                  {/* Ícone exibido ao lado do card */}
                  <div className={`flex items-center gap-3 ${colors.text}`}>
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
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Citação de fechamento */}
        <Reveal delay={200}>
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-rose-200" />
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300" aria-hidden="true" />
              <div className="h-px w-12 bg-rose-200" />
            </div>
            <p className="font-serif italic text-xl text-gray-700 leading-relaxed">
              &ldquo;Dois jovens que se encontraram por acaso, uma vida inteira
              construída lado a lado e um amor que escolhemos continuar
              vivendo todos os dias. E, se lá em 2016 alguém dissesse que
              aquele encontro mudaria nossas vidas para sempre, talvez a
              gente nem acreditasse. Mas Deus já sabia.&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
