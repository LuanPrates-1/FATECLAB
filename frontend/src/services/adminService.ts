import { apiRequest } from "./apiClient";
import type { NivelTrilha, TrilhaDetalhe } from "./trilhaService";

export interface ModuloEntrada {
  ordem: number;
  titulo: string;
  xpConcedido: number;
}

export interface CriarOuEditarTrilha {
  titulo: string;
  area: string;
  nivel: NivelTrilha;
  modulos: ModuloEntrada[];
}

export function criarTrilha(dados: CriarOuEditarTrilha): Promise<TrilhaDetalhe> {
  return apiRequest<TrilhaDetalhe>("/admin/trilhas", { method: "POST", body: dados });
}

export function editarTrilha(trilhaId: string, dados: CriarOuEditarTrilha): Promise<TrilhaDetalhe> {
  return apiRequest<TrilhaDetalhe>(`/admin/trilhas/${trilhaId}`, { method: "PUT", body: dados });
}

export function removerTrilha(trilhaId: string): Promise<void> {
  return apiRequest<void>(`/admin/trilhas/${trilhaId}`, { method: "DELETE" });
}
