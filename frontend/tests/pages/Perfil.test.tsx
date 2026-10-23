import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Perfil } from "../../src/pages/Perfil";
import * as authService from "../../src/services/authService";
import type { ResumoAluno } from "../../src/services/tipos";
import { ALUNO, renderizar } from "../utils";

const RESUMO: ResumoAluno = {
  aluno: ALUNO,
  posicaoRanking: 2,
  totalAlunos: 9,
  modulosConcluidos: 5,
  trilhasConcluidas: 1,
  quizzesGabaritados: 2,
  trilhas: [],
  conquistas: [
    { codigo: "PRIMEIRO_PASSO", titulo: "Primeiro passo", descricao: "Conclua seu primeiro módulo", desbloqueada: true },
    { codigo: "VETERANO", titulo: "Veterano", descricao: "Alcance o nível 5", desbloqueada: false },
  ],
};

describe("Perfil", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(authService, "buscarResumo").mockResolvedValue(RESUMO);
  });

  it("mostra estatísticas e conquistas do aluno", async () => {
    renderizar(<Perfil />, { usuario: ALUNO });

    expect(await screen.findByText("2º")).toBeInTheDocument();
    expect(screen.getByText(/1 de 2/)).toBeInTheDocument();
    expect(screen.getByText("Primeiro passo").closest("li")).toHaveClass("desbloqueada");
    expect(screen.getByText("Veterano").closest("li")).not.toHaveClass("desbloqueada");
  });

  it("altera o apelido exibido no ranking", async () => {
    const atualizar = vi
      .spyOn(authService, "atualizarApelido")
      .mockResolvedValue({ ...ALUNO, apelido: "luan.dev" });
    renderizar(<Perfil />, { usuario: ALUNO });

    await userEvent.click(await screen.findByRole("button", { name: /alterar apelido/i }));
    const campo = screen.getByLabelText(/apelido exibido no ranking/i);
    await userEvent.clear(campo);
    await userEvent.type(campo, "luan.dev");
    await userEvent.click(screen.getByRole("button", { name: /salvar apelido/i }));

    await waitFor(() => expect(atualizar).toHaveBeenCalledWith("luan.dev"));
    expect(await screen.findByRole("status")).toHaveTextContent(/apelido atualizado/i);
    expect(screen.getByRole("heading", { name: "luan.dev" })).toBeInTheDocument();
  });
});
