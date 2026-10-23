import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { EVENTO_SESSAO_EXPIRADA, clearToken, setToken as salvarToken } from "../services/apiClient";
import type { UsuarioLogado } from "../services/tipos";

export type { UsuarioLogado } from "../services/tipos";

interface SessaoContextValue {
  usuario: UsuarioLogado | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, usuario: UsuarioLogado) => void;
  /** Atualiza XP, nível, ofensiva etc. sem trocar o token (ex.: depois de um quiz). */
  atualizarUsuario: (usuario: UsuarioLogado) => void;
  logout: () => void;
}

const SessaoContext = createContext<SessaoContextValue | undefined>(undefined);

const USUARIO_STORAGE_KEY = "fateclab.usuario";

function lerUsuarioSalvo(): UsuarioLogado | null {
  try {
    const bruto = localStorage.getItem(USUARIO_STORAGE_KEY);
    return bruto ? (JSON.parse(bruto) as UsuarioLogado) : null;
  } catch {
    return null;
  }
}

function salvarUsuario(usuario: UsuarioLogado | null): void {
  try {
    if (usuario) localStorage.setItem(USUARIO_STORAGE_KEY, JSON.stringify(usuario));
    else localStorage.removeItem(USUARIO_STORAGE_KEY);
  } catch {
    // armazenamento indisponível
  }
}

export function SessaoProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(() => lerUsuarioSalvo());

  const login = useCallback((token: string, usuarioLogado: UsuarioLogado) => {
    salvarToken(token);
    salvarUsuario(usuarioLogado);
    setUsuario(usuarioLogado);
  }, []);

  const atualizarUsuario = useCallback((usuarioAtualizado: UsuarioLogado) => {
    salvarUsuario(usuarioAtualizado);
    setUsuario(usuarioAtualizado);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    salvarUsuario(null);
    setUsuario(null);
  }, []);

  useEffect(() => {
    window.addEventListener(EVENTO_SESSAO_EXPIRADA, logout);
    return () => window.removeEventListener(EVENTO_SESSAO_EXPIRADA, logout);
  }, [logout]);

  const value = useMemo<SessaoContextValue>(
    () => ({
      usuario,
      isAuthenticated: usuario !== null,
      isAdmin: usuario?.papel === "ADMINISTRADOR",
      login,
      atualizarUsuario,
      logout,
    }),
    [usuario, login, atualizarUsuario, logout],
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
