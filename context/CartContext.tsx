/**
 * context/CartContext.tsx
 *
 * Contexto global do carrinho de presentes.
 *
 * ─── Por que Context + useReducer? ───────────────────────────
 * - `useContext` torna o estado do carrinho acessível em qualquer
 *   componente sem prop drilling.
 * - `useReducer` organiza as mutações de estado em ações nomeadas,
 *   como uma mini store Redux — mais previsível que múltiplos useState.
 * - `localStorage` persiste o carrinho mesmo após recarregar a página.
 * ─────────────────────────────────────────────────────────────
 */
"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { Gift } from "@/data/gifts";

// ────────────────────────────────────────────────────────────
// TIPOS
// ────────────────────────────────────────────────────────────

/** Um item do carrinho: o presente + quantidade */
export interface CartItem {
  gift: Gift;
  quantity: number;
}

/** Todas as ações possíveis que o reducer aceita */
type CartAction =
  | { type: "ADD_ITEM"; gift: Gift }
  | { type: "REMOVE_ITEM"; giftId: number }
  | { type: "INCREMENT"; giftId: number }
  | { type: "DECREMENT"; giftId: number }
  | { type: "CLEAR_CART" }
  /** Restaura o estado completo do localStorage após a hidratação */
  | { type: "LOAD_STATE"; payload: CartState };

/** Estado completo do carrinho */
interface CartState {
  items: CartItem[];
}

/** Interface pública do contexto exposta pelo hook useCart() */
interface CartContextValue {
  items: CartItem[];
  /** Total de unidades no carrinho (para o badge do ícone) */
  totalItems: number;
  /** Soma de todos os valores em centavos */
  totalPrice: number;
  addItem: (gift: Gift) => void;
  removeItem: (giftId: number) => void;
  increment: (giftId: number) => void;
  decrement: (giftId: number) => void;
  clearCart: () => void;
  isInCart: (giftId: number) => boolean;
}

// ────────────────────────────────────────────────────────────
// REDUCER — lógica pura de mutação de estado
// ────────────────────────────────────────────────────────────

const STORAGE_KEY = "wedding-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Verifica se o item já existe no carrinho
      const exists = state.items.find((i) => i.gift.id === action.gift.id);
      if (exists) {
        // Se existe, incrementa a quantidade
        return {
          items: state.items.map((i) =>
            i.gift.id === action.gift.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      // Se não existe, adiciona com quantidade 1
      return { items: [...state.items, { gift: action.gift, quantity: 1 }] };
    }

    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.gift.id !== action.giftId) };

    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.gift.id === action.giftId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };

    case "DECREMENT":
      return {
        items: state.items
          .map((i) =>
            i.gift.id === action.giftId ? { ...i, quantity: i.quantity - 1 } : i
          )
          // Remove automaticamente se quantidade chegar a 0
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR_CART":
      return { items: [] };

    case "LOAD_STATE":
      // Substitui todo o estado com o que foi salvo no localStorage
      return action.payload;

    default:
      return state;
  }
}

// ────────────────────────────────────────────────────────────
// CONTEXT
// ────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

// ────────────────────────────────────────────────────────────
// PROVIDER — envolve o app em layout.tsx
// ────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  /**
   * useReducer: estado inicial é sempre vazio — tanto no servidor quanto no cliente.
   *
   * ⚠️ Por que não ler o localStorage aqui?
   * O Next.js faz Server-Side Rendering: o servidor não tem acesso ao localStorage
   * e renderiza o carrinho com 0 itens. Se o cliente inicializasse com itens do
   * localStorage, o HTML gerado seria diferente → React hydration error.
   *
   * Solução: ambos (servidor e cliente) começam com carrinho vazio.
   * O useEffect abaixo carrega os dados do localStorage DEPOIS da hidratação.
   */
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  /**
   * useEffect 1: carrega o carrinho do localStorage após a hidratação.
   * Roda apenas no cliente, uma única vez (array de dependências vazio).
   */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CartState = JSON.parse(stored);
        if (parsed.items?.length > 0) {
          dispatch({ type: "LOAD_STATE", payload: parsed });
        }
      }
    } catch {
      // localStorage corrompido — ignora e começa do zero
    }
  }, []);

  /**
   * useEffect 2: persiste o estado no localStorage sempre que os itens mudam.
   * Garante que recarregar a página mantém o carrinho.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Valores derivados (computados) — nunca armazenados no estado
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.gift.priceInCents * i.quantity,
    0
  );

  // Ações memoizadas com useCallback para evitar re-renders desnecessários
  const addItem = useCallback(
    (gift: Gift) => dispatch({ type: "ADD_ITEM", gift }),
    []
  );
  const removeItem = useCallback(
    (giftId: number) => dispatch({ type: "REMOVE_ITEM", giftId }),
    []
  );
  const increment = useCallback(
    (giftId: number) => dispatch({ type: "INCREMENT", giftId }),
    []
  );
  const decrement = useCallback(
    (giftId: number) => dispatch({ type: "DECREMENT", giftId }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const isInCart = useCallback(
    (giftId: number) => state.items.some((i) => i.gift.id === giftId),
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        increment,
        decrement,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ────────────────────────────────────────────────────────────
// HOOK — use em qualquer componente para acessar o carrinho
// ────────────────────────────────────────────────────────────

/**
 * useCart() — hook personalizado para acessar o contexto do carrinho.
 *
 * Lança um erro descritivo se usado fora do CartProvider,
 * facilitando o debug durante o desenvolvimento.
 */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart() deve ser usado dentro de <CartProvider>");
  }
  return ctx;
}
