import { apiRequest } from "./apiClient";
import type { UsuarioLogado } from "../hooks/useSessao";

export interface SessaoResposta {
  token: string;
  aluno: UsuarioLogado;
}

export function cadastrar(nome: string, email: string, senha: string): Promise<SessaoResposta> {
  return apiRequest<SessaoResposta>("/auth/cadastro", {
    method: "POST",
    body: { nome, email, senha },
    auth: false,
  });
}

export function login(email: string, senha: string): Promise<SessaoResposta> {
  return apiRequest<SessaoResposta>("/auth/login", {
    method: "POST",
    body: { email, senha },
    auth: false,
  });
}

export function buscarMeuPerfil(): Promise<UsuarioLogado> {
  return apiRequest<UsuarioLogado>("/alunos/me");
}

export function atualizarApelido(apelido: string): Promise<UsuarioLogado> {
  return apiRequest<UsuarioLogado>("/alunos/me", {
    method: "PATCH",
    body: { apelido },
  });
}
