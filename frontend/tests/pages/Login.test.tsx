import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";
import { Login } from "../../src/pages/Login";
import { ApiError } from "../../src/services/apiClient";
import * as authService from "../../src/services/authService";
import { ALUNO, renderizar } from "../utils";

const abrir = () =>
  renderizar(<Login />, {
    rota: "/login",
    caminho: "/login",
    extras: [<Route key="t" path="/trilhas" element={<p>Tela de trilhas</p>} />],
  });

describe("Login", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("autentica com credenciais corretas e leva para as trilhas", async () => {
    const loginMock = vi.spyOn(authService, "login").mockResolvedValue({ token: "t", aluno: ALUNO });
    abrir();

    await userEvent.type(screen.getByLabelText(/e-mail/i), "luan.prates@fatec.sp.gov.br");
    await userEvent.type(screen.getByLabelText(/senha/i), "senhaSegura123");
    await userEvent.click(screen.getByRole("button", { name: /^entrar$/i }));

    await waitFor(() => expect(loginMock).toHaveBeenCalledWith("luan.prates@fatec.sp.gov.br", "senhaSegura123"));
    expect(await screen.findByText("Tela de trilhas")).toBeInTheDocument();
  });

  it("exibe o erro da API quando as credenciais são inválidas (401)", async () => {
    vi.spyOn(authService, "login").mockRejectedValue(new ApiError("E-mail ou senha inválidos", 401));
    abrir();

    await userEvent.type(screen.getByLabelText(/e-mail/i), "elisa.melo@fatec.sp.gov.br");
    await userEvent.type(screen.getByLabelText(/senha/i), "senhaErrada");
    await userEvent.click(screen.getByRole("button", { name: /^entrar$/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/e-mail ou senha inválidos/i);
  });

  it("não mostra os atalhos de conta de demonstração fora do modo demonstração", () => {
    abrir();

    expect(screen.queryByText(/testar com uma conta de demonstração/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /entrar como administrador/i })).not.toBeInTheDocument();
  });

  it("entra com a conta de demonstração do aluno no modo demonstração", async () => {
    vi.stubEnv("VITE_DEMO", "true");
    vi.resetModules();
    const { Login: LoginDemo } = await import("../../src/pages/Login");
    const authDemo = await import("../../src/services/authService");
    const { renderizar: renderizarDemo } = await import("../utils");
    const loginMock = vi.spyOn(authDemo, "login").mockResolvedValue({ token: "t", aluno: ALUNO });
    renderizarDemo(<LoginDemo />, { rota: "/login", caminho: "/login" });

    await userEvent.click(screen.getByText(/testar com uma conta de demonstração/i));
    await userEvent.click(screen.getByRole("button", { name: /entrar como aluno/i }));

    await waitFor(() => expect(loginMock).toHaveBeenCalledWith("aluno@fatec.sp.gov.br", "aluno1234"));
    vi.unstubAllEnvs();
  });
});
