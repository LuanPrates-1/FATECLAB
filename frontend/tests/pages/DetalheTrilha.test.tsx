import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { DetalheTrilha } from "../../src/pages/DetalheTrilha";
import * as trilhaService from "../../src/services/trilhaService";
import * as progressoService from "../../src/services/progressoService";

const TRILHA = {
  id: "1",
  titulo: "Java Básico",
  area: "Programação",
  nivel: "INICIANTE" as const,
  modulos: [
    { id: "10", ordem: 1, titulo: "Variáveis", xpConcedido: 10 },
    { id: "11", ordem: 2, titulo: "Laços", xpConcedido: 15 },
  ],
};

function renderDetalhe() {
  return render(
    <MemoryRouter initialEntries={["/trilhas/1"]}>
      <Routes>
        <Route path="/trilhas/:id" element={<DetalheTrilha />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("DetalheTrilha", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(trilhaService, "buscarTrilha").mockResolvedValue(TRILHA);
  });

  it("mostra o módulo atual da trilha em andamento", async () => {
    vi.spyOn(progressoService, "listarMeuProgresso").mockResolvedValue([
      { trilhaId: "1", status: "EM_ANDAMENTO", moduloAtualId: "10", xpObtidoNaTrilha: 0 },
    ]);

    renderDetalhe();

    expect(await screen.findByText(/Módulo atual: Variáveis/i)).toBeInTheDocument();
  });

  it("credita XP e avança para o próximo módulo ao concluir o módulo atual", async () => {
    vi.spyOn(progressoService, "listarMeuProgresso").mockResolvedValue([
      { trilhaId: "1", status: "EM_ANDAMENTO", moduloAtualId: "10", xpObtidoNaTrilha: 0 },
    ]);
    const concluirMock = vi.spyOn(progressoService, "concluirModulo").mockResolvedValue({
      trilhaId: "1",
      status: "EM_ANDAMENTO",
      moduloAtualId: "11",
      xpObtidoNaTrilha: 10,
    });

    renderDetalhe();
    await screen.findByText(/Módulo atual: Variáveis/i);

    await userEvent.click(screen.getByRole("button", { name: /concluir módulo/i }));

    await waitFor(() => expect(concluirMock).toHaveBeenCalledWith("1", "10"));
    expect(await screen.findByText(/Módulo atual: Laços/i)).toBeInTheDocument();
  });

  it("exibe mensagem de trilha concluída com o XP total obtido nela", async () => {
    vi.spyOn(progressoService, "listarMeuProgresso").mockResolvedValue([
      { trilhaId: "1", status: "CONCLUIDA", moduloAtualId: null, xpObtidoNaTrilha: 25 },
    ]);

    renderDetalhe();

    expect(await screen.findByTestId("trilha-concluida")).toHaveTextContent("25 XP");
  });
});
