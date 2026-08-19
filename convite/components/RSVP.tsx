/**
 * components/RSVP.tsx
 *
 * Seção de confirmação de presença (RSVP).
 * Formulário simples com animação e feedback visual.
 * Client Component por usar useState para gerenciar o formulário.
 */
"use client";

import { useState } from "react";
import { Heart, Send, CheckCircle } from "lucide-react";

// Estado interno do formulário
interface FormState {
  name: string;
  guests: string;
  message: string;
}

export default function RSVP() {
  const [form, setForm] = useState<FormState>({
    name: "",
    guests: "1",
    message: "",
  });
  // Controla se o formulário foi enviado (mostra mensagem de sucesso)
  const [submitted, setSubmitted] = useState(false);

  /**
   * Handler genérico para inputs do formulário.
   * Usa a propriedade "name" do input para atualizar o campo correto.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode integrar com um backend, Google Sheets, etc.
    // Por ora, apenas simula o envio com feedback visual.
    setSubmitted(true);
  };

  return (
    <section
      id="confirmar"
      className="scroll-mt-16 py-20 sm:py-32 bg-gradient-to-br from-gray-950 via-rose-950/20 to-gray-950 relative overflow-hidden"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-rose-500/5 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <span className="text-rose-400 text-sm font-medium uppercase tracking-[0.3em]">
            ✦ Aguardamos você
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white">
            Confirme Presença
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose-800" />
            <span className="text-rose-500">✦</span>
            <div className="h-px w-12 bg-rose-800" />
          </div>
          <p className="mt-6 text-gray-400 leading-relaxed">
            Por favor, confirme sua presença até{" "}
            <strong className="text-rose-400">30 de outubro de 2026</strong> para
            que possamos garantir seu lugar especial neste dia.
          </p>
        </div>

        {/* Formulário ou mensagem de sucesso */}
        {submitted ? (
          // Feedback após envio
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
            <CheckCircle className="w-16 h-16 text-rose-400 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Presença Confirmada!
            </h3>
            <p className="text-gray-400">
              Obrigado, <strong className="text-rose-300">{form.name}</strong>!
              Estamos ansiosos para celebrar com você. 💕
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5"
          >
            {/* Campo: Nome */}
            <div>
              <label
                htmlFor="rsvp-name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Seu nome completo *
              </label>
              <input
                id="rsvp-name"
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Ex: Maria Silva"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
              />
            </div>

            {/* Campo: Número de convidados */}
            <div>
              <label
                htmlFor="rsvp-guests"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Número de acompanhantes *
              </label>
              <select
                id="rsvp-guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors appearance-none"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={String(n)} className="bg-gray-900">
                    {n === 1 ? "Só eu" : `Eu + ${n - 1} pessoa${n > 2 ? "s" : ""}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo: Mensagem opcional */}
            <div>
              <label
                htmlFor="rsvp-message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Deixe uma mensagem (opcional)
              </label>
              <textarea
                id="rsvp-message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder="Uma mensagem especial para os noivos..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors resize-none"
              />
            </div>

            {/* Botão de envio */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl px-6 py-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-rose-500/20"
            >
              <Heart className="w-5 h-5 fill-white" aria-hidden="true" />
              Confirmar Presença
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
