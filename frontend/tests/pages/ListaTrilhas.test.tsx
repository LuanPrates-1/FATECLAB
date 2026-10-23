import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ListaTrilhas } from "../../src/pages/ListaTrilhas";
import * as trilhaService from "../../src/services/trilhaService";
import type { Trilha } from "../../src/services/trilhaService";

const TODAS_AS_TRILHAS: Trilha[] = [
  { id: "1", titulo: "Lógica de Programação", area: "Programação", nivel: "INICIANTE" },
  { id: "2", titulo: "Banco de Dados Avançado", area: "Banco de Dados", nivel: "AVANCADO" },
];

function renderListaTrilhas() {
  return render(
    <MemoryRouter>
      <ListaTrilhas />
    </MemoryRouter>,
  );
}

describe("ListaTrilhas", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("lista todas as trilhas ao carregar", async () => {
    vi.spyOn(trilhaService, "listarTrilhas").mockResolvedValue(TODAS_AS_TRILHAS);

    renderListaTrilhas();

    expect(await screen.findByText("Lógica de Programação")).toBeInTheDocument();
    expect(screen.getByText("Banco de Dados Avançado")).toBeInTheDocument();
  });

  it("filtra as trilhas por área e nível", async () => {
    const listarMock = vi
      .spyOn(trilhaService, "listarTrilhas")
      .mockResolvedValueOnce(TODAS_AS_TRILHAS)
      .mockResolvedValueOnce([TODAS_AS_TRILHAS[0]]);

    renderListaTrilhas();
    await screen.findByText("Lógica de Programação");

    await userEvent.type(screen.getByLabelText(/área/i), "Programação");
    await userEvent.selectOptions(screen.getByLabelText(/nível/i), "INICIANTE");

    await waitFor(() => {
      expect(listarMock).toHaveBeenLastCalledWith({ area: "Programação", nivel: "INICIANTE" });
    });
    expect(screen.queryByText("Banco de Dados Avançado")).not.toBeInTheDocument();
  });
});
