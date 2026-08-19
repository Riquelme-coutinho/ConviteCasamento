/**
 * data/timeline.ts
 *
 * Arquivo de dados estáticos para a seção "Nossa História".
 * Para editar os marcos do casal, basta alterar este arquivo.
 * Os componentes JSX não precisam ser tocados.
 */

// Interface que define a estrutura de cada marco na linha do tempo
export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  // Nome do ícone do Lucide React a ser usado neste marco
  icon: "Heart" | "Coffee" | "MapPin" | "Star" | "Ring" | "Plane" | "Play" ;
  // Cor do ícone e accent da timeline
  color: string;
}

// Dados da história do casal — edite à vontade!
export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "2016",
    title: "O Grande Começo",
    description:
      "Nossa história começou em 10 de outubro de 2016, quando ainda muito jovens nos conhecemos e escolhemos dar início a essa grande e linda história de amor.",
    icon: "Play",
    color: "rose",
  },
  {
    id: 2,
    year: "2023",
    title: "Primeira Viagem Juntos",
    description:
      "Exploramos Gramado juntos pela primeira vez. Entre fondue, neve e muitas risadas, entendemos que queríamos viver cada aventura ao lado um do outro.",
    icon: "MapPin",
    color: "amber",
  },
  {
    id: 3,
    year: "2021",
    title: "Começamos a Morar Juntos",
    description:
      "Após dois anos de namoro, demos o grande passo: dividimos o mesmo teto, as mesmas xícaras de café pela manhã e os mesmos sonhos para o futuro.",
    icon: "Heart",
    color: "pink",
  },
  {
    id: 4,
    year: "2023",
    title: "O Pedido de Casamento",
    description:
      "Numa noite estrelada à beira-mar, com o coração acelerado, ele se ajoelhou e ela disse sim. O começo do maior capítulo das nossas vidas.",
    icon: "Star",
    color: "rose",
  },
  {
    id: 5,
    year: "2024",
    title: "A Grande Viagem",
    description:
      "Celebramos o noivado com uma viagem inesquecível pela Europa. Paris, Roma, Lisboa — cada cidade, uma memória que guardamos para sempre.",
    icon: "Plane",
    color: "amber",
  },
  {
    id: 6,
    year: "2026",
    title: "O Grande Dia",
    description:
      "E agora chegou o momento mais esperado: prometemos um ao outro eternidade, na presença de todos que amamos. Sejam bem-vindos à nossa festa!",
    icon: "Ring",
    color: "rose",
  },
];
