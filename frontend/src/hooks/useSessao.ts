import { createContext, createElement, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { clearToken, setToken as salvarToken } from "../services/apiClient";

export interface UsuarioLogado {
  id: string;
  nome: string;
  papel: "ALUNO" | "ADMINISTRADOR";
  apelido?: string;
  xpTotal?: number;
}

interface SessaoContextValue {
  usuario: UsuarioLogado | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, usuario: UsuarioLogado) => void;
  logout: () => void;
}

const SessaoContext = createContext<SessaoContextValue | undefined>(undefined);

const USUARIO_STORAGE_KEY = "fateclab.usuario";

function lerUsuarioSalvo(): UsuarioLogado | null {
  const bruto = localStorage.getItem(USUARIO_STORAGE_KEY);
  if (!bruto) return null;
  try {
    return JSON.parse(bruto) as UsuarioLogado;
  } catch {
    return null;
  }
}

export function SessaoProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(() => lerUsuarioSalvo());

  const login = useCallback((token: string, usuarioLogado: UsuarioLogado) => {
    salvarToken(token);
    localStorage.setItem(USUARIO_STORAGE_KEY, JSON.stringify(usuarioLogado));
    setUsuario(usuarioLogado);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    localStorage.removeItem(USUARIO_STORAGE_KEY);
    setUsuario(null);
  }, []);

  const value = useMemo<SessaoContextValue>(
    () => ({
      usuario,
      isAuthenticated: usuario !== null,
      isAdmin: usuario?.papel === "ADMINISTRADOR",
      login,
      logout,
    }),
    [usuario, login, logout],
  );

  return createElement(SessaoContext.Provider, { value }, children);
}

export function useSessao(): SessaoContextValue {
  const contexto = useContext(SessaoContext);
  if (!contexto) {
    throw new Error("useSessao deve ser usado dentro de um SessaoProvider");
  }
  return contexto;
}
