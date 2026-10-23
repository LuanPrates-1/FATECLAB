import { apiRequest } from "./apiClient";

export type NivelTrilha = "INICIANTE" | "INTERMEDIARIO" | "AVANCADO";

export interface Trilha {
  id: string;
  titulo: string;
  area: string;
  nivel: NivelTrilha;
}

export interface FiltroTrilhas {
  area?: string;
  nivel?: NivelTrilha;
}

export interface Modulo {
  id: string;
  ordem: number;
  titulo: string;
  xpConcedido: number;
}

export interface TrilhaDetalhe extends Trilha {
  modulos: Modulo[];
}

export function listarTrilhas(filtro: FiltroTrilhas = {}): Promise<Trilha[]> {
  const params = new URLSearchParams();
  if (filtro.area) params.set("area", filtro.area);
  if (filtro.nivel) params.set("nivel", filtro.nivel);

  const query = params.toString();
  return apiRequest<Trilha[]>(`/trilhas${query ? `?${query}` : ""}`);
}

export function buscarTrilha(trilhaId: string): Promise<TrilhaDetalhe> {
  return apiRequest<TrilhaDetalhe>(`/trilhas/${trilhaId}`);
}
