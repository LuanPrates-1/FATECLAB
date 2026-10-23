import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BookOpen, CheckCircle2, Flame, RotateCcw, Sparkles, X, XCircle } from "lucide-react";
import { ApiError } from "../services/apiClient";
import { buscarLicao, responderQuiz, verificarResposta } from "../services/quizService";
import { concluirModulo, listarMeuProgresso } from "../services/progressoService";
import { buscarMeuPerfil } from "../services/authService";
import type { Id, Licao as LicaoDados, Progresso, ResultadoQuiz, Verificacao } from "../services/tipos";
import { useCarregar } from "../hooks/useCarregar";
import { useSessao } from "../hooks/useSessao";
import { mesmoId } from "../lib/ids";
import { plural } from "../lib/gamificacao";
import { Markdown } from "../components/Markdown";
import { Carregando, ErroCarregamento } from "../components/Estados";
import "./Licao.css";

type Etapa = "leitura" | "quiz" | "enviando" | "resultado";

interface Dados {
  licao: LicaoDados;
  progresso: Progresso | null;
}

const LETRAS = ["A", "B", "C", "D", "E", "F"];

export function Licao() {
  const { id, moduloId } = useParams<{ id: string; moduloId: string }>();
  const trilhaId = id!;
  const navigate = useNavigate();
  const { usuario, isAdmin, atualizarUsuario } = useSessao();

  const [etapa, setEtapa] = useState<Etapa>("leitura");
  const [indice, setIndice] = useState(0);
  const [escolhida, setEscolhida] = useState<Id | null>(null);
  const [verificacao, setVerificacao] = useState<Verificacao | null>(null);
  const [respostas, setRespostas] = useState<{ questaoId: Id; alternativaId: Id; correta: boolean }[]>([]);
  const [resultado, setResultado] = useState<ResultadoQuiz | null>(null);
  const [xpSemQuiz, setXpSemQuiz] = useState<{ xp: number; proximo: Id | null } | null>(null);
  const [erroAcao, setErroAcao] = useState<string | null>(null);
  const [verificando, setVerificando] = useState(false);
  const topoRef = useRef<HTMLDivElement>(null);

  const { dados, erro, carregando, recarregar } = useCarregar<Dados>(
    async () => {
      const [licao, lista] = await Promise.all([
        buscarLicao(trilhaId, moduloId!),
        isAdmin ? Promise.resolve([] as Progresso[]) : listarMeuProgresso(),
      ]);
      return { licao, progresso: lista.find((p) => mesmoId(p.trilhaId, trilhaId)) ?? null };
    },
    [trilhaId, moduloId, isAdmin],
    "Não foi possível carregar a lição.",
  );

  // Ao trocar de módulo (botão "Próximo módulo"), volta para a leitura.
  useEffect(() => {
    setEtapa("leitura");
    reiniciarQuiz();
  }, [moduloId]);

  // Volta ao topo da área rolável a cada etapa/questão (sem rolar a página inteira).
  useEffect(() => {
    topoRef.current?.parentElement?.querySelectorAll(".licao-corpo").forEach((el) => {
      el.scrollTop = 0;
    });
  }, [etapa, indice]);

  function reiniciarQuiz() {
    setIndice(0);
    setEscolhida(null);
    setVerificacao(null);
    setRespostas([]);
    setResultado(null);
    setXpSemQuiz(null);
    setErroAcao(null);
  }

  const voltarParaTrilha = `/trilhas/${trilhaId}`;

  if (carregando && !dados) {
    return (
      <div className="licao">
        <div className="licao-corpo">
          <Carregando linhas={5} rotulo="Carregando lição" />
        </div>
      </div>
    );
  }

  if (erro || !dados) {
    return (
      <div className="licao">
        <BarraLicao voltar={voltarParaTrilha} progresso={0} />
        <div className="licao-corpo">
          <ErroCarregamento mensagem={erro ?? "Lição não encontrada."} aoTentarDeNovo={recarregar} />
        </div>
      </div>
    );
  }

  const { licao, progresso } = dados;
  const questoes = licao.questoes;
  const temQuiz = questoes.length > 0;
  const ehModuloAtual = !isAdmin && progresso?.status === "EM_ANDAMENTO" && mesmoId(progresso.moduloAtualId, licao.id);
  // Revisão: módulo já concluído, ou administrador conferindo o conteúdo. Não credita XP.
  const modoPratica = !ehModuloAtual;
  const questao = questoes[indice];

  const progressoBarra =
    etapa === "leitura" ? 0.08 : etapa === "quiz" ? (indice + (verificacao ? 1 : 0.4)) / (questoes.length + 1) : 1;

  async function aoVerificar() {
    if (escolhida === null || !questao) return;
    setVerificando(true);
    setErroAcao(null);
    try {
      const v = await verificarResposta(trilhaId, licao.id, questao.id, escolhida);
      setVerificacao(v);
      setRespostas((atual) => [...atual, { questaoId: questao.id, alternativaId: escolhida, correta: v.correta }]);
    } catch (e) {
      setErroAcao(e instanceof ApiError ? e.message : "Não foi possível verificar a resposta.");
    } finally {
      setVerificando(false);
    }
  }

  async function aoAvancar() {
    if (indice < questoes.length - 1) {
      setIndice(indice + 1);
      setEscolhida(null);
      setVerificacao(null);
      return;
    }
    if (modoPratica) {
      setEtapa("resultado");
      return;
    }
    setEtapa("enviando");
    setErroAcao(null);
    try {
      const r = await responderQuiz(
        trilhaId,
        licao.id,
        respostas.map(({ questaoId, alternativaId }) => ({ questaoId, alternativaId })),
      );
      setResultado(r);
      atualizarUsuario({ ...usuario, ...r.aluno });
      setEtapa("resultado");
    } catch (e) {
      setErroAcao(e instanceof ApiError ? e.message : "Não foi possível enviar as respostas.");
      setEtapa("quiz");
    }
  }

  async function aoConcluirSemQuiz() {
    setEtapa("enviando");
    setErroAcao(null);
    try {
      const p = await concluirModulo(trilhaId, licao.id);
      const perfil = await buscarMeuPerfil();
      atualizarUsuario({ ...usuario, ...perfil });
      setXpSemQuiz({ xp: licao.xpConcedido, proximo: p.moduloAtualId });
      setEtapa("resultado");
    } catch (e) {
      setErroAcao(e instanceof ApiError ? e.message : "Não foi possível concluir o módulo.");
      setEtapa("leitura");
    }
  }

  return (
    <div className="licao">
      <div ref={topoRef} />
      <BarraLicao voltar={voltarParaTrilha} progresso={progressoBarra} />

      {etapa === "leitura" && (
        <>
          <article className="licao-corpo">
            <p className="licao-contexto">
              Módulo {licao.ordem}
              {modoPratica && !isAdmin ? ", revisão" : ""}
              {isAdmin ? ", prévia do administrador" : ""}
            </p>
            <h1>{licao.titulo}</h1>
            {licao.conteudo ? (
              <Markdown texto={licao.conteudo} />
            ) : (
              <p className="licao-sem-conteudo">Este módulo ainda não tem texto de lição.</p>
            )}
          </article>
          <footer className="licao-rodape">
            {erroAcao && (
              <p role="alert" className="mensagem-erro">
                {erroAcao}
              </p>
            )}
            {temQuiz ? (
              <>
                <p className="licao-rodape-info">
                  {plural(questoes.length, "questão", "questões")}. Acerte {licao.minimoParaAprovacao} para concluir
                  {modoPratica ? " (prática, sem XP)" : <> e ganhar <span className="valor-xp">{licao.xpConcedido} XP</span></>}.
                </p>
                <button type="button" className="botao botao-principal botao-largo" onClick={() => setEtapa("quiz")}>
                  {modoPratica ? "Praticar o quiz" : "Começar o quiz"}
                </button>
              </>
            ) : modoPratica ? (
              <Link to={voltarParaTrilha} className="botao botao-largo">
                Voltar para a trilha
              </Link>
            ) : (
              <button type="button" className="botao botao-principal botao-largo" onClick={aoConcluirSemQuiz}>
                Concluir módulo (+{licao.xpConcedido} XP)
              </button>
            )}
          </footer>
        </>
      )}

      {(etapa === "quiz" || etapa === "enviando") && questao && (
        <>
          <section className="licao-corpo quiz" aria-live="polite">
            <p className="licao-contexto">
              Questão {indice + 1} de {questoes.length}
            </p>
            <h2 className="quiz-enunciado">{questao.enunciado}</h2>
            <ul className="quiz-alternativas">
              {questao.alternativas.map((alt, n) => {
                const marcada = mesmoId(escolhida, alt.id);
                const correta = verificacao && mesmoId(verificacao.alternativaCorretaId, alt.id);
                const errada = verificacao && marcada && !verificacao.correta;
                const classe = correta ? " correta" : errada ? " errada" : marcada ? " marcada" : "";
                return (
                  <li key={alt.id}>
                    <button
                      type="button"
                      className={`alternativa${classe}`}
                      aria-pressed={marcada}
                      disabled={verificacao !== null || etapa === "enviando"}
                      onClick={() => setEscolhida(alt.id)}
                    >
                      <span className="alternativa-letra" aria-hidden="true">
                        {LETRAS[n]}
                      </span>
                      <span className="alternativa-texto">{alt.texto}</span>
                      {correta && <CheckCircle2 size={20} className="alternativa-icone" aria-label="Resposta correta" />}
                      {errada && <XCircle size={20} className="alternativa-icone" aria-label="Sua resposta" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <footer className={`licao-rodape${verificacao ? (verificacao.correta ? " rodape-certo" : " rodape-errado") : ""}`}>
            {erroAcao && (
              <p role="alert" className="mensagem-erro">
                {erroAcao}
              </p>
            )}
            {verificacao ? (
              <>
                <div className="feedback" role="status">
                  <strong>{verificacao.correta ? "Resposta certa" : "Não foi dessa vez"}</strong>
                  {verificacao.explicacao && <p>{verificacao.explicacao}</p>}
                </div>
                <button
                  type="button"
                  className="botao botao-principal botao-largo"
                  onClick={aoAvancar}
                  disabled={etapa === "enviando"}
                >
                  {etapa === "enviando"
                    ? "Enviando respostas..."
                    : indice < questoes.length - 1
                      ? "Próxima questão"
                      : "Ver resultado"}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="botao botao-principal botao-largo"
                onClick={aoVerificar}
                disabled={escolhida === null || verificando}
              >
                {verificando ? "Verificando..." : "Verificar"}
              </button>
            )}
          </footer>
        </>
      )}

      {etapa === "enviando" && !temQuiz && (
        <div className="licao-corpo">
          <Carregando linhas={2} rotulo="Concluindo módulo" />
        </div>
      )}

      {etapa === "resultado" && (
        <TelaResultado
          resultado={resultado}
          acertosPratica={respostas.filter((r) => r.correta).length}
          totalQuestoes={questoes.length}
          minimo={licao.minimoParaAprovacao}
          xpSemQuiz={xpSemQuiz}
          modoPratica={modoPratica}
          ofensiva={usuario?.ofensiva ?? 0}
          nivel={usuario?.nivel}
          aoTentarDeNovo={() => {
            reiniciarQuiz();
            setEtapa("quiz");
          }}
          aoRever={() => {
            reiniciarQuiz();
            setEtapa("leitura");
          }}
          aoProximo={(proximo) => navigate(`/trilhas/${trilhaId}/modulos/${proximo}`)}
          voltar={voltarParaTrilha}
        />
      )}
    </div>
  );
}

function BarraLicao({ voltar, progresso }: { voltar: string; progresso: number }) {
  return (
    <div className="licao-barra">
      <Link to={voltar} className="licao-fechar" aria-label="Sair da lição e voltar para a trilha">
        <X size={22} aria-hidden="true" />
      </Link>
      <div className="barra licao-barra-progresso" aria-hidden="true">
        <span style={{ width: `${Math.round(progresso * 100)}%` }} />
      </div>
    </div>
  );
}

interface PropsResultado {
  resultado: ResultadoQuiz | null;
  acertosPratica: number;
  totalQuestoes: number;
  minimo: number;
  xpSemQuiz: { xp: number; proximo: Id | null } | null;
  modoPratica: boolean;
  ofensiva: number;
  nivel?: number;
  aoTentarDeNovo: () => void;
  aoRever: () => void;
  aoProximo: (moduloId: Id) => void;
  voltar: string;
}

function TelaResultado(p: PropsResultado) {
  const acertos = p.resultado?.acertos ?? p.acertosPratica;
  const total = p.resultado?.totalQuestoes ?? p.totalQuestoes;
  const aprovado = p.resultado ? p.resultado.aprovado : p.xpSemQuiz ? true : acertos >= p.minimo;
  const xp = p.resultado?.xpGanho ?? p.xpSemQuiz?.xp ?? 0;
  const proximo = p.resultado?.progresso.moduloAtualId ?? p.xpSemQuiz?.proximo ?? null;
  const ganhouXp = !p.modoPratica && aprovado && xp > 0;
  const xpAnimado = useContagem(ganhouXp ? xp : 0);

  return (
    <section className="licao-corpo resultado" aria-live="polite">
      <div className={`resultado-selo${aprovado ? " aprovado" : ""}`}>
        {aprovado ? <Sparkles size={34} aria-hidden="true" /> : <RotateCcw size={34} aria-hidden="true" />}
      </div>

      <h1>
        {p.modoPratica
          ? aprovado
            ? "Boa revisão"
            : "Vale revisar a lição"
          : aprovado
            ? "Módulo concluído"
            : "Quase lá"}
      </h1>

      {total > 0 && (
        <p className="resultado-placar">
          <strong>{acertos}</strong> de {total} acertos
          {!aprovado && <span>. Você precisa de {p.minimo} para concluir.</span>}
        </p>
      )}

      {ganhouXp && (
        <div className="resultado-ganhos">
          <p className="resultado-xp">
            +<span className="valor-xp">{xpAnimado}</span> <span className="valor-xp">XP</span>
          </p>
          {p.resultado && p.resultado.bonusGabarito > 0 && (
            <p className="resultado-detalhe">Inclui {p.resultado.bonusGabarito} XP de bônus por acertar todas.</p>
          )}
          {p.resultado?.subiuDeNivel && p.nivel && (
            <p className="resultado-nivel">Você chegou ao nível {p.nivel}!</p>
          )}
          {p.ofensiva > 0 && (
            <p className="resultado-ofensiva">
              <Flame size={18} aria-hidden="true" />
              {plural(p.ofensiva, "dia seguido", "dias seguidos")} estudando
            </p>
          )}
        </div>
      )}

      {p.modoPratica && <p className="resultado-detalhe">Prática não soma XP: este módulo já foi concluído.</p>}

      <div className="resultado-acoes">
        {aprovado && proximo !== null && !p.modoPratica && (
          <button type="button" className="botao botao-principal botao-largo" onClick={() => p.aoProximo(proximo)}>
            Próximo módulo
          </button>
        )}
        {!aprovado && (
          <>
            <button type="button" className="botao botao-principal botao-largo" onClick={p.aoTentarDeNovo}>
              Tentar de novo
            </button>
            <button type="button" className="botao botao-largo" onClick={p.aoRever}>
              <BookOpen size={18} aria-hidden="true" />
              Rever a lição
            </button>
          </>
        )}
        <Link
          to={p.voltar}
          className={`botao botao-largo${aprovado && (proximo === null || p.modoPratica) ? " botao-principal" : ""}`}
        >
          {aprovado && proximo === null && !p.modoPratica ? "Ver trilha concluída" : "Voltar para a trilha"}
        </Link>
      </div>
    </section>
  );
}

/** Conta de 0 até o valor em ~0,8 s: o momento de recompensa do quiz. */
function useContagem(alvo: number): number {
  const [valor, setValor] = useState(0);
  useEffect(() => {
    if (alvo <= 0) {
      setValor(0);
      return;
    }
    const reduzido = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduzido || typeof requestAnimationFrame === "undefined") {
      setValor(alvo);
      return;
    }
    let quadro = 0;
    const inicio = performance.now();
    const passo = (agora: number) => {
      const t = Math.min(1, (agora - inicio) / 800);
      setValor(Math.round(alvo * (1 - Math.pow(1 - t, 3))));
      if (t < 1) quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [alvo]);
  return valor;
}
