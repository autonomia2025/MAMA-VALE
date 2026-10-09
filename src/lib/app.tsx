import { createContext, useContext } from 'react';
import type { Catalog } from './catalog';
import type { Motion } from './motion';
import type { Route } from './router';

export interface QuoteItem { id: string; n: string; qty: number }
export interface CatFilters { brand: string; q: string; sort: 'rel' | 'precio' | 'az'; limit: number }

export interface AppCtx {
  route: Route;
  data: Catalog | null;
  motion: Motion;
  vw: number;
  mob: boolean;
  pin: boolean;
  /** false while a page is playing its entrance */
  entered: boolean;
  quote: QuoteItem[];
  addQuote(id: string, n: string): void;
  setQty(id: string, d: number): void;
  clearQuote(): void;
  cat: CatFilters;
  setCat(p: Partial<CatFilters>): void;
  gridFade: boolean;
  flashGrid(): void;
}

export const Ctx = createContext<AppCtx>(null as unknown as AppCtx);
export const useApp = () => useContext(Ctx);

/** Entrance values shared by every page hero. */
export function intro(on: boolean) {
  return {
    line: on ? 'translate3d(0,0,0)' : 'translate3d(0,108%,0)',
    ls: on ? '-.02em' : '.015em',
    o: on ? 1 : 0,
    up: on ? 'none' : 'translate3d(0,18px,0)',
    clip: on ? 'inset(0% 0% 0% 0% round 28px)' : 'inset(9% 7% 0% 7% round 28px)',
    clipG: on ? 'inset(0% 0% 0% 0% round 0px)' : 'inset(9% 7% 0% 7% round 28px)',
    scale: on ? 'scale(1)' : 'scale(1.14)',
    cpClip: on ? 'inset(0% 0% 0% 0% round 32px)' : 'inset(0% 0% 0% 100% round 32px)',
  };
}

export const EASE = 'cubic-bezier(.22,1,.36,1)';
