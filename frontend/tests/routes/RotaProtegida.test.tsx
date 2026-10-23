import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RotaProtegida } from "../../src/routes/RotaProtegida";
import { SessaoProvider } from "../../src/hooks/useSessao";

function renderComRota(caminhoInicial: string) {
  return render(
    <MemoryRouter initialEntries={[caminhoInicial]}>
      <SessaoProvider>
        <Routes>
          <Route path="/login" element={<p>Tela de login</p>} />
          <Route
            path="/trilhas"
            element={
              <RotaProtegida>
                <p>Conteúdo protegido</p>
              </RotaProtegida>
            }
          />
        </Routes>
      </SessaoProvider>
    </MemoryRouter>,
  );
}

describe("RotaProtegida", () => {
  it("redireciona visitante não autenticado para /login (FR-004, US1 cenário 5)", () => {
    renderComRota("/trilhas");

    expect(screen.getByText("Tela de login")).toBeInTheDocument();
    expect(screen.queryByText("Conteúdo protegido")).not.toBeInTheDocument();
  });
});
