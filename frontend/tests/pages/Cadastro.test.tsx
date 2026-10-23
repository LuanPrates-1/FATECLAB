import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Cadastro } from "../../src/pages/Cadastro";
import { ApiError } from "../../src/services/apiClient";
import * as authService from "../../src/services/authService";
import { ALUNO, renderizar } from "../utils";

const abrir = () => renderizar(<Cadastro />, { rota: "/cadastro", caminho: "/cadastro" });

async function preencher(nome: string, email: string, senha: string) {
  await userEvent.type(screen.getByLabelText(/nome completo/i), nome);
  await userEvent.type(screen.getByLabelText(/e-mail institucional/i), email);
  await userEvent.type(screen.getByLabelText(/^senha/i), senha);
  await userEvent.click(screen.getByRole("button", { name: /criar conta/i }));
}

describe("Cadastro", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("envia nome, e-mail institucional e senha", async () => {
    const cadastrarMock = vi.spyOn(authService, "cadastrar").mockResolvedValue({ token: "t", aluno: ALUNO });
    abrir();
    await preencher("Ana Silva", "ana.silva@fatec.sp.gov.br", "senhaSegura123");
    await waitFor(() =>
      expect(cadastrarMock).toHaveBeenCalledWith("Ana Silva", "ana.silva@fatec.sp.gov.br", "senhaSegura123"),
    );
  });

  it("exibe o erro quando o e-mail está fora do domínio institucional (422)", async () => {
    vi.spyOn(authService, "cadastrar").mockRejectedValue(
      new ApiError("E-mail deve pertencer ao domínio institucional da Fatec", 422),
    );
    abrir();
    await preencher("Bruno Costa", "bruno@gmail.com", "senhaSegura123");
    expect(await screen.findByRole("alert")).toHaveTextContent(/domínio institucional/i);
  });

  it("recusa senha curta sem chamar a API", async () => {
    const cadastrarMock = vi.spyOn(authService, "cadastrar");
    abrir();
    await preencher("Carla Dias", "carla.dias@fatec.sp.gov.br", "123");
    expect(await screen.findByRole("alert")).toHaveTextContent(/8 caracteres/i);
    expect(cadastrarMock).not.toHaveBeenCalled();
  });
});
