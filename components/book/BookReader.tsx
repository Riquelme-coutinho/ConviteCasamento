/**
 * components/book/BookReader.tsx
 *
 * Motor de navegação do convite em formato de "livro": usa a react-pageflip
 * (motor page-flip / StPageFlip) para um efeito real de folha curvando e
 * virando, mas com detecção de arrasto própria (ver `handleDragEnd`) — a
 * física nativa da lib só confirma um arrasto que percorre quase toda a
 * largura da página, o que é inviável num gesto real de dedo/mouse.
 *
 * Navegação: arrastar em qualquer ponto da página (touch/mouse), setas
 * (desktop), teclado (← →) e um menu de sumário para pular direto para
 * qualquer página.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState, forwardRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import FlipBook, { type FlipBookHandle, type FlipEvent } from "./FlipBook";

export interface BookPage {
  id: string;
  label: string;
  /** Recebe `goTo` para permitir que a própria página navegue (ex: menu de atalhos) */
  content: (goTo: (id: string) => void) => ReactNode;
}

interface BookReaderProps {
  pages: BookPage[];
}

/** Cada página precisa encaminhar a ref para o nó raiz — exigência da lib de flip */
const FlipPage = forwardRef<HTMLDivElement, { children: ReactNode }>(function FlipPage(
  { children },
  ref
) {
  return (
    <div ref={ref} className="h-full w-full bg-white overflow-hidden">
      {children}
    </div>
  );
});

