import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSessao } from "../hooks/useSessao";

/**
 * Bloqueia/oculta o painel de administração para quem não tem papel ADMINISTRADOR (FR-015,
 * US4 cenário 4). A autorização real é sempre reforçada no back-end (SecurityConfig); esta
 * guarda é só uma conveniência de UX.
 */
export function RotaAdmin({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin } = useSessao();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/trilhas" replace />;
  }

  return <>{children}</>;
}
