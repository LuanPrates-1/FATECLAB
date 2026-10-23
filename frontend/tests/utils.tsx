import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SessaoProvider } from "../src/hooks/useSessao";
import type { UsuarioLogado } from "../src/services/tipos";

export const ALUNO: UsuarioLogado = {
  id: 7,
  nome: "Luan Prates",
  papel: "ALUNO",
  apelido: "luan",
  xpTotal: 140,
  nivel: 2,
  xpInicioNivel: 100,
  xpProximoNivel: 300,
  ofensiva: 2,
  maiorOfensiva: 4,
};

export const ADMIN: UsuarioLogado = { id: 1, nome: "Administrador", papel: "ADMINISTRADOR" };

/** Renderiza uma página com sessão (opcional) e rota, como no app de verdade. */
export function renderizar(
  elemento: ReactElement,
  { rota = "/", caminho = "/", usuario = null as UsuarioLogado | null, extras = [] as ReactElement[] } = {},
) {
  localStorage.clear();
  if (usuario) {
    localStorage.setItem("fateclab.token", "token-fake");
    localStorage.setItem("fateclab.usuario", JSON.stringify(usuario));
  }
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <SessaoProvider>
        <Routes>
          <Route path={caminho} element={elemento} />
          {extras}
        </Routes>
      </SessaoProvider>
    </MemoryRouter>,
  );
}