export default function BookReader({ pages }: BookReaderProps) {
  const bookRef = useRef<FlipBookHandle>(null);
  // Nó DOM real do livro — usado para calcular um ponto de canto em
  // coordenadas de tela de verdade (ver `flipTo` abaixo).
  const bookWrapRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  // Navegação-alvo pendente: `goTo` é passado para dentro de `page.content(...)`
  // (chamado durante a renderização), então não pode ler nenhuma ref ali —
  // só agenda o índice (com um token único via updater funcional, para
  // repetir o mesmo alvo duas vezes seguidas também disparar) e um efeito
  // aplica o flip lendo a ref do livro fora da renderização.
  const [pendingFlip, setPendingFlip] = useState<{ index: number; token: number } | null>(null);

  const goToIndex = useCallback((target: number) => {
    if (target < 0 || target >= pages.length) return;
    setPendingFlip((prev) => ({ index: target, token: (prev?.token ?? 0) + 1 }));
  }, [pages.length]);

  const goTo = useCallback(
    (id: string) => {
      const idx = pages.findIndex((p) => p.id === id);
      if (idx !== -1) goToIndex(idx);
      setMenuOpen(false);
    },
    [pages, goToIndex]
  );

  const flipTo = useCallback((target: number) => {
    const pf = bookRef.current?.pageFlip();
    const el = bookWrapRef.current;
    if (!pf || !el) return;
    if (target < 0 || target >= pf.getPageCount()) return;

    const collection = pf.getPageCollection();
    const currentSpread = collection.getCurrentSpreadIndex();
    const targetSpread = collection.getSpreadIndexByPage(target);
    if (targetSpread === currentSpread) return;

    // A API de alto nível (`flipNext`/`flipPrev`/`flip(page)`) calcula um
    // ponto sintético que só faz sentido para um spread de 2 páginas — em
    // modo retrato (nossa página única) ele cai fora dos limites do livro
    // e o flip é silenciosamente ignorado. Em vez de reimplementar a
    // física do arrasto pela API interna (frágil e não documentada),
    // disparamos os mesmos eventos de mouse reais que um dedo arrastando
    // o canto geraria — o caminho que a lib já suporta e testa de verdade.
    const block = el.querySelector<HTMLElement>(".stf__block");
    if (!block) return;

    // `getBoundsRect()` é relativo ao elemento raiz do livro, não à janela —
    // em retrato o livro pode ter uma barra de letterbox (top/height não
    // preenchem o elemento inteiro quando a proporção não bate 100%), então
    // não dá para assumir que o canto fica nas bordas do próprio wrapper.
    const wrapBox = el.getBoundingClientRect();
    const bookRect = pf.getBoundsRect();
    const cornerMargin = Math.max(8, bookRect.pageWidth * 0.04);
    // O arrasto precisa terminar bem além da borda oposta (não só passar da
    // metade): a lib só confirma a virada se o último ponto do gesto ficar
    // claramente do outro lado, senão ela solta e volta pra página atual.
    const overshoot = bookRect.pageWidth * 0.3;
    const y = wrapBox.top + bookRect.top + bookRect.height - cornerMargin;
    const rightEdgeX = wrapBox.left + bookRect.left + bookRect.width;
    const leftEdgeX = wrapBox.left + bookRect.left + bookRect.pageWidth;

    const forward = targetSpread > currentSpread;
    collection.setCurrentSpreadIndex(forward ? targetSpread - 1 : targetSpread + 1);

    const startX = forward ? rightEdgeX - cornerMargin : leftEdgeX + cornerMargin;
    const endX = forward ? leftEdgeX - overshoot : rightEdgeX + overshoot;
    const fire = (type: string, x: number, node: EventTarget) =>
      node.dispatchEvent(
        new MouseEvent(type, { clientX: x, clientY: y, bubbles: true, cancelable: true, view: window })
      );

    fire("mousedown", startX, block);
    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      fire("mousemove", startX + (endX - startX) * (i / steps), window);
    }
    fire("mouseup", endX, window);
  }, []);

  useEffect(() => {
    if (pendingFlip === null) return;
    flipTo(pendingFlip.index);
  }, [pendingFlip, flipTo]);

  const next = useCallback(() => {
    const pf = bookRef.current?.pageFlip();
    if (pf) flipTo(pf.getCurrentPageIndex() + 1);
  }, [flipTo]);
  const prev = useCallback(() => {
    const pf = bookRef.current?.pageFlip();
    if (pf) flipTo(pf.getCurrentPageIndex() - 1);
  }, [flipTo]);

  const handleFlip = useCallback((e: FlipEvent) => setCurrent(e.data), []);

  // A lib só confirma sua própria detecção de arrasto quando o gesto
  // percorre quase toda a largura do livro (ver `overshoot` em `flipTo`) —
  // inviável para um arrasto real de dedo/mouse. Por isso detectamos o
  // gesto nós mesmos, com um limiar bem mais tolerante, e nesse caso quem
  // efetivamente toca a virada é o `flipTo` (chamado por `next`/`prev`).
  // Não precisamos bloquear a detecção nativa da lib: como o limiar dela é
  // tão mais alto que o nosso, um arrasto comum sempre falha nela primeiro
  // (volta pra página atual) — e se ela ainda estiver animando esse
  // "volta" quando `flipTo` dispara a virada de verdade, o próprio motor
  // da lib já trata isso (interrompe a animação em andamento e começa a
  // nova, ver `finishAnimation` em `Flip.flip`).
  const DRAG_THRESHOLD = 48;
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const handleDragStart = useCallback((x: number, y: number) => {
    dragStart.current = { x, y };
  }, []);

  const handleDragEnd = useCallback(
    (x: number, y: number) => {
      const start = dragStart.current;
      dragStart.current = null;
      if (!start) return;
      const dx = x - start.x;
      const dy = y - start.y;
      // Gesto predominantemente vertical (ou curto demais) = scroll dentro
      // da página, não virada.
      if (Math.abs(dx) < DRAG_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) next();
      else prev();
    },
    [next, prev]
  );

  // Navegação por teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const isFirst = current === 0;
  const isLast = current === pages.length - 1;

  // A lib recria toda a sua coleção interna de páginas sempre que a
  // referência de `children` muda (efeito que ela mesma registra sobre
  // `props.children`) — o que destruiria/recriaria o livro (perdendo a
  // posição de qualquer flip em andamento) a cada re-render do BookReader,
  // já que `pages.map(...)` inline geraria um array novo toda vez.
  // Memoizar mantém a mesma referência entre re-renders causados por
  // `current`/`menuOpen`/`pendingFlip`.
  const flipPages = useMemo(
    () => pages.map((p) => <FlipPage key={p.id}>{p.content(goTo)}</FlipPage>),
    [pages, goTo]
  );

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-950">
      {/* Moldura tipo "livro" — em telas largas centraliza um cartão vertical */}
      <div className="relative w-full h-full sm:max-w-md sm:mx-auto sm:h-[min(100dvh,880px)] sm:top-1/2 sm:-translate-y-1/2 sm:rounded-[2rem] sm:shadow-2xl sm:shadow-black/40 sm:ring-1 sm:ring-white/10 overflow-hidden">
        <div
          ref={bookWrapRef}
          className="absolute inset-0"
          onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
          onMouseUp={(e) => handleDragEnd(e.clientX, e.clientY)}
          onTouchStart={(e) => {
            const t = e.touches[0];
            if (t) handleDragStart(t.clientX, t.clientY);
          }}
          onTouchEnd={(e) => {
            const t = e.changedTouches[0];
            if (t) handleDragEnd(t.clientX, t.clientY);
          }}
        >
          <FlipBook
            ref={bookRef}
            className="h-full w-full"
            width={430}
            height={860}
            size="stretch"
            minWidth={280}
            maxWidth={520}
            minHeight={520}
            maxHeight={920}
            maxShadowOpacity={0.5}
            flippingTime={650}
            usePortrait
            showCover={false}
            mobileScrollSupport
            clickEventForward
            useMouseEvents
            showPageCorners
            disableFlipByClick
            onFlip={handleFlip}
          >
            {flipPages}
          </FlipBook>
        </div>

        {/* Setas de navegação */}
        {/*
         * Controles flutuantes: fundo escuro translúcido fixo (não o
         * bg-white/10 usado antes), para garantir contraste do ícone
         * branco tanto sobre páginas claras (ex: Menu, Local) quanto
         * escuras (ex: Galeria, RSVP) — o convidado sempre enxerga a
         * navegação, não só quando a página por baixo é escura.
         */}
        <button
          onClick={prev}
          disabled={isFirst}
          aria-label="Página anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-950/40 backdrop-blur-md border border-white/25 shadow-md text-white flex items-center justify-center transition-all hover:bg-gray-950/55 active:scale-90 disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          disabled={isLast}
          aria-label="Próxima página"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-950/40 backdrop-blur-md border border-white/25 shadow-md text-white flex items-center justify-center transition-all hover:bg-gray-950/55 active:scale-90 disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Botão de sumário */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir sumário"
          className="absolute top-3 left-3 z-20 w-9 h-9 rounded-full bg-gray-950/40 backdrop-blur-md border border-white/25 shadow-md text-white flex items-center justify-center transition-all hover:bg-gray-950/55 active:scale-90"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Indicador "X / Y" */}
        <div className="absolute top-3 right-3 z-20 px-3 h-9 rounded-full bg-gray-950/40 backdrop-blur-md border border-white/25 shadow-md text-white text-xs font-medium flex items-center tabular-nums">
          {current + 1} / {pages.length}
        </div>

        {/* Dots de progresso */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-gray-950/40 backdrop-blur-md border border-white/25 shadow-md">
          {pages.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goToIndex(i)}
              aria-label={`Ir para ${p.label}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Sumário deslizante */}
        {menuOpen && (
          <div
            className="absolute inset-0 z-30 bg-gray-950/90 backdrop-blur-sm flex flex-col animate-fade-in-up"
            style={{ animationDuration: "250ms" }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <span className="font-serif text-lg text-white">Sumário</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar sumário"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-2">
              {pages.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => {
                    goToIndex(i);
                    setMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-xl font-serif text-base transition-all ${
                    i === current
                      ? "bg-white text-gray-900"
                      : "bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
