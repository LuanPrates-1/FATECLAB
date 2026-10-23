import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSessao } from "../hooks/useSessao";

/**
 * Redireciona visitantes não autenticados para o login (RF04, US1 cenário 5).
 */
export function RotaProtegida({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSessao();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
