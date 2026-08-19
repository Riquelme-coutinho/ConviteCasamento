/**
 * app/page.tsx
 *
 * Página principal do convite de casamento.
 * Server Component — orquestra todos os sections da landing page.
 *
 * Para personalizar, edite o objeto WEDDING_CONFIG abaixo.
 * Os dados de presentes ficam em data/gifts.ts, na página /presentes.
 */
import Link from "next/link";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import { timelineEvents } from "@/data/timeline";
import { MapPin, Clock, Heart, Phone, Gift } from "lucide-react";

// ============================================================
// 🎨 DADOS DO CASAMENTO — edite aqui!
// ============================================================

const WEDDING_CONFIG = {
  groom: "Gabriel",
  bride: "Carolinne",
  date: "2027-04-10",
  time: "11h00",
  location: "Paróquia Nossa Senhora de Fátima, Brasília - DF",
  address: "Area Especial 03, St. D Sul — taguatinga, Brasília - DF",
  whatsapp: "+55 61 99927-9615",
  mapsLink: "https://maps.app.goo.gl/pHU2u4nXVT4ApLwg7",
} as const;

// ============================================================

export default function Home() {
  return (
    <main>
      {/* ─── 1. HERO ───────────────────────────────────────── */}
      <Hero
        groom={WEDDING_CONFIG.groom}
        bride={WEDDING_CONFIG.bride}
        weddingDate={WEDDING_CONFIG.date}
        weddingLocation={WEDDING_CONFIG.location}
        weddingTime={WEDDING_CONFIG.time}
      />

      {/* ─── NAV STICKY - menu ────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
        aria-label="Navegação principal"
      >
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-1 sm:gap-2 h-14 overflow-x-auto">
            {[
              { href: "#historia", label: "Nossa História", external: false },
              { href: "#galeria", label: "Galeria", external: false },
              { href: "#local", label: "Local", external: false },
              { href: "#confirmar", label: "Confirmar", external: false },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-600 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}

            {/* Link especial: Presentes → página dedicada /presentes */}
            <li>
              <Link
                href="/presentes"
                className="whitespace-nowrap flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-rose-500 bg-rose-50 hover:bg-rose-100 transition-all duration-200 border border-rose-200"
              >
                <Gift className="w-3.5 h-3.5" />
                Presentes
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ─── 2. HISTÓRIA (TIMELINE) ────────────────────────── */}
      <Story events={timelineEvents} />

      {/* ─── 3. GALERIA ────────────────────────────────────── */}
      <Gallery />

      {/* ─── 4. CHAMADA PARA LISTA DE PRESENTES ────────────── */}
      {/*
       * A lista de presentes agora tem página própria em /presentes.
       * Esta section é uma chamada visual que direciona o usuário.
       */}
      <section className="py-16 bg-gradient-to-r from-rose-50 to-pink-50 border-y border-rose-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md shadow-rose-100">
            <Gift className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Lista de Presentes
          </h2>
          <p className="text-gray-500 mb-7 leading-relaxed">
            A sua presença já é o maior presente. Mas se quiser nos surpreender,
            preparamos uma lista especial — com Pix e pagamento por cartão.
          </p>
          <Link
            href="/presentes"
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl px-8 py-4 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-200 text-base"
          >
            <Gift className="w-5 h-5" />
            Ver Lista de Presentes
          </Link>
        </div>
      </section>

      {/* ─── 5. LOCAL & INFORMAÇÕES ────────────────────────── */}
      <section
        id="local"
        className="scroll-mt-16 py-20 sm:py-32 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-400 text-sm font-medium uppercase tracking-[0.3em]">
              ✦ Como chegar
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-gray-800">
              Local &amp; Horário
            </h2>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-rose-200" />
              <span className="text-rose-300">✦</span>
              <div className="h-px w-12 bg-rose-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 text-center">
              <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="font-serif font-bold text-gray-800 mb-1">Data &amp; Hora</h3>
              <p className="text-sm text-gray-600">10 de Abril de 2027</p>
              <p className="text-sm font-semibold text-rose-500 mt-1">às {WEDDING_CONFIG.time}</p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-serif font-bold text-gray-800 mb-1">Local</h3>
              <p className="text-sm text-gray-600">{WEDDING_CONFIG.location}</p>
              <a
                href={WEDDING_CONFIG.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-amber-600 hover:text-amber-700 mt-1 inline-block transition-colors"
              >
                Ver no Maps →
              </a>
            </div>

            <div className="bg-pink-50 border border-pink-100 rounded-3xl p-6 text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-serif font-bold text-gray-800 mb-1">Contato</h3>
              <p className="text-sm text-gray-600">Dúvidas? Fale conosco!</p>
              <a
                href={`https://wa.me/${WEDDING_CONFIG.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-pink-500 hover:text-pink-600 mt-1 inline-block transition-colors"
              >
                WhatsApp →
              </a>
            </div>
          </div>

          <div className="w-full h-64 rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.251784812169!2d-48.0498621!3d-15.843358599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a32949fa84331%3A0x6e006e0f6f84156e!2sPar%C3%B3quia%20Nossa%20Senhora%20de%20F%C3%A1tima!5e0!3m2!1spt-BR!2sbr!4v1786836395471!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa do local do casamento"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* ─── 6. RSVP ───────────────────────────────────────── */}
      <RSVP />

      {/* ─── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-gray-950 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <p className="font-serif text-xl text-white">
            {WEDDING_CONFIG.groom} &amp; {WEDDING_CONFIG.bride}
          </p>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </div>
        <p className="text-gray-500 text-sm">
          10 · 04 · 2027 — Para sempre
        </p>
        <div className="mt-6 text-xs text-gray-700">
          Feito com ❤ e muito código
        </div>
      </footer>
    </main>
  );
}
