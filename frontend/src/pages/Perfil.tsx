import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Crown,
  Flame,
  Footprints,
  Lock,
  LogOut,
  Medal,
  Pencil,
  Route,
  Target,
  Timer,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ApiError } from "../services/apiClient";
import { atualizarApelido, buscarResumo } from "../services/authService";
import type { Conquista } from "../services/tipos";
import { useSessao } from "../hooks/useSessao";
import { useCarregar } from "../hooks/useCarregar";
import { infoNivel } from "../lib/gamificacao";
import { Avatar } from "../components/Avatar";
import { IconeArea } from "../components/IconeArea";
import { Carregando, ErroCarregamento } from "../components/Estados";
import "./Perfil.css";

const ICONES_CONQUISTA: Record<string, LucideIcon> = {
  PRIMEIRO_PASSO: Footprints,
  MARATONISTA: Timer,
  TRILHA_COMPLETA: Route,
  GABARITOU: Target,
  EM_CHAMAS: Flame,
  IMPARAVEL: Zap,
  PODIO: Medal,
  VETERANO: Crown,
};

export function Perfil() {
  const { usuario, isAdmin, atualizarUsuario, logout } = useSessao();
  const [editando, setEditando] = useState(false);
  const [apelido, setApelido] = useState(usuario?.apelido ?? "");
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const resumo = useCarregar(
    () => (isAdmin ? Promise.resolve(null) : buscarResumo()),
    [isAdmin],
    "Não foi possível carregar suas estatísticas.",
  );

  useEffect(() => {
    if (resumo.dados) atualizarUsuario({ ...usuario, ...resumo.dados.aluno });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumo.dados]);

  async function aoSubmeter(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro(null);
    setSucesso(false);
    setSalvando(true);
    try {
      const atualizado = await atualizarApelido(apelido.trim());
      atualizarUsuario({ ...usuario, ...atualizado });
      setSucesso(true);
      setEditando(false);
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível atualizar o apelido.");
    } finally {
      setSalvando(false);
    }
  }

  const xp = usuario?.xpTotal ?? 0;
  const { nivel, inicio, proximo, percentual } = infoNivel(xp);
  const dados = resumo.dados;
  const desbloqueadas = dados?.conquistas.filter((c) => c.desbloqueada).length ?? 0;

  return (
    <div className="pagina-app pagina-perfil">
      <header className="perfil-cabecalho">
        <Avatar nome={usuario?.apelido || usuario?.nome} tamanho={72} destaque />
        <div className="perfil-identidade">
          <h1>{usuario?.apelido || usuario?.nome}</h1>
          <p>{usuario?.nome}</p>
          {!isAdmin && (
            <p className="perfil-nivel">
              Nível {nivel}, <span className="valor-xp">{xp} XP</span>
            </p>
          )}
          {isAdmin && <p className="perfil-nivel">Administrador</p>}
        </div>
      </header>

      {!isAdmin && (
        <section className="secao" aria-label="Apelido no ranking">
          {editando ? (
            <form className="perfil-apelido-form" onSubmit={aoSubmeter}>
              <div className="campo">
                <label htmlFor="apelido">Apelido exibido no ranking</label>
                <input
                  id="apelido"
                  name="apelido"
                  type="text"
                  maxLength={40}
                  required
                  value={apelido}
                  onChange={(e) => setApelido(e.target.value)}
                />
              </div>
              <div className="perfil-apelido-acoes">
                <button type="submit" className="botao botao-principal" disabled={salvando || !apelido.trim()}>
                  {salvando ? "Salvando..." : "Salvar apelido"}
                </button>
                <button type="button" className="botao botao-fantasma" onClick={() => setEditando(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              className="botao botao-pequeno perfil-editar"
              onClick={() => {
                setApelido(usuario?.apelido ?? "");
                setSucesso(false);
                setEditando(true);
              }}
            >
              <Pencil size={16} aria-hidden="true" />
              Alterar apelido
            </button>
          )}
          {erro && (
            <p role="alert" className="mensagem-erro">
              {erro}
            </p>
          )}
          {sucesso && (
            <p role="status" className="mensagem-sucesso">
              Apelido atualizado. É assim que você aparece no ranking.
            </p>
          )}
        </section>
      )}

      {!isAdmin && resumo.carregando && !dados && <Carregando linhas={3} rotulo="Carregando estatísticas" />}
      {!isAdmin && resumo.erro && <ErroCarregamento mensagem={resumo.erro} aoTentarDeNovo={resumo.recarregar} />}

      {dados && (
        <>
          <section className="secao" aria-labelledby="titulo-progresso">
            <h2 id="titulo-progresso" className="secao-titulo">
              Seus números
            </h2>
            <div className="perfil-barra-nivel">
              <div className="barra barra-xp" aria-hidden="true">
                <span style={{ width: `${Math.max(3, percentual * 100)}%` }} />
              </div>
              <p>
                {xp - inicio} de {proximo - inicio} XP no nível {nivel}
              </p>
            </div>
            <dl className="estatisticas">
              <Estatistica rotulo="Posição no ranking" valor={dados.posicaoRanking ? `${dados.posicaoRanking}º` : "-"} detalhe={`de ${dados.totalAlunos}`} />
              <Estatistica rotulo="Ofensiva atual" valor={String(dados.aluno.ofensiva ?? 0)} detalhe={`recorde: ${dados.aluno.maiorOfensiva ?? 0}`} tipo={(dados.aluno.ofensiva ?? 0) > 0 ? "ofensiva" : undefined} />
              <Estatistica rotulo="Módulos concluídos" valor={String(dados.modulosConcluidos)} />
              <Estatistica rotulo="Trilhas concluídas" valor={String(dados.trilhasConcluidas)} />
              <Estatistica rotulo="Quizzes gabaritados" valor={String(dados.quizzesGabaritados)} />
              <Estatistica rotulo="XP total" valor={String(xp)} tipo="xp" />
            </dl>
          </section>

          <section className="secao" aria-labelledby="titulo-conquistas">
            <h2 id="titulo-conquistas" className="secao-titulo">
              Conquistas{" "}
              <span className="secao-contagem">
                {desbloqueadas} de {dados.conquistas.length}
              </span>
            </h2>
            <ul className="conquistas">
              {dados.conquistas.map((c) => (
                <ItemConquista key={c.codigo} conquista={c} />
              ))}
            </ul>
          </section>

          {dados.trilhas.length > 0 && (
            <section className="secao" aria-labelledby="titulo-minhas-trilhas">
              <h2 id="titulo-minhas-trilhas" className="secao-titulo">
                Minhas trilhas
              </h2>
              <ul className="minhas-trilhas">
                {dados.trilhas.map((t) => (
                  <li key={t.trilhaId}>
                    <Link to={`/trilhas/${t.trilhaId}`} className="minha-trilha">
                      <IconeArea area={t.area} tamanho={20} />
                      <span className="minha-trilha-texto">
                        <strong>{t.titulo}</strong>
                        <span>
                          {t.status === "CONCLUIDA"
                            ? "Concluída"
                            : `${t.modulosConcluidos} de ${t.totalModulos} módulos`}
                        </span>
                      </span>
                      <span className="valor-xp">{t.xpObtido} XP</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <button type="button" className="botao botao-perigo botao-largo" onClick={logout}>
        <LogOut size={18} aria-hidden="true" />
        Sair da conta
      </button>
    </div>
  );
}

function Estatistica({ rotulo, valor, detalhe, tipo }: { rotulo: string; valor: string; detalhe?: string; tipo?: "xp" | "ofensiva" }) {
  return (
    <div className="estatistica">
      <dt>{rotulo}</dt>
      <dd>
        <span className={tipo === "xp" ? "valor-xp" : tipo === "ofensiva" ? "valor-ofensiva" : undefined}>{valor}</span>
        {detalhe && <small>{detalhe}</small>}
      </dd>
    </div>
  );
}

function ItemConquista({ conquista }: { conquista: Conquista }) {
  const Icone = ICONES_CONQUISTA[conquista.codigo] ?? Award;
  return (
    <li className={`conquista${conquista.desbloqueada ? " desbloqueada" : ""}`}>
      <span className="conquista-icone" aria-hidden="true">
        {conquista.desbloqueada ? <Icone size={22} /> : <Lock size={18} />}
      </span>
      <span className="conquista-titulo">{conquista.titulo}</span>
      <span className="conquista-descricao">{conquista.descricao}</span>
      <span className="sr-only">{conquista.desbloqueada ? "Desbloqueada" : "Bloqueada"}</span>
    </li>
  );
}
