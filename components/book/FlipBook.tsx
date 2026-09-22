/**
 * components/book/FlipBook.tsx
 *
 * Wrapper tipado sobre a `react-pageflip` (motor `page-flip`): a lib fornece
 * o componente em JS/JSX com tipos que marcam TODAS as opções como
 * obrigatórias (não refletem os defaults reais em runtime), então aqui a
 * tratamos como um componente com props opcionais e uma ref imperativa
 * mínima com só os métodos que o BookReader usa.
 */
"use client";

import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import RawHTMLFlipBook from "react-pageflip";

export interface PageCollectionLike {
  getCurrentSpreadIndex: () => number;
  getSpreadIndexByPage: (pageNum: number) => number;
  setCurrentSpreadIndex: (index: number) => void;
}

/** Retângulo do livro relativo ao próprio elemento raiz (não à janela) */
export interface PageRectLike {
  left: number;
  top: number;
  width: number;
  height: number;
  pageWidth: number;
}

export interface PageFlipController {
  getPageCount: () => number;
  getCurrentPageIndex: () => number;
  getBoundsRect: () => PageRectLike;
  getPageCollection: () => PageCollectionLike;
}

export interface FlipBookHandle {
  pageFlip: () => PageFlipController;
}

export interface FlipEvent {
  data: number;
}

interface FlipBookOwnProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  width: number;
  height: number;
  size?: "fixed" | "stretch";
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  drawShadow?: boolean;
  flippingTime?: number;
  usePortrait?: boolean;
  maxShadowOpacity?: number;
  showCover?: boolean;
  mobileScrollSupport?: boolean;
  clickEventForward?: boolean;
  useMouseEvents?: boolean;
  swipeDistance?: number;
  showPageCorners?: boolean;
  disableFlipByClick?: boolean;
  onFlip?: (e: FlipEvent) => void;
}

const FlipBook = RawHTMLFlipBook as unknown as ForwardRefExoticComponent<
  FlipBookOwnProps & RefAttributes<FlipBookHandle>
>;

export default FlipBook;
