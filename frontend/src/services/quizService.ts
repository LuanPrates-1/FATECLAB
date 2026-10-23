import { apiRequest } from "./apiClient";
import type { Id, Licao, ResultadoQuiz, Verificacao } from "./tipos";

export function buscarLicao(trilhaId: Id, moduloId: Id): Promise<Licao> {
  return apiRequest<Licao>(`/trilhas/${trilhaId}/modulos/${moduloId}/licao`);
}

export function verificarResposta(
  trilhaId: Id,
  moduloId: Id,
  questaoId: Id,
  alternativaId: Id,
): Promise<Verificacao> {
  return apiRequest<Verificacao>(
    `/trilhas/${trilhaId}/modulos/${moduloId}/questoes/${questaoId}/verificar`,
    { method: "POST", body: { alternativaId } },
  );
}

export function responderQuiz(
  trilhaId: Id,
  moduloId: Id,
  respostas: { questaoId: Id; alternativaId: Id }[],
): Promise<ResultadoQuiz> {
  return apiRequest<ResultadoQuiz>(`/trilhas/${trilhaId}/modulos/${moduloId}/responder`, {
    method: "POST",
    body: { respostas },
  });
}
