import { apiRequest } from "./apiClient";
import type { RankingResposta } from "./tipos";

export type { RankingEntry, RankingResposta } from "./tipos";

export function obterRanking(): Promise<RankingResposta> {
  return apiRequest<RankingResposta>("/ranking");
}
