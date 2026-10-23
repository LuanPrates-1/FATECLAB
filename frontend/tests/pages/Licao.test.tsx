import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Licao } from "../../src/pages/Licao";
import * as quizService from "../../src/services/quizService";
import * as progressoService from "../../src/services/progressoService";
import * as authService from "../../src/services/authService";
import type { Licao as LicaoDados, ResultadoQuiz } from "../../src/services/tipos";
import { ALUNO, renderizar } from "../utils";

const LICAO: LicaoDados = {
  id: 10,
  trilhaId: 1,
  ordem: 1,
  titulo: "Variáveis",
  conteudo: "Uma **variável** guarda um valor.",
  xpConcedido: 20,
  minimoParaAprovacao: 1,
  questoes: [
    {
      id: 100,
      ordem: 1,
      enunciado: "O que uma variável guarda?",
      alternativas: [
        { id: 1000, texto: "Um valor" },
        { id: 1001, texto: "Uma cor" },
      ],
    },
  ],
};

const abrir = () =>
  renderizar(<Licao />, {
    rota: "/trilhas/1/modulos/10",
    caminho: "/trilhas/:id/modulos/:moduloId",
    usuario: ALUNO,
  });

function resultado(aprovado: boolean): ResultadoQuiz {
  return {
    aprovado,
    acertos: aprovado ? 1 : 0,
    totalQuestoes: 1,
    minimoParaAprovacao: 1,
    xpGanho: aprovado ? 24 : 0,
    bonusGabarito: aprovado ? 4 : 0,
    subiuDeNivel: false,
    correcao: [],
    progresso: { trilhaId: 1, status: "EM_ANDAMENTO", moduloAtualId: aprovado ? 11 : 10, xpObtidoNaTrilha: 24 },
    aluno: { ...ALUNO, xpTotal: 164, ofensiva: 3 },
  };
}

describe("Licao", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(quizService, "buscarLicao").mockResolvedValue(LICAO);
    vi.spyOn(progressoService, "listarMeuProgresso").mockResolvedValue([
      { trilhaId: 1, status: "EM_ANDAMENTO", moduloAtualId: 10, xpObtidoNaTrilha: 0 },
    ]);
  });

  it("mostra a lição, corrige a questão e credita o XP ao final", async () => {
    const verificar = vi.spyOn(quizService, "verificarResposta").mockResolvedValue({
      questaoId: 100,
      correta: true,
      alternativaCorretaId: 1000,
      explicacao: "Variáveis armazenam valores na memória.",
    });
    const responder = vi.spyOn(quizService, "responderQuiz").mockResolvedValue(resultado(true));
    abrir();

    expect(await screen.findByRole("heading", { name: "Variáveis" })).toBeInTheDocument();
    expect(screen.getByText("variável").tagName).toBe("STRONG");

    await userEvent.click(screen.getByRole("button", { name: /começar o quiz/i }));
    const verificarBotao = screen.getByRole("button", { name: /verificar/i });
    expect(verificarBotao).toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: /um valor/i }));
    await userEvent.click(verificarBotao);
    await waitFor(() => expect(verificar).toHaveBeenCalledWith("1", 10, 100, 1000));
    expect(await screen.findByText(/resposta certa/i)).toBeInTheDocument();
    expect(screen.getByText(/armazenam valores/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /ver resultado/i }));
    await waitFor(() => expect(responder).toHaveBeenCalledWith("1", 10, [{ questaoId: 100, alternativaId: 1000 }]));
    expect(await screen.findByRole("heading", { name: /módulo concluído/i })).toBeInTheDocument();
    expect(screen.getByText(/4 xp de bônus/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /próximo módulo/i })).toBeInTheDocument();
  });

  it("oferece tentar de novo quando o aluno não atinge o mínimo", async () => {
    vi.spyOn(quizService, "verificarResposta").mockResolvedValue({
      questaoId: 100,
      correta: false,
      alternativaCorretaId: 1000,
      explicacao: null,
    });
    vi.spyOn(quizService, "responderQuiz").mockResolvedValue(resultado(false));
    abrir();

    await userEvent.click(await screen.findByRole("button", { name: /começar o quiz/i }));
    await userEvent.click(screen.getByRole("button", { name: /uma cor/i }));
    await userEvent.click(screen.getByRole("button", { name: /verificar/i }));
    expect(await screen.findByText(/não foi dessa vez/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /ver resultado/i }));
    expect(await screen.findByRole("button", { name: /tentar de novo/i })).toBeInTheDocument();
    expect(screen.queryByText(/\+\s*\d+\s*xp/i)).not.toBeInTheDocument();
  });

  it("conclui módulo sem quiz com um toque", async () => {
    vi.spyOn(quizService, "buscarLicao").mockResolvedValue({ ...LICAO, questoes: [] });
    const concluir = vi.spyOn(progressoService, "concluirModulo").mockResolvedValue({
      trilhaId: 1,
      status: "EM_ANDAMENTO",
      moduloAtualId: 11,
      xpObtidoNaTrilha: 20,
    });
    vi.spyOn(authService, "buscarMeuPerfil").mockResolvedValue({ ...ALUNO, xpTotal: 160 });
    abrir();

    await userEvent.click(await screen.findByRole("button", { name: /concluir módulo/i }));
    await waitFor(() => expect(concluir).toHaveBeenCalledWith("1", 10));
    expect(await screen.findByRole("heading", { name: /módulo concluído/i })).toBeInTheDocument();
  });

  it("trata módulo já concluído como prática, sem enviar respostas", async () => {
    vi.spyOn(progressoService, "listarMeuProgresso").mockResolvedValue([
      { trilhaId: 1, status: "EM_ANDAMENTO", moduloAtualId: 11, xpObtidoNaTrilha: 20 },
    ]);
    vi.spyOn(quizService, "verificarResposta").mockResolvedValue({
      questaoId: 100,
      correta: true,
      alternativaCorretaId: 1000,
      explicacao: null,
    });
    const responder = vi.spyOn(quizService, "responderQuiz");
    abrir();

    await userEvent.click(await screen.findByRole("button", { name: /praticar o quiz/i }));
    await userEvent.click(screen.getByRole("button", { name: /um valor/i }));
    await userEvent.click(screen.getByRole("button", { name: /verificar/i }));
    await userEvent.click(await screen.findByRole("button", { name: /ver resultado/i }));

    expect(await screen.findByText(/prática não soma xp/i)).toBeInTheDocument();
    expect(responder).not.toHaveBeenCalled();
  });
});
