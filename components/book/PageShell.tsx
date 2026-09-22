/**
 * components/book/PageShell.tsx
 *
 * Wrapper usado por toda página do livro: ocupa 100% do cartão do livro
 * e permite rolagem vertical própria quando o conteúdo é mais alto que
 * a tela — sem interferir na navegação por swipe (horizontal) do livro.
 */
import type { ReactNode } from "react";

export default function PageShell({ children }: { children: ReactNode }) {
  return <div className="h-full w-full overflow-y-auto overscroll-contain">{children}</div>;
}
