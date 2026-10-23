import { useEffect, useState } from "react";
import { ApiError } from "../services/apiClient";
import { obterRanking } from "../services/rankingService";
import type { RankingEntry } from "../services/rankingService";

export function Ranking() {
  const [entradas, setEntradas] = useState<RankingEntry[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    obterRanking()
      .then((resposta) => setEntradas(resposta.entradas))
      .catch((e) => setErro(e instanceof ApiError ? e.message : "Não foi possível carregar o ranking."))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <main className="pagina">
      <h1>Ranking</h1>

      {erro && (
        <p role="alert" className="erro">
          {erro}
        </p>
      )}

      {carregando && <p>Carregando ranking...</p>}

      {!carregando && !erro && (
        <ol>
          {entradas.map((entrada) => (
            <li
              key={entrada.posicao}
              aria-current={entrada.ehVoce ? "true" : undefined}
              style={entrada.ehVoce ? { fontWeight: "bold" } : undefined}
            >
              {entrada.apelido} — {entrada.xpTotal} XP {entrada.ehVoce && "(você)"}
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
