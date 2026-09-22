/**
 * components/book/pages/LocalPage.tsx
 *
 * Página "Local & Horário" — extraída da antiga section inline em
 * app/page.tsx para virar uma página independente do livro.
 */
import Reveal from "@/components/Reveal";
import PageShell from "../PageShell";
import { Clock, MapPin, Phone } from "lucide-react";

interface LocalPageProps {
  time: string;
  location: string;
  mapsLink: string;
  whatsapp: string;
  formattedDate: string;
}

export default function LocalPage({
  time,
  location,
  mapsLink,
  whatsapp,
  formattedDate,
}: LocalPageProps) {
  return (
    <PageShell>
      <section id="local" className="min-h-full py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal className="text-center mb-10">
            <span className="text-rose-400 text-sm font-medium uppercase tracking-[0.3em]">
              ✦ Como chegar
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-gray-800">
              Local &amp; Horário
            </h2>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-rose-200" />
              <span className="text-rose-300">✦</span>
              <div className="h-px w-12 bg-rose-200" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 mb-8">
            <Reveal delay={0}>
              <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100">
                <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="font-serif font-bold text-gray-800 mb-1">Data &amp; Hora</h3>
                <p className="text-sm text-gray-600">{formattedDate}</p>
                <p className="text-sm font-semibold text-rose-500 mt-1">às {time}</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="font-serif font-bold text-gray-800 mb-1">Local</h3>
                <p className="text-sm text-gray-600">{location}</p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-amber-600 hover:text-amber-700 mt-1 inline-block transition-colors"
                >
                  Ver no Maps →
                </a>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-pink-50 border border-pink-100 rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-100">
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="font-serif font-bold text-gray-800 mb-1">Contato</h3>
                <p className="text-sm text-gray-600">Dúvidas? Fale conosco!</p>
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-pink-500 hover:text-pink-600 mt-1 inline-block transition-colors"
                >
                  WhatsApp →
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="w-full h-56 rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 relative shadow-lg shadow-gray-200/60">
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
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
