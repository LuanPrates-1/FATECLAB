import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trophy } from "lucide-react";
import { ApiError } from "../services/apiClient";
import { buscarTrilha } from "../services/trilhaService";
import { iniciarTrilha, listarMeuProgresso } from "../services/progressoService";
import type { Modulo, Progresso, TrilhaDetalhe } from "../services/tipos";
import { useCarregar } from "../hooks/useCarregar";
import { useSessao } from "../hooks/useSessao";
import { mesmoId } from "../lib/ids";
import { NOMES_NIVEL_TRILHA, plural } from "../lib/gamificacao";
import { IconeArea } from "../components/IconeArea";
import { Carregando, ErroCarregamento } from "../components/Estados";
import { MapaCircuito } from "../components/MapaCircuito";
import type { EstadoModulo } from "../components/MapaCircuito";
import "./DetalheTrilha.css";

interface Dados {
  trilha: TrilhaDetalhe;
  progresso: Progresso | null;
}

export function DetalheTrilha() {
  const { id } = useParams<{ id: string }>();
  const trilhaId = id!;
  const navigate = useNavigate();
  const { isAdmin } = useSessao();
  const [erroAcao, setErroAcao] = useState<string | null>(null);
  const [iniciando, setIniciando] = useState(false);

  const { dados, setDados, erro, carregando, recarregar } = useCarregar<Dados>(
    async () => {
      const [trilha, lista] = await Promise.all([
        buscarTrilha(trilhaId),
        isAdmin ? Promise.resolve([] as Progresso[]) : listarMeuProgresso(),
      ]);
      return { trilha, progresso: lista.find((p) => mesmoId(p.trilhaId, trilhaId)) ?? null };
    },
    [trilhaId, isAdmin],
    "Não foi possível carregar a trilha.",
  );

  async function aoIniciar() {
    if (!dados) return;
    setIniciando(true);
    setErroAcao(null);
    try {
      const progresso = await iniciarTrilha(trilhaId);
      setDados({ ...dados, progresso });
      if (progresso.moduloAtualId !== null) {
        navigate(`/trilhas/${trilhaId}/modulos/${progresso.moduloAtualId}`);
      }
    } catch (e) {
      setErroAcao(e instanceof ApiError ? e.message : "Não foi possível iniciar a trilha.");
    } finally {
      setIniciando(false);
    }
  }

  if (carregando && !dados) {
    return (
      <div className="pagina-app">
        <Carregando linhas={4} rotulo="Carregando trilha" />
      </div>
    );
  }

  if (erro || !dados) {
    return (
      <div className="pagina-app">
        <BotaoVoltar />
        <ErroCarregamento mensagem={erro ?? "Trilha não encontrada."} aoTentarDeNovo={recarregar} />
      </div>
    );
  }

  const { trilha, progresso } = dados;
  const modulosOrdenados = [...trilha.modulos].sort((a, b) => a.ordem - b.ordem);
  const ordemAtual = modulosOrdenados.find((m) => mesmoId(m.id, progresso?.moduloAtualId))?.ordem;
  const concluida = progresso?.status === "CONCLUIDA";

  function estadoDe(modulo: Modulo): EstadoModulo {
    if (isAdmin) return "concluido";
    if (!progresso) return "bloqueado";
    if (concluida) return "concluido";
    if (mesmoId(modulo.id, progresso.moduloAtualId)) return "atual";
    return ordemAtual !== undefined && modulo.ordem < ordemAtual ? "concluido" : "bloqueado";
  }

  const concluidos = modulosOrdenados.filter((m) => estadoDe(m) === "concluido").length;
  const moduloAtual = modulosOrdenados.find((m) => mesmoId(m.id, progresso?.moduloAtualId));

  return (
    <div className="pagina-app pagina-trilha">
      <BotaoVoltar />

      <header className="trilha-cabecalho">
        <IconeArea area={trilha.area} tamanho={26} />
        <div>
          <p className="trilha-area">
            {trilha.area}, nível {NOMES_NIVEL_TRILHA[trilha.nivel].toLowerCase()}
          </p>
          <h1>{trilha.titulo}</h1>
        </div>
      </header>

      {trilha.descricao && <p className="trilha-descricao">{trilha.descricao}</p>}

      {!isAdmin && progresso && (
        <div className="trilha-progresso">
          <div className="trilha-progresso-numeros">
            <span>
              {concluidos} de {plural(modulosOrdenados.length, "módulo", "módulos")}
            </span>
            <span>
              <span className="valor-xp">{progresso.xpObtidoNaTrilha}</span> de {trilha.xpTotal ?? 0} XP
            </span>
          </div>
          <div className="barra" aria-hidden="true">
            <span style={{ width: `${(concluidos / Math.max(1, modulosOrdenados.length)) * 100}%` }} />
          </div>
        </div>
      )}

      {concluida && (
        <div className="trilha-concluida" data-testid="trilha-concluida">
          <Trophy size={22} aria-hidden="true" />
          <p>
            Trilha concluída! Você ganhou <strong className="valor-xp">{progresso.xpObtidoNaTrilha} XP</strong> nesta
            trilha. Toque em um módulo para revisar a lição.
          </p>
        </div>
      )}

      {erroAcao && (
        <p role="alert" className="mensagem-erro">
          {erroAcao}
        </p>
      )}

      {!isAdmin && !progresso && (
        <button type="button" className="botao botao-principal botao-largo" onClick={aoIniciar} disabled={iniciando}>
          {iniciando ? "Iniciando..." : "Iniciar trilha"}
        </button>
      )}

      {!isAdmin && moduloAtual && (
        <Link to={`/trilhas/${trilhaId}/modulos/${moduloAtual.id}`} className="botao botao-principal botao-largo">
          Continuar: {moduloAtual.titulo}
        </Link>
      )}

      <MapaCircuito
        modulos={modulosOrdenados}
        estadoDe={estadoDe}
        aoAbrir={(m) => navigate(`/trilhas/${trilhaId}/modulos/${m.id}`)}
      />
    </div>
  );
}

function BotaoVoltar() {
  return (
    <Link to="/trilhas" className="link-voltar">
      <ArrowLeft size={18} aria-hidden="true" />
      Trilhas
    </Link>
  );
}
