import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";
import { DetalheTrilha } from "../../src/pages/DetalheTrilha";
import * as trilhaService from "../../src/services/trilhaService";
import * as progressoService from "../../src/services/progressoService";
import type { TrilhaDetalhe } from "../../src/services/tipos";
import { ALUNO, renderizar } from "../utils";

// IDs numéricos, como o back-end Java devolve: a URL traz "1" (texto).
const TRILHA: TrilhaDetalhe = {
  id: 1,
  titulo: "Java Básico",
  area: "Programação",
  nivel: "INICIANTE",
  xpTotal: 25,
  modulos: [
    { id: 10, ordem: 1, titulo: "Variáveis", xpConcedido: 10, totalQuestoes: 3 },
    { id: 11, ordem: 2, titulo: "Laços", xpConcedido: 15, totalQuestoes: 3 },
  ],
};

const abrir = () =>
  renderizar(<DetalheTrilha />, {
    rota: "/trilhas/1",
    caminho: "/trilhas/:id",
    usuario: ALUNO,
    extras: [<Route key="l" path="/trilhas/:id/modulos/:moduloId" element={<p>Tela da lição</p>} />],
  });

describe("DetalheTrilha", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(trilhaService, "buscarTrilha").mockResolvedValue(TRILHA);
  });

  it("encontra o progresso mesmo com IDs numéricos e destaca o módulo atual", async () => {
    vi.spyOn(progressoService, "listarMeuProgresso").mockResolvedValue([
      { trilhaId: 1, status: "EM_ANDAMENTO", moduloAtualId: 11, xpObtidoNaTrilha: 10 },
    ]);
    abrir();

    expect(await screen.findByRole("link", { name: /continuar: laços/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /módulo 1: variáveis, concluído/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /módulo 2: laços, disponível/i })).toBeEnabled();
    expect(screen.getByText(/1 de 2 módulos/i)).toBeInTheDocument();
  });

  it("bloqueia os módulos e oferece iniciar a trilha quando ainda não começou", async () => {
    vi.spyOn(progressoService, "listarMeuProgresso").mockResolvedValue([]);
    const iniciarMock = vi.spyOn(progressoService, "iniciarTrilha").mockResolvedValue({
      trilhaId: 1,
      status: "EM_ANDAMENTO",
      moduloAtualId: 10,
      xpObtidoNaTrilha: 0,
    });
    abrir();

    expect(await screen.findByRole("button", { name: /módulo 2: laços, bloqueado/i })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: /iniciar trilha/i }));

    await waitFor(() => expect(iniciarMock).toHaveBeenCalledWith("1"));
    expect(await screen.findByText("Tela da lição")).toBeInTheDocument();
  });

  it("exibe a trilha concluída com o XP obtido nela", async () => {
    vi.spyOn(progressoService, "listarMeuProgresso").mockResolvedValue([
      { trilhaId: 1, status: "CONCLUIDA", moduloAtualId: null, xpObtidoNaTrilha: 25 },
    ]);
    abrir();

    expect(await screen.findByTestId("trilha-concluida")).toHaveTextContent("25 XP");
  });
});
