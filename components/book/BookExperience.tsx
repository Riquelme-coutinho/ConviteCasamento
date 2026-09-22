/**
 * components/book/BookExperience.tsx
 *
 * Orquestra a experiência de convite em formato de livro: mostra a
 * abertura do envelope e, em seguida, o livro com as páginas do
 * convite (capa, menu, história, galeria, local, RSVP e encerramento).
 */
"use client";

import { useState } from "react";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import BookIntro from "./BookIntro";
import BookReader, { type BookPage } from "./BookReader";
import PageShell from "./PageShell";
import CoverPage from "./pages/CoverPage";
import MenuPage from "./pages/MenuPage";
import LocalPage from "./pages/LocalPage";
import ClosingPage from "./pages/ClosingPage";
import { timelineEvents } from "@/data/timeline";

interface BookExperienceProps {
  groom: string;
  bride: string;
  date: string;
  time: string;
  location: string;
  address: string;
  whatsapp: string;
  mapsLink: string;
}

export default function BookExperience({
  groom,
  bride,
  date,
  time,
  location,
  whatsapp,
  mapsLink,
}: BookExperienceProps) {
  const [opened, setOpened] = useState(false);

  const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const pages: BookPage[] = [
    {
      id: "capa",
      label: "Capa",
      content: () => (
        <CoverPage
          bride={bride}
          groom={groom}
          weddingDate={date}
          weddingLocation={location}
          weddingTime={time}
        />
      ),
    },
    {
      id: "menu",
      label: "Atalhos",
      content: (goTo) => (
        <MenuPage bride={bride} groom={groom} whatsapp={whatsapp} mapsLink={mapsLink} onNavigate={goTo} />
      ),
    },
    {
      id: "historia",
      label: "Nossa História",
      content: () => (
        <PageShell>
          <Story events={timelineEvents} />
        </PageShell>
      ),
    },
    {
      id: "galeria",
      label: "Galeria",
      content: () => (
        <PageShell>
          <Gallery />
        </PageShell>
      ),
    },
    {
      id: "local",
      label: "Local & Horário",
      content: () => (
        <LocalPage
          time={time}
          location={location}
          mapsLink={mapsLink}
          whatsapp={whatsapp}
          formattedDate={formattedDate}
        />
      ),
    },
    {
      id: "confirmar",
      label: "Confirmar Presença",
      content: () => (
        <PageShell>
          <RSVP />
        </PageShell>
      ),
    },
    {
      id: "final",
      label: "Até breve",
      content: () => <ClosingPage bride={bride} groom={groom} formattedDate={formattedDate} />,
    },
  ];

  return (
    <>
      {!opened && <BookIntro bride={bride} groom={groom} onOpen={() => setOpened(true)} />}
      {opened && <BookReader pages={pages} />}
    </>
  );
}
