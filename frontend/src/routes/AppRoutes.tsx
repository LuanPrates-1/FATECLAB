import { Navigate, Route, Routes } from "react-router-dom";
import { Admin } from "../pages/Admin";
import { Cadastro } from "../pages/Cadastro";
import { DetalheTrilha } from "../pages/DetalheTrilha";
import { Login } from "../pages/Login";
import { ListaTrilhas } from "../pages/ListaTrilhas";
import { Perfil } from "../pages/Perfil";
import { Ranking } from "../pages/Ranking";
import { RotaAdmin } from "./RotaAdmin";
import { RotaProtegida } from "./RotaProtegida";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/trilhas"
        element={
          <RotaProtegida>
            <ListaTrilhas />
          </RotaProtegida>
        }
      />
      <Route
        path="/trilhas/:id"
        element={
          <RotaProtegida>
            <DetalheTrilha />
          </RotaProtegida>
        }
      />
      <Route
        path="/ranking"
        element={
          <RotaProtegida>
            <Ranking />
          </RotaProtegida>
        }
      />
      <Route
        path="/perfil"
        element={
          <RotaProtegida>
            <Perfil />
          </RotaProtegida>
        }
      />
      <Route
        path="/admin"
        element={
          <RotaAdmin>
            <Admin />
          </RotaAdmin>
        }
      />
      <Route path="/" element={<Navigate to="/trilhas" replace />} />
      <Route path="*" element={<Navigate to="/trilhas" replace />} />
    </Routes>
  );
}
