import { apiRequest } from "./apiClient";
import type { Id, NivelTrilha, Trilha, TrilhaDetalhe } from "./tipos";

export type { NivelTrilha, Trilha, TrilhaDetalhe, Modulo } from "./tipos";

export interface FiltroTrilhas {
  area?: string;
  nivel?: NivelTrilha;
}

export function listarTrilhas(filtro: FiltroTrilhas = {}): Promise<Trilha[]> {
  const params = new URLSearchParams();
  if (filtro.area) params.set("area", filtro.area);
  if (filtro.nivel) params.set("nivel", filtro.nivel);
  const query = params.toString();
  return apiRequest<Trilha[]>(`/trilhas${query ? `?${query}` : ""}`);
}

export function buscarTrilha(trilhaId: Id): Promise<TrilhaDetalhe> {
  return apiRequest<TrilhaDetalhe>(`/trilhas/${trilhaId}`);
}
