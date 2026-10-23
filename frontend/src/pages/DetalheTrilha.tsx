import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiError } from "../services/apiClient";
import { buscarTrilha } from "../services/trilhaService";
import type { TrilhaDetalhe } from "../services/trilhaService";
import { concluirModulo, iniciarTrilha, listarMeuProgresso } from "../services/progressoService";
import type { Progresso } from "../services/progressoService";

export function DetalheTrilha() {
  const { id } = useParams<{ id: string }>();
  const trilhaId = id!;

  const [trilha, setTrilha] = useState<TrilhaDetalhe | null>(null);
  const [progresso, setProgresso] = useState<Progresso | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const [trilhaCarregada, listaProgresso] = await Promise.all([
        buscarTrilha(trilhaId),
        listarMeuProgresso(),
      ]);
      setTrilha(trilhaCarregada);
      setProgresso(listaProgresso.find((p) => p.trilhaId === trilhaId) ?? null);
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível carregar a trilha.");
    } finally {
      setCarregando(false);
    }
  }, [trilhaId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function aoIniciar() {
    setProcessando(true);
    setErro(null);
    try {
      const novoProgresso = await iniciarTrilha(trilhaId);
      setProgresso(novoProgresso);
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível iniciar a trilha.");
    } finally {
      setProcessando(false);
    }
  }

  async function aoConcluirModulo(moduloId: string) {
    setProcessando(true);
    setErro(null);
    try {
      const novoProgresso = await concluirModulo(trilhaId, moduloId);
      setProgresso(novoProgresso);
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível concluir o módulo.");
    } finally {
      setProcessando(false);
    }
  }

  if (carregando) {
    return (
      <main className="pagina">
        <p>Carregando trilha...</p>
      </main>
    );
  }

  if (erro && !trilha) {
    return (
      <main className="pagina">
        <p role="alert" className="erro">
          {erro}
        </p>
      </main>
    );
  }

  if (!trilha) {
    return null;
  }

  const moduloAtual = trilha.modulos.find((m) => m.id === progresso?.moduloAtualId);

  return (
    <main className="pagina">
      <h1>{trilha.titulo}</h1>
      <p>
        {trilha.area} · {trilha.nivel}
      </p>

      {erro && (
        <p role="alert" className="erro">
          {erro}
        </p>
      )}

      {!progresso && (
        <button type="button" onClick={aoIniciar} disabled={processando}>
          Iniciar trilha
        </button>
      )}

      {progresso?.status === "EM_ANDAMENTO" && moduloAtual && (
        <section>
          <h2>Módulo atual: {moduloAtual.titulo}</h2>
          <p>Vale {moduloAtual.xpConcedido} XP</p>
          <button type="button" onClick={() => aoConcluirModulo(moduloAtual.id)} disabled={processando}>
            Concluir módulo
          </button>
        </section>
      )}

      {progresso?.status === "CONCLUIDA" && (
        <p data-testid="trilha-concluida">
          Trilha concluída! Você ganhou {progresso.xpObtidoNaTrilha} XP nesta trilha.
        </p>
      )}

      <ol>
        {trilha.modulos.map((modulo) => (
          <li key={modulo.id}>
            {modulo.titulo} ({modulo.xpConcedido} XP)
          </li>
        ))}
      </ol>
    </main>
  );
}
