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
  icon: "Heart" | "Coffee" | "MapPin" | "Star" | "Ring" | "Plane" | "Play" | "PawPrint" | "Home";
  // Cor do ícone e accent da timeline
  color: string;
}

// Dados da história do casal — edite à vontade!
export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "2016",
    title: "O Encontro",
    description:
      "Em 10 de outubro de 2016, duas vidas se cruzaram: ela com 19 anos, ele com 20 — ainda no início da faculdade, cada um no seu curso. Sem saber, ali começava uma das histórias mais importantes de suas vidas.",
    icon: "Play",
    color: "rose",
  },
  {
    id: 2,
    year: "2016 – 2023",
    title: "Crescendo Juntos",
    description:
      "Ao longo dos anos vieram sonhos, desafios, conquistas e mudanças — e, em cada fase, os dois seguiram se escolhendo. Cresceram juntos, aprenderam juntos e descobriram a vida lado a lado.",
    icon: "Heart",
    color: "amber",
  },
  {
    id: 3,
    year: "Outubro de 2023",
    title: "O Pedido e a Chegada da Moana",
    description:
      "Veio o pedido de casamento e, junto dele, um presente que completaria ainda mais a família: a Moana. 🐶",
    icon: "PawPrint",
    color: "pink",
  },
  {
    id: 4,
    year: "Desde 2023",
    title: "Construindo Nosso Lar",
    description:
      "Desde então, seguem vivendo intensamente, construindo o lar dos sonhos e encontrando, um no outro, o seu porto seguro — uma história feita de amor, companheirismo e superação.",
    icon: "Home",
    color: "amber",
  },
  {
    id: 5,
    year: "2027",
    title: "O Grande Dia",
    description:
      "Depois de tantos anos, chega o momento de receber o Sacramento do Matrimônio e, diante de Deus, entregar a Ele a própria história e a família que construíram juntos.",
    icon: "Ring",
    color: "rose",
  },
];
