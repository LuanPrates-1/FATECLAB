import { apiRequest } from "./apiClient";
import type { Id, Progresso } from "./tipos";

export type { Progresso, StatusProgresso } from "./tipos";

export function iniciarTrilha(trilhaId: Id): Promise<Progresso> {
  return apiRequest<Progresso>(`/trilhas/${trilhaId}/iniciar`, { method: "POST" });
}

/** Conclui um módulo sem quiz. Módulos com quiz são concluídos por quizService.responderQuiz. */
export function concluirModulo(trilhaId: Id, moduloId: Id): Promise<Progresso> {
  return apiRequest<Progresso>(`/trilhas/${trilhaId}/modulos/${moduloId}/concluir`, {
    method: "POST",
  });
}

export function listarMeuProgresso(): Promise<Progresso[]> {
  return apiRequest<Progresso[]>("/alunos/me/progresso");
}
