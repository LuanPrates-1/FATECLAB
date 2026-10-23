import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Eye, Pencil, Plus, Trash2, X } from "lucide-react";
import { ApiError } from "../services/apiClient";
import { buscarTrilhaAdmin, criarTrilha, editarTrilha, removerTrilha } from "../services/adminService";
import { listarTrilhas } from "../services/trilhaService";
import type { CriarOuEditarTrilha, Id, ModuloEntrada, NivelTrilha, QuestaoEntrada, Trilha } from "../services/tipos";
import { useCarregar } from "../hooks/useCarregar";
import { NOMES_NIVEL_TRILHA, plural } from "../lib/gamificacao";
import { IconeArea } from "../components/IconeArea";
import { Carregando, ErroCarregamento } from "../components/Estados";
import "./Admin.css";

const NIVEIS: NivelTrilha[] = ["INICIANTE", "INTERMEDIARIO", "AVANCADO"];

const novaQuestao = (): QuestaoEntrada => ({
  enunciado: "",
  explicacao: "",
  alternativas: [
    { texto: "", correta: true },
    { texto: "", correta: false },
    { texto: "", correta: false },
    { texto: "", correta: false },
  ],
});

const novoModulo = (ordem: number): ModuloEntrada => ({
  ordem,
  titulo: "",
  xpConcedido: 20,
  conteudo: "",
  questoes: [novaQuestao()],
});

const TRILHA_VAZIA: CriarOuEditarTrilha = {
  titulo: "",
  area: "",
  nivel: "INICIANTE",
  descricao: "",
  modulos: [novoModulo(1)],
};

