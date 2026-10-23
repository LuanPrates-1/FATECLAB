import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Ranking } from "../../src/pages/Ranking";
import * as rankingService from "../../src/services/rankingService";

describe("Ranking", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("exibe o apelido de cada aluno (nunca nome completo ou e-mail) e destaca o usuário autenticado", async () => {
    vi.spyOn(rankingService, "obterRanking").mockResolvedValue({
      entradas: [
        { posicao: 1, apelido: "quenia", xpTotal: 90, ehVoce: false },
        { posicao: 2, apelido: "pedro", xpTotal: 50, ehVoce: true },
      ],
    });

    render(<Ranking />);

    const primeiraPosicao = await screen.findByText(/quenia — 90 XP/i);
    expect(primeiraPosicao).toBeInTheDocument();

    const segundaPosicao = screen.getByText(/pedro — 50 XP \(você\)/i);
    expect(segundaPosicao).toBeInTheDocument();
    expect(segundaPosicao).toHaveAttribute("aria-current", "true");

    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  });
});
