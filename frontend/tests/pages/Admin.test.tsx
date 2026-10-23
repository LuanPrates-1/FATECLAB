import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Admin } from "../../src/pages/Admin";
import { RotaAdmin } from "../../src/routes/RotaAdmin";
import { SessaoProvider } from "../../src/hooks/useSessao";
import * as trilhaService from "../../src/services/trilhaService";
import * as adminService from "../../src/services/adminService";

describe("Admin", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(trilhaService, "listarTrilhas").mockResolvedValue([
      { id: "1", titulo: "Trilha Existente", area: "Programação", nivel: "INICIANTE" },
    ]);
  });

  it("cria uma nova trilha com ao menos um módulo (US4 cenário 1)", async () => {
    const criarMock = vi.spyOn(adminService, "criarTrilha").mockResolvedValue({
      id: "2",
      titulo: "Nova Trilha",
      area: "Back-end",
      nivel: "INICIANTE",
      modulos: [],
    });

    render(<Admin />);
    await screen.findByText("Trilha Existente");

    await userEvent.type(screen.getByLabelText(/título$/i), "Nova Trilha");
    await userEvent.type(screen.getByLabelText(/^área$/i), "Back-end");
    await userEvent.type(screen.getByLabelText(/título do módulo 1/i), "Introdução");
    await userEvent.click(screen.getByRole("button", { name: /criar trilha/i }));

    await waitFor(() => {
      expect(criarMock).toHaveBeenCalledWith(
        expect.objectContaining({
          titulo: "Nova Trilha",
          area: "Back-end",
          modulos: [expect.objectContaining({ titulo: "Introdução" })],
        }),
      );
    });
  });

  it("remove uma trilha existente (US4 cenário 3)", async () => {
    const removerMock = vi.spyOn(adminService, "removerTrilha").mockResolvedValue(undefined);

    render(<Admin />);
    await screen.findByText("Trilha Existente");

    await userEvent.click(screen.getByRole("button", { name: /remover/i }));

    await waitFor(() => expect(removerMock).toHaveBeenCalledWith("1"));
  });
});

describe("RotaAdmin", () => {
  it("nega acesso ao painel de administração para um aluno comum (US4 cenário 4)", async () => {
    // Sessão de aluno comum já autenticado, restaurada pelo SessaoProvider a partir do
    // localStorage (mesma chave usada por useSessao.ts) desde o primeiro render.
    localStorage.setItem("fateclab.token", "token-fake");
    localStorage.setItem(
      "fateclab.usuario",
      JSON.stringify({ id: "1", nome: "Aluno Comum", papel: "ALUNO", apelido: "aluno", xpTotal: 0 }),
    );

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <SessaoProvider>
          <Routes>
            <Route path="/trilhas" element={<p>Lista de trilhas</p>} />
            <Route
              path="/admin"
              element={
                <RotaAdmin>
                  <p>Painel administrativo</p>
                </RotaAdmin>
              }
            />
          </Routes>
        </SessaoProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByText("Lista de trilhas")).toBeInTheDocument();
    expect(screen.queryByText("Painel administrativo")).not.toBeInTheDocument();

    localStorage.clear();
  });
});
