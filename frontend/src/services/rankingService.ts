import { apiRequest } from "./apiClient";

export interface RankingEntry {
  posicao: number;
  apelido: string;
  xpTotal: number;
  ehVoce: boolean;
}

export interface RankingResposta {
  entradas: RankingEntry[];
}

export function obterRanking(): Promise<RankingResposta> {
  return apiRequest<RankingResposta>("/ranking");
}
