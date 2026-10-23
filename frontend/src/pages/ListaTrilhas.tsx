import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Flame, SearchX } from "lucide-react";
import { useSessao } from "../hooks/useSessao";
import { useCarregar } from "../hooks/useCarregar";
import { listarTrilhas } from "../services/trilhaService";
import { buscarResumo } from "../services/authService";
import type { NivelTrilha, ResumoAluno, Trilha, TrilhaIniciada } from "../services/tipos";
import { NOMES_NIVEL_TRILHA, infoNivel, plural } from "../lib/gamificacao";
import { mesmoId } from "../lib/ids";
import { IconeArea } from "../components/IconeArea";
import { Carregando, ErroCarregamento, Vazio } from "../components/Estados";
import "./ListaTrilhas.css";

const NIVEIS: NivelTrilha[] = ["INICIANTE", "INTERMEDIARIO", "AVANCADO"];

interface Dados {
  trilhas: Trilha[];
  resumo: ResumoAluno | null;
}

export function ListaTrilhas() {
  const { usuario, isAdmin, atualizarUsuario } = useSessao();
  const [area, setArea] = useState<string | null>(null);
  const [nivel, setNivel] = useState<NivelTrilha | null>(null);

  const { dados, erro, carregando, recarregar } = useCarregar<Dados>(
    async () => {
      const [trilhas, resumo] = await Promise.all([
        listarTrilhas(),
        isAdmin ? Promise.resolve(null) : buscarResumo(),
      ]);
      return { trilhas, resumo };
    },
    [isAdmin],
    "Não foi possível carregar as trilhas.",
  );

  useEffect(() => {
    if (dados?.resumo) atualizarUsuario({ ...usuario, ...dados.resumo.aluno });
    // Sincroniza XP e ofensiva da barra superior só quando chegam dados novos.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dados]);

  const areas = useMemo(
    () => [...new Set((dados?.trilhas ?? []).map((t) => t.area))].sort((a, b) => a.localeCompare(b)),
    [dados],
  );

  const trilhasFiltradas = (dados?.trilhas ?? []).filter(
    (t) => (!area || t.area === area) && (!nivel || t.nivel === nivel),
  );

  const iniciadas = dados?.resumo?.trilhas ?? [];
  const emAndamento = iniciadas.find((t) => t.status === "EM_ANDAMENTO");
  const apelido = usuario?.apelido || usuario?.nome?.split(" ")[0] || "aluno";

  return (
    <div className="pagina-app">
      {!isAdmin && (
        <section className="secao" aria-labelledby="saudacao">
          <h1 id="saudacao">Olá, {apelido}</h1>
          <CartaoNivel xp={usuario?.xpTotal ?? 0} ofensiva={usuario?.ofensiva ?? 0} />
          {emAndamento && <CartaoContinuar trilha={emAndamento} />}
        </section>
      )}

      {isAdmin && <h1>Trilhas publicadas</h1>}

      <section className="secao" aria-labelledby="titulo-catalogo">
        {!isAdmin && (
          <h2 id="titulo-catalogo" className="secao-titulo">
            {emAndamento ? "Explore outras trilhas" : "Escolha sua primeira trilha"}
          </h2>
        )}

        <div className="filtros">
          <div className="filtro-chips" role="group" aria-label="Filtrar por área">
            <button type="button" className="chip" aria-pressed={area === null} onClick={() => setArea(null)}>
              Todas
            </button>
            {areas.map((a) => (
              <button
                key={a}
                type="button"
                className="chip"
                aria-pressed={area === a}
                onClick={() => setArea(area === a ? null : a)}
              >
                {a}
              </button>
            ))}
          </div>
          <label className="filtro-nivel">
            <span className="sr-only">Nível</span>
            <select
              aria-label="Nível"
              value={nivel ?? ""}
              onChange={(e) => setNivel((e.target.value || null) as NivelTrilha | null)}
            >
              <option value="">Todos os níveis</option>
              {NIVEIS.map((n) => (
                <option key={n} value={n}>
                  {NOMES_NIVEL_TRILHA[n]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {carregando && !dados && <Carregando linhas={4} rotulo="Carregando trilhas" />}
        {erro && <ErroCarregamento mensagem={erro} aoTentarDeNovo={recarregar} />}

        {dados && trilhasFiltradas.length === 0 && (
          <Vazio icone={<SearchX size={32} aria-hidden="true" />}>
            <p>{dados.trilhas.length === 0 ? "Nenhuma trilha publicada ainda." : "Nenhuma trilha com esses filtros."}</p>
            {dados.trilhas.length > 0 && (
              <button
                type="button"
                className="botao botao-pequeno"
                onClick={() => {
                  setArea(null);
                  setNivel(null);
                }}
              >
                Limpar filtros
              </button>
            )}
          </Vazio>
        )}

        <ul className="lista-trilhas">
          {trilhasFiltradas.map((trilha) => (
            <li key={trilha.id}>
              <ItemTrilha trilha={trilha} progresso={iniciadas.find((p) => mesmoId(p.trilhaId, trilha.id))} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function CartaoNivel({ xp, ofensiva }: { xp: number; ofensiva: number }) {
  const { nivel, inicio, proximo, percentual } = infoNivel(xp);
  return (
    <div className="cartao-nivel">
      <div className="cartao-nivel-topo">
        <div>
          <span className="cartao-nivel-rotulo">Nível</span>
          <span className="cartao-nivel-numero">{nivel}</span>
        </div>
        <div className="cartao-nivel-xp">
          <span className="valor-xp">{xp - inicio}</span>
          <span> de {proximo - inicio} XP</span>
        </div>
      </div>
      <div
        className="barra barra-xp"
        role="progressbar"
        aria-label={`Progresso para o nível ${nivel + 1}`}
        aria-valuemin={0}
        aria-valuemax={proximo - inicio}
        aria-valuenow={xp - inicio}
      >
        <span style={{ width: `${Math.max(3, percentual * 100)}%` }} />
      </div>
      <p className="cartao-nivel-rodape">
        <span>Faltam {proximo - xp} XP para o nível {nivel + 1}</span>
        <span className={`cartao-nivel-ofensiva${ofensiva > 0 ? " ativa" : ""}`}>
          <Flame size={15} aria-hidden="true" />
          {ofensiva > 0 ? plural(ofensiva, "dia seguido", "dias seguidos") : "Estude hoje para começar uma ofensiva"}
        </span>
      </p>
    </div>
  );
}

function CartaoContinuar({ trilha }: { trilha: TrilhaIniciada }) {
  const percentual = trilha.totalModulos ? trilha.modulosConcluidos / trilha.totalModulos : 0;
  return (
    <Link to={`/trilhas/${trilha.trilhaId}`} className="cartao-continuar">
      <IconeArea area={trilha.area} />
      <div className="cartao-continuar-texto">
        <span className="cartao-continuar-rotulo">Continue de onde parou</span>
        <strong>{trilha.titulo}</strong>
        <div className="barra" aria-hidden="true">
          <span style={{ width: `${percentual * 100}%` }} />
        </div>
        <span className="cartao-continuar-meta">
          Módulo {Math.min(trilha.modulosConcluidos + 1, trilha.totalModulos)} de {trilha.totalModulos}
        </span>
      </div>
    </Link>
  );
}

function ItemTrilha({ trilha, progresso }: { trilha: Trilha; progresso?: TrilhaIniciada }) {
  const concluida = progresso?.status === "CONCLUIDA";
  const percentual = progresso && progresso.totalModulos ? progresso.modulosConcluidos / progresso.totalModulos : 0;
  return (
    <Link to={`/trilhas/${trilha.id}`} className="item-trilha">
      <IconeArea area={trilha.area} />
      <div className="item-trilha-texto">
        <div className="item-trilha-linha">
          <h3>{trilha.titulo}</h3>
          {concluida && <CheckCircle2 size={18} className="item-trilha-concluida" aria-label="Trilha concluída" />}
        </div>
        {trilha.descricao && <p className="item-trilha-descricao">{trilha.descricao}</p>}
        <p className="item-trilha-meta">
          <span className={`etiqueta-nivel nivel-${trilha.nivel.toLowerCase()}`}>{NOMES_NIVEL_TRILHA[trilha.nivel]}</span>
          {trilha.totalModulos !== undefined && <span>{plural(trilha.totalModulos, "módulo", "módulos")}</span>}
          {trilha.xpTotal !== undefined && <span className="valor-xp">{trilha.xpTotal} XP</span>}
        </p>
        {progresso && !concluida && (
          <div className="barra item-trilha-barra" aria-label={`${progresso.modulosConcluidos} de ${progresso.totalModulos} módulos concluídos`} role="img">
            <span style={{ width: `${Math.max(4, percentual * 100)}%` }} />
          </div>
        )}
      </div>
    </Link>
  );
}
