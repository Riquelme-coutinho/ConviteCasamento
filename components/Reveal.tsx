/**
 * components/Reveal.tsx
 *
 * Wrapper genérico que anima os filhos com fade + slide ao entrarem
 * na viewport (IntersectionObserver). Usado para dar um efeito de
 * "aparecer suavemente" às seções conforme o usuário rola a página.
 *
 * Respeita prefers-reduced-motion via classes motion-reduce:*.
 */
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Atraso da animação em ms — útil para escalonar itens de uma lista */
  delay?: number;
  className?: string;
  /** Direção de onde o elemento "chega" */
  from?: "up" | "left" | "right";
}

const hiddenOffset: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate-y-8",
  left: "-translate-x-8",
  right: "translate-x-8",
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hiddenOffset[from]}`
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
