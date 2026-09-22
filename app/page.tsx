/**
 * app/page.tsx
 *
 * Página principal do convite de casamento — formato de "livro digital":
 * abre com um envelope selado e navega por páginas em tela cheia com
 * efeito de virar página, em vez do scroll contínuo tradicional.
 *
 * Para personalizar, edite o objeto WEDDING_CONFIG abaixo.
 * Os dados de presentes ficam em data/gifts.ts, na página /presentes.
 * A montagem das páginas do livro fica em components/book/BookExperience.tsx.
 */
import BookExperience from "@/components/book/BookExperience";

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
      <BookExperience
        groom={WEDDING_CONFIG.groom}
        bride={WEDDING_CONFIG.bride}
        date={WEDDING_CONFIG.date}
        time={WEDDING_CONFIG.time}
        location={WEDDING_CONFIG.location}
        address={WEDDING_CONFIG.address}
        whatsapp={WEDDING_CONFIG.whatsapp}
        mapsLink={WEDDING_CONFIG.mapsLink}
      />
    </main>
  );
}
