import type { NivelTrilha } from "../services/tipos";

/** Mesma curva do back-end (gamificacao/Nivel.java): o nível n começa em 50·n·(n−1) XP. */
export function xpInicialDoNivel(nivel: number): number {
  return 50 * nivel * (nivel - 1);
}

export function calcularNivel(xp: number): number {
  let nivel = 1;
  while (xpInicialDoNivel(nivel + 1) <= Math.max(0, xp)) nivel++;
  return nivel;
}

export function infoNivel(xp: number) {
  const nivel = calcularNivel(xp);
  const inicio = xpInicialDoNivel(nivel);
  const proximo = xpInicialDoNivel(nivel + 1);
  return { nivel, inicio, proximo, percentual: (xp - inicio) / (proximo - inicio) };
}

export const NOMES_NIVEL_TRILHA: Record<NivelTrilha, string> = {
  INICIANTE: "Iniciante",
  INTERMEDIARIO: "Intermediário",
  AVANCADO: "Avançado",
};

export function iniciais(texto: string | null | undefined): string {
  const partes = (texto ?? "?").replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/);
  const letras = partes.length > 1 ? partes[0][0] + partes[1][0] : (partes[0] ?? "?").slice(0, 2);
  return letras.toUpperCase();
}

export function plural(n: number, singular: string, pluralForma: string): string {
  return `${n} ${n === 1 ? singular : pluralForma}`;
}
