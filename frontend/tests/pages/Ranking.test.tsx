import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import { Ranking } from "../../src/pages/Ranking";
import * as rankingService from "../../src/services/rankingService";
import { ALUNO, renderizar } from "../utils";

describe("Ranking", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("mostra o pódio, os demais colocados por apelido e destaca o aluno logado", async () => {
    vi.spyOn(rankingService, "obterRanking").mockResolvedValue({
      entradas: [
        { posicao: 1, apelido: "quenia", xpTotal: 900, ehVoce: false, nivel: 5, ofensiva: 4 },
        { posicao: 2, apelido: "rui", xpTotal: 500, ehVoce: false, nivel: 4, ofensiva: 0 },
        { posicao: 3, apelido: "sara", xpTotal: 300, ehVoce: false, nivel: 3, ofensiva: 1 },
        { posicao: 4, apelido: "pedro", xpTotal: 50, ehVoce: true, nivel: 1, ofensiva: 0 },
      ],
    });
    renderizar(<Ranking />, { usuario: ALUNO });

    const podio = await screen.findByRole("list", { name: /três primeiros/i });
    expect(within(podio).getByText("quenia")).toBeInTheDocument();
    expect(within(podio).getByText("900 XP")).toBeInTheDocument();

    const demais = screen.getByRole("list", { name: /demais colocados/i });
    expect(within(demais).getByText("pedro")).toBeInTheDocument();
    expect(within(demais).getByText("você")).toBeInTheDocument();
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  });

  it("convida a pontuar quando o ranking está vazio", async () => {
    vi.spyOn(rankingService, "obterRanking").mockResolvedValue({ entradas: [] });
    renderizar(<Ranking />, { usuario: ALUNO });
    expect(await screen.findByText(/seja o primeiro/i)).toBeInTheDocument();
  });
});