export function Admin() {
  const [editando, setEditando] = useState<{ id: Id | null; dados: CriarOuEditarTrilha } | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [erroAcao, setErroAcao] = useState<string | null>(null);
  const [confirmandoRemocao, setConfirmandoRemocao] = useState<Id | null>(null);
  const [abrindo, setAbrindo] = useState<Id | null>(null);

  const { dados: trilhas, erro, carregando, recarregar } = useCarregar(
    () => listarTrilhas(),
    [],
    "Não foi possível carregar as trilhas.",
  );

  async function abrirEdicao(trilha: Trilha) {
    setErroAcao(null);
    setAviso(null);
    setAbrindo(trilha.id);
    try {
      const completa = await buscarTrilhaAdmin(trilha.id);
      setEditando({
        id: completa.id,
        dados: {
          titulo: completa.titulo,
          area: completa.area,
          nivel: completa.nivel,
          descricao: completa.descricao ?? "",
          modulos: completa.modulos.map((m) => ({
            ordem: m.ordem,
            titulo: m.titulo,
            xpConcedido: m.xpConcedido,
            conteudo: m.conteudo ?? "",
            questoes: m.questoes.map((q) => ({
              enunciado: q.enunciado,
              explicacao: q.explicacao ?? "",
              alternativas: q.alternativas.map((a) => ({ texto: a.texto, correta: a.correta })),
            })),
          })),
        },
      });
    } catch (e) {
      setErroAcao(e instanceof ApiError ? e.message : "Não foi possível abrir a trilha.");
    } finally {
      setAbrindo(null);
    }
  }

  async function aoRemover(trilhaId: Id) {
    setErroAcao(null);
    try {
      await removerTrilha(trilhaId);
      setConfirmandoRemocao(null);
      setAviso("Trilha removida. Ela não aparece mais para os alunos, e o progresso deles foi mantido.");
      await recarregar();
    } catch (e) {
      setErroAcao(e instanceof ApiError ? e.message : "Não foi possível remover a trilha.");
    }
  }

  if (editando) {
    return (
      <EditorTrilha
        trilhaId={editando.id}
        inicial={editando.dados}
        areasExistentes={[...new Set((trilhas ?? []).map((t) => t.area))]}
        aoCancelar={() => setEditando(null)}
        aoSalvar={async (mensagem) => {
          setEditando(null);
          setAviso(mensagem);
          await recarregar();
        }}
      />
    );
  }

  return (
    <div className="pagina-app">
      <header className="admin-cabecalho">
        <div>
          <h1>Administração</h1>
          <p className="admin-subtitulo">Crie e edite trilhas, lições e quizzes.</p>
        </div>
        <button
          type="button"
          className="botao botao-principal"
          onClick={() => {
            setAviso(null);
            setEditando({ id: null, dados: structuredClone(TRILHA_VAZIA) });
          }}
        >
          <Plus size={18} aria-hidden="true" />
          Nova trilha
        </button>
      </header>

      {aviso && (
        <p role="status" className="mensagem-sucesso">
          {aviso}
        </p>
      )}
      {erroAcao && (
        <p role="alert" className="mensagem-erro">
          {erroAcao}
        </p>
      )}

      {carregando && !trilhas && <Carregando linhas={4} rotulo="Carregando trilhas" />}
      {erro && <ErroCarregamento mensagem={erro} aoTentarDeNovo={recarregar} />}

      {trilhas && (
        <section className="secao" aria-labelledby="titulo-publicadas">
          <h2 id="titulo-publicadas" className="secao-titulo">
            {plural(trilhas.length, "trilha publicada", "trilhas publicadas")}
          </h2>
          <ul className="admin-lista">
            {trilhas.map((trilha) => (
              <li key={trilha.id} className="admin-item">
                <IconeArea area={trilha.area} tamanho={20} />
                <div className="admin-item-texto">
                  <strong>{trilha.titulo}</strong>
                  <span>
                    {trilha.area}, {NOMES_NIVEL_TRILHA[trilha.nivel].toLowerCase()},{" "}
                    {plural(trilha.totalModulos ?? 0, "módulo", "módulos")}
                  </span>
                </div>
                {confirmandoRemocao === trilha.id ? (
                  <div className="admin-confirmar" role="group" aria-label={`Confirmar remoção de ${trilha.titulo}`}>
                    <button type="button" className="botao botao-pequeno botao-perigo" onClick={() => aoRemover(trilha.id)}>
                      Remover
                    </button>
                    <button type="button" className="botao botao-pequeno botao-fantasma" onClick={() => setConfirmandoRemocao(null)}>
                      Manter
                    </button>
                  </div>
                ) : (
                  <div className="admin-item-acoes">
                    <Link to={`/trilhas/${trilha.id}`} className="botao-icone" aria-label={`Ver ${trilha.titulo} como aluno`}>
                      <Eye size={18} aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      className="botao-icone"
                      aria-label={`Editar ${trilha.titulo}`}
                      disabled={abrindo !== null}
                      onClick={() => abrirEdicao(trilha)}
                    >
                      <Pencil size={18} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="botao-icone botao-icone-perigo"
                      aria-label={`Remover ${trilha.titulo}`}
                      onClick={() => setConfirmandoRemocao(trilha.id)}
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

interface PropsEditor {
  trilhaId: Id | null;
  inicial: CriarOuEditarTrilha;
  areasExistentes: string[];
  aoCancelar: () => void;
  aoSalvar: (mensagem: string) => void;
}

function EditorTrilha({ trilhaId, inicial, areasExistentes, aoCancelar, aoSalvar }: PropsEditor) {
  const [form, setForm] = useState<CriarOuEditarTrilha>(inicial);
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [aberto, setAberto] = useState<number>(0);

  function alterarModulo(indice: number, alteracao: Partial<ModuloEntrada>) {
    setForm((atual) => ({
      ...atual,
      modulos: atual.modulos.map((m, i) => (i === indice ? { ...m, ...alteracao } : m)),
    }));
  }

  function alterarQuestao(mi: number, qi: number, alteracao: Partial<QuestaoEntrada>) {
    const questoes = [...(form.modulos[mi].questoes ?? [])];
    questoes[qi] = { ...questoes[qi], ...alteracao };
    alterarModulo(mi, { questoes });
  }

  function adicionarModulo() {
    const ordem = Math.max(0, ...form.modulos.map((m) => m.ordem)) + 1;
    setForm((atual) => ({ ...atual, modulos: [...atual.modulos, novoModulo(ordem)] }));
    setAberto(form.modulos.length);
  }

  function removerModulo(indice: number) {
    setForm((atual) => ({ ...atual, modulos: atual.modulos.filter((_, i) => i !== indice) }));
  }

  async function aoSubmeter(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro(null);
    setSalvando(true);
    const dados: CriarOuEditarTrilha = {
      ...form,
      modulos: form.modulos.map((m) => ({
        ...m,
        questoes: (m.questoes ?? []).filter((q) => q.enunciado.trim()),
      })),
    };
    try {
      if (trilhaId !== null) {
        await editarTrilha(trilhaId, dados);
        aoSalvar(`Trilha "${dados.titulo}" atualizada.`);
      } else {
        await criarTrilha(dados);
        aoSalvar(`Trilha "${dados.titulo}" criada e publicada para os alunos.`);
      }
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível salvar a trilha.");
      setSalvando(false);
    }
  }

  return (
    <form className="pagina-app editor" onSubmit={aoSubmeter}>
      <header className="admin-cabecalho">
        <h1>{trilhaId !== null ? "Editar trilha" : "Nova trilha"}</h1>
        <button type="button" className="botao-icone" onClick={aoCancelar} aria-label="Fechar o editor sem salvar">
          <X size={20} aria-hidden="true" />
        </button>
      </header>

      <section className="secao">
        <div className="campo">
          <label htmlFor="titulo">Título</label>
          <input id="titulo" required value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
        </div>
        <div className="editor-linha">
          <div className="campo">
            <label htmlFor="area">Área</label>
            <input
              id="area"
              required
              list="areas-existentes"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            />
            <datalist id="areas-existentes">
              {areasExistentes.map((a) => (
                <option key={a} value={a} />
              ))}
            </datalist>
          </div>
          <div className="campo">
            <label htmlFor="nivel">Nível</label>
            <select id="nivel" value={form.nivel} onChange={(e) => setForm({ ...form, nivel: e.target.value as NivelTrilha })}>
              {NIVEIS.map((n) => (
                <option key={n} value={n}>
                  {NOMES_NIVEL_TRILHA[n]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="campo">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            rows={3}
            maxLength={500}
            value={form.descricao ?? ""}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
        </div>
      </section>

      <section className="secao" aria-labelledby="titulo-modulos">
        <h2 id="titulo-modulos" className="secao-titulo">
          Módulos
        </h2>
        {form.modulos.map((modulo, mi) => (
          <div key={mi} className={`editor-modulo${aberto === mi ? " aberto" : ""}`}>
            <button
              type="button"
              className="editor-modulo-cabecalho"
              aria-expanded={aberto === mi}
              onClick={() => setAberto(aberto === mi ? -1 : mi)}
            >
              <span className="editor-modulo-ordem">{mi + 1}</span>
              <span className="editor-modulo-nome">{modulo.titulo || "Módulo sem título"}</span>
              <span className="editor-modulo-resumo">{plural(modulo.questoes?.length ?? 0, "questão", "questões")}</span>
              <ChevronDown size={18} aria-hidden="true" className="editor-modulo-seta" />
            </button>

            {aberto === mi && (
              <div className="editor-modulo-corpo">
                <div className="editor-linha">
                  <div className="campo campo-largo">
                    <label htmlFor={`m${mi}-titulo`}>Título do módulo</label>
                    <input
                      id={`m${mi}-titulo`}
                      aria-label={`Título do módulo ${mi + 1}`}
                      required
                      value={modulo.titulo}
                      onChange={(e) => alterarModulo(mi, { titulo: e.target.value })}
                    />
                  </div>
                  <div className="campo campo-xp">
                    <label htmlFor={`m${mi}-xp`}>XP</label>
                    <input
                      id={`m${mi}-xp`}
                      aria-label={`XP do módulo ${mi + 1}`}
                      type="number"
                      min={0}
                      required
                      value={modulo.xpConcedido}
                      onChange={(e) => alterarModulo(mi, { xpConcedido: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="campo">
                  <label htmlFor={`m${mi}-conteudo`}>Lição</label>
                  <textarea
                    id={`m${mi}-conteudo`}
                    rows={8}
                    value={modulo.conteudo ?? ""}
                    onChange={(e) => alterarModulo(mi, { conteudo: e.target.value })}
                  />
                  <span className="ajuda">
                    Formatação: ## título, - item de lista, **negrito**, `código` e blocos entre ```.
                  </span>
                </div>

                {(modulo.questoes ?? []).map((q, qi) => (
                  <fieldset key={qi} className="editor-questao">
                    <legend>Questão {qi + 1}</legend>
                    <div className="campo">
                      <label htmlFor={`m${mi}q${qi}-enunciado`}>Enunciado</label>
                      <textarea
                        id={`m${mi}q${qi}-enunciado`}
                        rows={2}
                        value={q.enunciado}
                        onChange={(e) => alterarQuestao(mi, qi, { enunciado: e.target.value })}
                      />
                    </div>
                    <div className="campo">
                      <span className="rotulo">Alternativas (marque a correta)</span>
                      {q.alternativas.map((a, ai) => (
                        <div key={ai} className="editor-alternativa">
                          <input
                            type="radio"
                            name={`m${mi}q${qi}-correta`}
                            checked={a.correta}
                            aria-label={`Alternativa ${ai + 1} é a correta`}
                            onChange={() =>
                              alterarQuestao(mi, qi, {
                                alternativas: q.alternativas.map((x, xi) => ({ ...x, correta: xi === ai })),
                              })
                            }
                          />
                          <input
                            type="text"
                            aria-label={`Texto da alternativa ${ai + 1}`}
                            required={Boolean(q.enunciado.trim())}
                            value={a.texto}
                            onChange={(e) =>
                              alterarQuestao(mi, qi, {
                                alternativas: q.alternativas.map((x, xi) => (xi === ai ? { ...x, texto: e.target.value } : x)),
                              })
                            }
                          />
                          {q.alternativas.length > 2 && (
                            <button
                              type="button"
                              className="botao-icone"
                              aria-label={`Remover alternativa ${ai + 1}`}
                              onClick={() => {
                                const restantes = q.alternativas.filter((_, xi) => xi !== ai);
                                if (!restantes.some((x) => x.correta)) restantes[0] = { ...restantes[0], correta: true };
                                alterarQuestao(mi, qi, { alternativas: restantes });
                              }}
                            >
                              <X size={16} aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      ))}
                      {q.alternativas.length < 6 && (
                        <button
                          type="button"
                          className="botao botao-pequeno botao-fantasma editor-adicionar"
                          onClick={() =>
                            alterarQuestao(mi, qi, { alternativas: [...q.alternativas, { texto: "", correta: false }] })
                          }
                        >
                          <Plus size={16} aria-hidden="true" />
                          Alternativa
                        </button>
                      )}
                    </div>
                    <div className="campo">
                      <label htmlFor={`m${mi}q${qi}-explicacao`}>Explicação (mostrada depois da resposta)</label>
                      <textarea
                        id={`m${mi}q${qi}-explicacao`}
                        rows={2}
                        value={q.explicacao ?? ""}
                        onChange={(e) => alterarQuestao(mi, qi, { explicacao: e.target.value })}
                      />
                    </div>
                    <button
                      type="button"
                      className="botao botao-pequeno botao-perigo"
                      onClick={() =>
                        alterarModulo(mi, { questoes: (modulo.questoes ?? []).filter((_, xi) => xi !== qi) })
                      }
                    >
                      Remover questão
                    </button>
                  </fieldset>
                ))}

                <div className="editor-modulo-acoes">
                  <button
                    type="button"
                    className="botao botao-pequeno"
                    onClick={() => alterarModulo(mi, { questoes: [...(modulo.questoes ?? []), novaQuestao()] })}
                  >
                    <Plus size={16} aria-hidden="true" />
                    Questão
                  </button>
                  {form.modulos.length > 1 && (
                    <button type="button" className="botao botao-pequeno botao-perigo" onClick={() => removerModulo(mi)}>
                      Remover módulo
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <button type="button" className="botao botao-largo" onClick={adicionarModulo}>
          <Plus size={18} aria-hidden="true" />
          Adicionar módulo
        </button>
      </section>

      {erro && (
        <p role="alert" className="mensagem-erro">
          {erro}
        </p>
      )}

      <div className="editor-salvar">
        <button type="submit" className="botao botao-principal botao-largo" disabled={salvando}>
          {salvando ? "Salvando..." : trilhaId !== null ? "Salvar alterações" : "Criar trilha"}
        </button>
      </div>
    </form>
  );
}
