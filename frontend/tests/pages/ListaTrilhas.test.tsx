import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListaTrilhas } from "../../src/pages/ListaTrilhas";
import * as trilhaService from "../../src/services/trilhaService";
import * as authService from "../../src/services/authService";
import type { ResumoAluno, Trilha } from "../../src/services/tipos";
import { ALUNO, renderizar } from "../utils";

const TRILHAS: Trilha[] = [
  { id: 1, titulo: "Lógica de Programação", area: "Programação", nivel: "INICIANTE", totalModulos: 4, xpTotal: 85 },
  { id: 2, titulo: "Banco de Dados Avançado", area: "Banco de Dados", nivel: "AVANCADO", totalModulos: 3, xpTotal: 120 },
];

const RESUMO: ResumoAluno = {
  aluno: ALUNO,
  posicaoRanking: 3,
  totalAlunos: 10,
  modulosConcluidos: 2,
  trilhasConcluidas: 0,
  quizzesGabaritados: 1,
  // IDs numéricos, como o back-end Java devolve.
  trilhas: [
    { trilhaId: 1, titulo: "Lógica de Programação", area: "Programação", nivel: "INICIANTE", status: "EM_ANDAMENTO", modulosConcluidos: 2, totalModulos: 4, xpObtido: 40 },
  ],
  conquistas: [],
};

describe("ListaTrilhas", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(trilhaService, "listarTrilhas").mockResolvedValue(TRILHAS);
    vi.spyOn(authService, "buscarResumo").mockResolvedValue(RESUMO);
  });

  it("lista as trilhas, mostra o nível do aluno e a trilha em andamento", async () => {
    renderizar(<ListaTrilhas />, { usuario: ALUNO });

    expect(await screen.findByText("Banco de Dados Avançado")).toBeInTheDocument();
    expect(screen.getByText(/olá, luan/i)).toBeInTheDocument();
    expect(screen.getByText(/continue de onde parou/i)).toBeInTheDocument();
    expect(screen.getByText(/módulo 3 de 4/i)).toBeInTheDocument();
    expect(screen.getByText(/faltam 160 xp para o nível 3/i)).toBeInTheDocument();
  });

  it("filtra as trilhas por área e por nível", async () => {
    renderizar(<ListaTrilhas />, { usuario: ALUNO });
    await screen.findByText("Banco de Dados Avançado");

    await userEvent.click(screen.getByRole("button", { name: "Banco de Dados" }));
    expect(screen.queryByRole("heading", { name: "Lógica de Programação" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Banco de Dados Avançado" })).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Nível" }), "INICIANTE");
    expect(screen.getByText(/nenhuma trilha com esses filtros/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /limpar filtros/i }));
    expect(screen.getByRole("heading", { name: "Lógica de Programação" })).toBeInTheDocument();
  });
});
