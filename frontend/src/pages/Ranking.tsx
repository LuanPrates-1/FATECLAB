import { Flame, Trophy } from "lucide-react";
import { obterRanking } from "../services/rankingService";
import type { RankingEntry } from "../services/tipos";
import { useCarregar } from "../hooks/useCarregar";
import { Avatar } from "../components/Avatar";
import { Carregando, ErroCarregamento, Vazio } from "../components/Estados";
import "./Ranking.css";

export function Ranking() {
  const { dados, erro, carregando, recarregar } = useCarregar(
    obterRanking,
    [],
    "Não foi possível carregar o ranking.",
  );
  const entradas = dados?.entradas ?? [];
  const podio = entradas.slice(0, 3);
  const voce = entradas.find((e) => e.ehVoce);
  const voceForaDaTela = voce && voce.posicao > 8;

  return (
    <div className="pagina-app pagina-ranking">
      <header>
        <h1>Ranking geral</h1>
        <p className="ranking-subtitulo">Alunos ordenados pelo XP total. Conclua módulos para subir.</p>
      </header>

      {carregando && !dados && <Carregando linhas={5} rotulo="Carregando ranking" />}
      {erro && <ErroCarregamento mensagem={erro} aoTentarDeNovo={recarregar} />}
      {dados && entradas.length === 0 && (
        <Vazio icone={<Trophy size={32} aria-hidden="true" />}>
          <p>Ninguém pontuou ainda. Conclua um módulo e seja o primeiro.</p>
        </Vazio>
      )}

      {podio.length > 0 && (
        <ol className="podio" aria-label="Três primeiros colocados">
          {[podio[1], podio[0], podio[2]].map(
            (entrada) =>
              entrada && (
                <li key={entrada.posicao} className={`podio-lugar lugar-${entrada.posicao}${entrada.ehVoce ? " eh-voce" : ""}`}>
                  <Avatar nome={entrada.apelido} tamanho={entrada.posicao === 1 ? 64 : 52} destaque={entrada.ehVoce} />
                  <span className="podio-nome">
                    {entrada.apelido}
                    {entrada.ehVoce && <span className="sr-only"> (você)</span>}
                  </span>
                  <span className="valor-xp podio-xp">{entrada.xpTotal} XP</span>
                  <span className="podio-base" aria-hidden="true">
                    {entrada.posicao}
                  </span>
                </li>
              ),
          )}
        </ol>
      )}

      {entradas.length > 3 && (
        <ol className="lista-ranking" start={4} aria-label="Demais colocados">
          {entradas.slice(3).map((entrada) => (
            <LinhaRanking key={entrada.posicao} entrada={entrada} />
          ))}
        </ol>
      )}

      {voceForaDaTela && voce && (
        <div className="ranking-voce">
          <LinhaRanking entrada={voce} comoDiv />
        </div>
      )}
    </div>
  );
}

function LinhaRanking({ entrada, comoDiv = false }: { entrada: RankingEntry; comoDiv?: boolean }) {
  const conteudo = (
    <>
      <span className="ranking-posicao">{entrada.posicao}</span>
      <Avatar nome={entrada.apelido} tamanho={36} destaque={entrada.ehVoce} />
      <span className="ranking-nome">
        {entrada.apelido}
        {entrada.ehVoce && <span className="ranking-voce-rotulo">você</span>}
        {entrada.nivel !== undefined && <span className="ranking-nivel">Nível {entrada.nivel}</span>}
      </span>
      {(entrada.ofensiva ?? 0) > 0 && (
        <span className="valor-ofensiva ranking-ofensiva" title={`Ofensiva de ${entrada.ofensiva} dias`}>
          <Flame size={14} aria-hidden="true" />
          {entrada.ofensiva}
        </span>
      )}
      <span className="valor-xp ranking-xp">{entrada.xpTotal} XP</span>
    </>
  );
  const classe = `linha-ranking${entrada.ehVoce ? " eh-voce" : ""}`;
  return comoDiv ? <div className={classe}>{conteudo}</div> : <li className={classe}>{conteudo}</li>;
}
