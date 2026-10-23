import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutApp } from "../components/LayoutApp";
import { useSessao } from "../hooks/useSessao";
import { Admin } from "../pages/Admin";
import { Cadastro } from "../pages/Cadastro";
import { DetalheTrilha } from "../pages/DetalheTrilha";
import { Licao } from "../pages/Licao";
import { ListaTrilhas } from "../pages/ListaTrilhas";
import { Login } from "../pages/Login";
import { Perfil } from "../pages/Perfil";
import { Ranking } from "../pages/Ranking";
import { RotaAdmin } from "./RotaAdmin";
import { RotaProtegida } from "./RotaProtegida";

function Protegida({ children, semNavegacao }: { children: ReactNode; semNavegacao?: boolean }) {
  return (
    <RotaProtegida>
      <LayoutApp semNavegacao={semNavegacao}>{children}</LayoutApp>
    </RotaProtegida>
  );
}

function SomenteVisitante({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin } = useSessao();
  if (isAuthenticated) return <Navigate to={isAdmin ? "/admin" : "/trilhas"} replace />;
  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<SomenteVisitante><Login /></SomenteVisitante>} />
      <Route path="/cadastro" element={<SomenteVisitante><Cadastro /></SomenteVisitante>} />
      <Route path="/trilhas" element={<Protegida><ListaTrilhas /></Protegida>} />
      <Route path="/trilhas/:id" element={<Protegida><DetalheTrilha /></Protegida>} />
      <Route path="/trilhas/:id/modulos/:moduloId" element={<Protegida semNavegacao><Licao /></Protegida>} />
      <Route path="/ranking" element={<Protegida><Ranking /></Protegida>} />
      <Route path="/perfil" element={<Protegida><Perfil /></Protegida>} />
      <Route
        path="/admin"
        element={
          <RotaAdmin>
            <LayoutApp>
              <Admin />
            </LayoutApp>
          </RotaAdmin>
        }
      />
      <Route path="/" element={<Navigate to="/trilhas" replace />} />
      <Route path="*" element={<Navigate to="/trilhas" replace />} />
    </Routes>
  );
}
