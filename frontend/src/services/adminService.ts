import { apiRequest } from "./apiClient";
import type { AdminTrilha, CriarOuEditarTrilha, Id, TrilhaDetalhe } from "./tipos";

export type { CriarOuEditarTrilha, ModuloEntrada } from "./tipos";

export function buscarTrilhaAdmin(trilhaId: Id): Promise<AdminTrilha> {
  return apiRequest<AdminTrilha>(`/admin/trilhas/${trilhaId}`);
}

export function criarTrilha(dados: CriarOuEditarTrilha): Promise<TrilhaDetalhe> {
  return apiRequest<TrilhaDetalhe>("/admin/trilhas", { method: "POST", body: dados });
}

export function editarTrilha(trilhaId: Id, dados: CriarOuEditarTrilha): Promise<TrilhaDetalhe> {
  return apiRequest<TrilhaDetalhe>(`/admin/trilhas/${trilhaId}`, { method: "PUT", body: dados });
}

export function removerTrilha(trilhaId: Id): Promise<void> {
  return apiRequest<void>(`/admin/trilhas/${trilhaId}`, { method: "DELETE" });
}
