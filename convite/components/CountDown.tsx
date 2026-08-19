/**
 * components/CountDown.tsx
 *
 * Componente de contagem regressiva para a data do casamento.
 * É um Client Component ("use client") pois usa hooks React.
 *
 * Hooks utilizados:
 *   - useState: armazena os valores de dias/horas/minutos/segundos
 *   - useEffect: inicia e limpa o setInterval de 1 segundo
 */
"use client";

import { useState, useEffect } from "react";

// Interface que representa os campos do countdown
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Props do componente
interface CountDownProps {
  // Data alvo no formato "YYYY-MM-DD"
  targetDate: string;
}

/**
 * Calcula o tempo restante entre agora e a data alvo.
 * Retorna null se a data já passou.
 */
function calculateTimeLeft(targetDate: string): TimeLeft | null {
  const target = new Date(targetDate + "T00:00:00").getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

// Componente de cada unidade de tempo (ex: "42 dias")
function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 min-w-[64px] sm:min-w-[80px]">
        <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs sm:text-sm text-white/60 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

export default function CountDown({ targetDate }: CountDownProps) {
  /**
   * useState: initializa com null para evitar hidratação incorreta
   * (o servidor não sabe a hora exata do cliente).
   */
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  /**
   * useEffect: roda apenas no cliente após a montagem.
   * Cria um interval que atualiza o estado a cada segundo.
   * O return faz cleanup — essencial para evitar memory leaks!
   */
  useEffect(() => {
    // Primeira execução imediata
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Cleanup: cancela o interval quando o componente desmonta
    return () => clearInterval(timer);
  }, [targetDate]);

  // Enquanto está hidratando (SSR) ou data passou
  if (!timeLeft) {
    return (
      <p className="text-white/70 text-lg font-serif italic">
        ✨ O grande dia chegou! ✨
      </p>
    );
  }

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-5">
      <TimeUnit value={timeLeft.days} label="dias" />
      <span className="text-white/50 text-3xl font-light pb-8">:</span>
      <TimeUnit value={timeLeft.hours} label="horas" />
      <span className="text-white/50 text-3xl font-light pb-8">:</span>
      <TimeUnit value={timeLeft.minutes} label="minutos" />
      <span className="text-white/50 text-3xl font-light pb-8">:</span>
      <TimeUnit value={timeLeft.seconds} label="segundos" />
    </div>
  );
}
