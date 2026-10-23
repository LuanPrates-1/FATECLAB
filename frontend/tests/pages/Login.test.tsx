import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../../src/pages/Login";
import { SessaoProvider } from "../../src/hooks/useSessao";
import { ApiError } from "../../src/services/apiClient";
import * as authService from "../../src/services/authService";

function renderLogin() {
  return render(
    <MemoryRouter>
      <SessaoProvider>
        <Login />
      </SessaoProvider>
    </MemoryRouter>,
  );
}

describe("Login", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("autentica com credenciais corretas", async () => {
    const loginMock = vi.spyOn(authService, "login").mockResolvedValue({
      token: "token-fake",
      aluno: { id: "1", nome: "Diego Souza", papel: "ALUNO", apelido: "diego", xpTotal: 40 },
    });

    renderLogin();

    await userEvent.type(screen.getByLabelText(/e-mail/i), "diego.souza@fatec.sp.gov.br");
    await userEvent.type(screen.getByLabelText(/senha/i), "senhaSegura123");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("diego.souza@fatec.sp.gov.br", "senhaSegura123");
    });
  });

  it("exibe erro quando as credenciais são inválidas (401)", async () => {
    vi.spyOn(authService, "login").mockRejectedValue(new ApiError("E-mail ou senha inválidos", 401));

    renderLogin();

    await userEvent.type(screen.getByLabelText(/e-mail/i), "elisa.melo@fatec.sp.gov.br");
    await userEvent.type(screen.getByLabelText(/senha/i), "senhaErrada");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/e-mail ou senha inválidos/i);
  });
});
