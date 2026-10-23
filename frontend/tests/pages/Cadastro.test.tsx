import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Cadastro } from "../../src/pages/Cadastro";
import { SessaoProvider } from "../../src/hooks/useSessao";
import { ApiError } from "../../src/services/apiClient";
import * as authService from "../../src/services/authService";

function renderCadastro() {
  return render(
    <MemoryRouter>
      <SessaoProvider>
        <Cadastro />
      </SessaoProvider>
    </MemoryRouter>,
  );
}

describe("Cadastro", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("envia nome, e-mail institucional e senha e autentica o aluno", async () => {
    const cadastrarMock = vi.spyOn(authService, "cadastrar").mockResolvedValue({
      token: "token-fake",
      aluno: { id: "1", nome: "Ana Silva", papel: "ALUNO", apelido: "ana", xpTotal: 0 },
    });

    renderCadastro();

    await userEvent.type(screen.getByLabelText(/nome/i), "Ana Silva");
    await userEvent.type(screen.getByLabelText(/e-mail institucional/i), "ana.silva@fatec.sp.gov.br");
    await userEvent.type(screen.getByLabelText(/senha/i), "senhaSegura123");
    await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(cadastrarMock).toHaveBeenCalledWith(
        "Ana Silva",
        "ana.silva@fatec.sp.gov.br",
        "senhaSegura123",
      );
    });
  });

  it("exibe erro quando o e-mail está fora do domínio institucional (422)", async () => {
    vi.spyOn(authService, "cadastrar").mockRejectedValue(
      new ApiError("E-mail deve pertencer ao domínio institucional da Fatec", 422),
    );

    renderCadastro();

    await userEvent.type(screen.getByLabelText(/nome/i), "Bruno Costa");
    await userEvent.type(screen.getByLabelText(/e-mail institucional/i), "bruno@gmail.com");
    await userEvent.type(screen.getByLabelText(/senha/i), "senhaSegura123");
    await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/domínio institucional/i);
  });
});
