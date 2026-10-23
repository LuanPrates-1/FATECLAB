import type { Id } from "../services/tipos";

/** O back-end devolve IDs numéricos e a URL traz texto: compare sempre por este helper. */
export function mesmoId(a: Id | null | undefined, b: Id | null | undefined): boolean {
  if (a === null || a === undefined || b === null || b === undefined) return false;
  return String(a) === String(b);
}
