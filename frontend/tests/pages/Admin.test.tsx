import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Admin } from "../../src/pages/Admin";
import { RotaAdmin } from "../../src/routes/RotaAdmin";
import { SessaoProvider } from "../../src/hooks/useSessao";
import * as trilhaService from "../../src/services/trilhaService";
import * as adminService from "../../src/services/adminService";
import { ADMIN, ALUNO, renderizar } from "../utils";

describe("Admin", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(trilhaService, "listarTrilhas").mockResolvedValue([
      { id: 1, titulo: "Trilha Existente", area: "Programação", nivel: "INICIANTE", totalModulos: 2 },
    ]);
  });

  it("cria uma trilha com módulo, lição e questão", async () => {
    const criar = vi.spyOn(adminService, "criarTrilha").mockResolvedValue({
      id: 2,
      titulo: "Nova Trilha",
      area: "Back-end",
      nivel: "INICIANTE",
      modulos: [],
    });
    renderizar(<Admin />, { usuario: ADMIN });
    await screen.findByText("Trilha Existente");

    await userEvent.click(screen.getByRole("button", { name: /nova trilha/i }));
    await userEvent.type(screen.getByLabelText(/^título$/i), "Nova Trilha");
    await userEvent.type(screen.getByLabelText(/^área$/i), "Back-end");
    await userEvent.type(screen.getByLabelText(/título do módulo 1/i), "Introdução");
    await userEvent.type(screen.getByLabelText(/^lição$/i), "Texto da lição");
    await userEvent.type(screen.getByLabelText(/^enunciado$/i), "Quanto é 1 + 1?");
    const textos = screen.getAllByLabelText(/texto da alternativa/i);
    await userEvent.type(textos[0], "2");
    await userEvent.type(textos[1], "3");
    await userEvent.type(textos[2], "4");
    await userEvent.type(textos[3], "5");
    await userEvent.click(screen.getByRole("button", { name: /criar trilha/i }));

    await waitFor(() =>
      expect(criar).toHaveBeenCalledWith(
        expect.objectContaining({
          titulo: "Nova Trilha",
          area: "Back-end",
          modulos: [
            expect.objectContaining({
              titulo: "Introdução",
              conteudo: "Texto da lição",
              questoes: [
                expect.objectContaining({
                  enunciado: "Quanto é 1 + 1?",
                  alternativas: expect.arrayContaining([{ texto: "2", correta: true }]),
                }),
              ],
            }),
          ],
        }),
      ),
    );
    expect(await screen.findByRole("status")).toHaveTextContent(/criada e publicada/i);
  });

  it("pede confirmação antes de remover uma trilha", async () => {
    const remover = vi.spyOn(adminService, "removerTrilha").mockResolvedValue(undefined);
    renderizar(<Admin />, { usuario: ADMIN });
    await screen.findByText("Trilha Existente");

    await userEvent.click(screen.getByRole("button", { name: /remover trilha existente/i }));
    expect(remover).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: /^remover$/i }));

    await waitFor(() => expect(remover).toHaveBeenCalledWith(1));
  });
});

describe("RotaAdmin", () => {
  it("nega o painel de administração a um aluno comum", async () => {
    localStorage.setItem("fateclab.token", "token-fake");
    localStorage.setItem("fateclab.usuario", JSON.stringify(ALUNO));

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
  });
});
