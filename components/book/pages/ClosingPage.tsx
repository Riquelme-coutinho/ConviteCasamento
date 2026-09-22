/**
 * components/book/pages/ClosingPage.tsx
 *
 * Última página do livro — encerramento com agradecimento, um lembrete
 * da lista de presentes e o rodapé que antes ficava fixo no fim do
 * scroll da página única.
 */
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageShell from "../PageShell";
import { Gift, Heart } from "lucide-react";

interface ClosingPageProps {
  bride: string;
  groom: string;
  formattedDate: string;
}

export default function ClosingPage({ bride, groom, formattedDate }: ClosingPageProps) {
  return (
    <PageShell>
      <div className="min-h-full flex flex-col items-center justify-center bg-gray-950 px-6 py-16 text-center relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-16 -right-10 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" aria-hidden="true" />

        <Reveal className="relative max-w-sm">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-5 border border-white/20 shadow-lg shadow-black/30">
            <Image
              src="/monograma_cg.png"
              alt={`Monograma ${bride[0]}${groom[0]}`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-serif text-3xl font-bold text-white mb-3">
            Sua presença é o maior presente
          </h2>
          <p className="text-gray-400 mb-7 leading-relaxed text-sm">
            Mas se quiser nos surpreender, preparamos uma lista especial —
            com Pix e pagamento por cartão.
          </p>
          <Link
            href="/presentes"
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl px-7 py-3.5 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-900/40 text-sm"
          >
            <Gift className="w-4 h-4" />
            Ver Lista de Presentes
          </Link>
        </Reveal>

        <div className="relative mt-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <p className="font-names text-3xl text-white">
              {bride} &amp; {groom}
            </p>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
          <p className="text-gray-500 text-sm">{formattedDate} — Para sempre</p>
        </div>
      </div>
    </PageShell>
  );
}
