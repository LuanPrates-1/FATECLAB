import { apiRequest } from "./apiClient";

export type StatusProgresso = "NAO_INICIADA" | "EM_ANDAMENTO" | "CONCLUIDA";

export interface Progresso {
  trilhaId: string;
  status: StatusProgresso;
  moduloAtualId: string | null;
  xpObtidoNaTrilha: number;
}

export function iniciarTrilha(trilhaId: string): Promise<Progresso> {
  return apiRequest<Progresso>(`/trilhas/${trilhaId}/iniciar`, { method: "POST" });
}

export function concluirModulo(trilhaId: string, moduloId: string): Promise<Progresso> {
  return apiRequest<Progresso>(`/trilhas/${trilhaId}/modulos/${moduloId}/concluir`, {
    method: "POST",
  });
}

export function listarMeuProgresso(): Promise<Progresso[]> {
  return apiRequest<Progresso[]>("/alunos/me/progresso");
}
